

## How to configure Dynamic Properties 
Dynamic properties are used by this workflow. The steps below will walk you through creating and setting values for these properties. 


### Steps:

1. Log into Reach as an admin user.

2. Append "/api-docs/#/dynamic_properties/setProperty" to the end of your Reach URL as shown below:
   ```
   http://yourreachserver/api-docs/#/dynamic_properties/setProperty
   ```

3. This link will open to the Reach Engine API "Post /properties" call.  Note: If the "Post /properties" section does not automatically open, simply click on the Green Post button to the left of the section.

4. Once within the "Post" section, on the right hand, click the “Try it out” button.  This will allow editing of properties.

5. In the "Body" section, under the "Dynamic Property Map", click the "Edit Value" tab. This will enable an editing text box. Note: The following example or other dynamic properties may already be listed in this area.  
   ```
   {
     "additionalProp1": "string",
     "additionalProp2": "string",
     "additionalProp3": "string"
    }
    ```

6. At this point, within this text box, you will need to list this workflow's necessary dynamic properties. 

7. When adding the dynamic properties, referencing the example above, a single dyanmic property name would replace the "additionalProp#" and it's value would replace the corresponding "string" for the property. Repeat for all properties needed.

8. When complete, the list should only contain this workflow's specific dynamic properties and corresponding values combinations.  

9.  Be careful to leave the opening ' { ' and closing ' } ' around the group of properties, as well as a comma at the end of each properties line, excluding the last as shown above. 
Below is an example of what a list of Dynamic Properties list should look like:
    ```
    {
      "workflows.folder.name": "archived assets",
      "workflows.archive.duration": "365",
      "workflows.queue.limit": "50",
      "workflows.asset.delete": "true"
    }
    ```

10. When finished listing your dynamic properties and values in the text box, click the Execute button below.

11. After executing, the list of Dynamic Properties and their values are now configured in your Reach Environment.


#### Updating Dynamic Values:
For updating any dynamic property value, you simply, set a different value for the specific property name and rerun.  It will update the property, not create a new one.
   ```
   {
     “workflows.asset.delete”: “false”
   }  
   ```

#### Steps To retrieve Dynamic Properties and Values
You can retrieve your dynamic properties and check their values, by clicking in the "Get /properties" API call or by appending the following to your Reach URL: 
```
/api-docs/#/dynamic_properties/getAllProperties
```
1. Once in the "Get /properties" section, Click "Try It Out"
2. Then Click Execute
3. A list of all dynamic properties found in your Reach System will be displayed in the response body of the call.


#### Notes:
If you choose,
Dynamic Properties can also be set using an application such as Postman using this same Reach Engine API call.



