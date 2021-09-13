/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */

// ---------------- MODIFY THIS ----------------
const REACHENGINE_ENDPOINT = 'https://<reachengine_url>/reachengine/api/workflows/_anyAssetIngest/start';
const REACHENGINE_API_KEY = '<reachengine_api>';


// ---------------------------------------------
// ############ DO NOT MODIFY BELOW ############
// ---------------------------------------------
const AWS = require('aws-sdk');
const HTTPS = require('https');
const PATH = require('path');
const URL = require('url');

// get reference to S3 client
const s3 = new AWS.S3();

/**
 *
 * @param {URL} url - ReachEngine URL
 * @param {object} content - JSON object
 */
async function send(url, content) {
  return new Promise((resolve, reject) => {
    try {
      const {
        protocol,
        hostname,
        path,
        port,
      } = url;

      const body = JSON.stringify(content);
      const options = {
        method: 'POST',
        protocol,
        hostname,
        path,
        port,
        headers: {
          apiKey: REACHENGINE_API_KEY,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      };

      const buffers = [];
      const request = HTTPS.request(options, (response) => {
        response.on('data', (chunk) => {
          buffers.push(chunk);
        });

        response.on('end', () =>
          resolve(Buffer.concat(buffers).toString()));
      });

      request.on('error', (e) =>
        reject(e));

      request.write(body);
      request.end();
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}


/**
 * @function handler
 * @description function to start ReachEngine workflow
 */
exports.handler = async (event, context) => {
  console.log(`const event = ${JSON.stringify(event, null, 2)}`);

  // Get S3 bucket and object key
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  const srcObjectSize = event.Records[0].s3.object.size;

  // Compute metadata side-car JSON file name based on object key
  var strArray = srcKey.split("/");
  var packageId = strArray[strArray.length - 2];
  var metadataJsonName = `${packageId}_metadata.json`;

  // Skip if the created S3 object is the metadata side-car file
  if (srcKey.endsWith(metadataJsonName)) {
      console.log('Side-car JSON file. Skipping.');
  }
  // Skip if the created S3 object is 0 Byte
  else if (srcObjectSize == 0) {
    console.log('File size equals 0. Skipping.');
  }
  // If not, trigger Reach Engine workflow
  else {
      // Build metadataJson payload
      var filepathLength = srcKey.length - strArray[strArray.length - 1].length;
      var baseFilepath = srcKey.slice(0, filepathLength);
      var metadataFileKey = `${baseFilepath}${metadataJsonName}`;

      // Get the JSON object and create the metadataJson payload
      try {
        const params = {
            Bucket: srcBucket,
            Key: metadataFileKey
        };
        var jsonRawdata = await s3.getObject(params).promise();

      } catch (error) {
          console.log(error);
          return;
      }

      let metadataJson = JSON.parse(jsonRawdata.Body);
      console.log(`metadataJson = ${JSON.stringify(metadataJson, null, 2)}`);

      // Build the API call payload
      const payload = {
        fileToIngest: `s3:${srcBucket}:${srcKey}`,
        jsonMetadata: metadataJson.metadata,
        categories: metadataJson.categories,
        collections: metadataJson.collections,
        linkMetadata: metadataJson.links,
        metadataFormType: metadataJson.source
      };

      console.log(`payload = ${JSON.stringify(payload, null, 2)}`);

      // Call Reach Engine to run the workflow with the set payload
      const endpoint = URL.parse(REACHENGINE_ENDPOINT);
      const response = await send(endpoint, payload).catch((e) => {
          console.error(e);
          throw e;
      });

      console.log(`response = ${JSON.stringify(response, null, 2)}`);
      return response;
  }

};
