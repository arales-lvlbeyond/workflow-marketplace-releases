from frameioclient import FrameioClient
import argparse
import os
import urllib3

def _parse_args():
    parser = argparse.ArgumentParser(description='Process commandline arguments.')
    parser.add_argument('--parent-id', type=str, help='The Parent ID for this asset. May specify an asset to version, a version_stack or a Folder.')
    parser.add_argument('--asset-name', type=str, help='The name for the asset being uploaded.')
    parser.add_argument('--file-path', type=str, help='Absolute path to the file being uploaded.')
    parser.add_argument('--client-token', type=str, help='Client token for client access.')
    parser.add_argument('--mime-type', type=str, help='MimeType for file being uploaded.')

    args = parser.parse_args()

    if not args.parent_id:
        parser.error("--parent-id is required")
    if not args.asset_name:
        parser.error("--asset-name is required")
    if not args.file_path:
        parser.error("--file-path is required")
    if not args.client_token:
        parser.error("--client-token is required")
    if not args.mime_type:
        parser.error("--mime-type is required")
    return args


def _upload_asset(parent_id, asset_name, filepath, mime_type, token):
    client = FrameioClient(token)
    file_size = os.stat(filepath).st_size
    # Create a new asset.
    asset = client.create_asset(
        parent_asset_id=parent_id,
        name=asset_name,
        filetype=mime_type,
        filesize=file_size,
        type="file"
    )

    # Upload the file at the target asset.
    file = open(filepath, "rb")
    client.upload(asset, file)
    return asset


def main():
    runtime_args = _parse_args()
    print _upload_asset(runtime_args.parent_id, runtime_args.asset_name, runtime_args.file_path, runtime_args.mime_type, runtime_args.client_token)['id']


if __name__ == '__main__':
    main()

