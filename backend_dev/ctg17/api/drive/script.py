import requests
import pandas as pd
import time
import json

#For Pipeline
import subprocess

#For Google API
import os
import os.path
import pandas as pd
from functools import wraps
import random
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload
from googleapiclient.http import MediaFileUpload


def exponential_backoff(retries=5, initial_delay=1, max_delay=60, multiplier=2):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            delay = initial_delay
            for attempt in range(retries):
                try:
                    return func(*args, **kwargs)
                except (HttpError, Exception) as e:
                    print("Retrying to connect to DriveAPI...")
                    if attempt == retries - 1:
                        print("Connection fails")
                        raise
                    time.sleep(delay)
                    delay = min(max_delay, delay * multiplier * (1 + random.random()))
        return wrapper
    return decorator

#GOOGLE DRIVE MANIPULATIONS
class DriveAPI:
    global SCOPES
    SCOPES = ["https://www.googleapis.com/auth/drive"]
    def __init__(self):
        print('enter drive')
        self.creds = None
        
        # Check if tokens.json file exists and contains valid credentials
        if os.path.exists("google_api_info/tokens.json"):
            self.creds = Credentials.from_authorized_user_file("google_api_info/tokens.json", SCOPES)

        # If no valid credentials found, authenticate and store new credentials
        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                # Refresh expired credentials if refresh token is available
                self.creds.refresh(Request())
            else:
                # Perform OAuth 2.0 authorization flow to obtain new credentials
                flow = InstalledAppFlow.from_client_secrets_file(
                    "google_api_info/credentials.json", SCOPES
                )
                self.creds = flow.run_local_server(open_browser=False, bind_addr="0.0.0.0", port=8000)
            # Save the new credentials to tokens.json file for future use
            with open('google_api_info/tokens.json', 'w') as token:
                token.write(self.creds.to_json())

        self.service = build('drive', 'v3', credentials=self.creds)


    #DOWLOAD FILE BY FILE ID TO DESTINATION FOLDER
    @exponential_backoff()
    def download_file_by_file_id(self, file_id, destination_folder):
        #Get the media and name of file
        request = self.service.files().get_media(fileId=file_id)
        file_name = self.service.files().get(fileId=file_id).execute()["name"]
        
        #Create file in destination folder
        file_path = os.path.join(destination_folder, file_name)
        fh = open(file_path, "wb")

        #Download files in chunks
        print(f"Downloading {file_path}...")
        downloader = MediaIoBaseDownload(fh, request, chunksize=64*1024*1024)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print(f"Download progress: {int(status.progress() * 100)}%")
        # print(f"File downloaded: {file_path}")

    #DOWNLOAD EVERYTHING FROM DRIVE FOLDER BY FOLDER ID TO DESTINATION FOLDER
    @exponential_backoff()
    def download_all_from_folder(self, folder_id, destination_folder):
        #Get all the items in the drive folder
        results = self.service.files().list(q=f"'{folder_id}' in parents and trashed = false", fields="files(id, name, mimeType)").execute()
        items = results.get('files', [])
        
        #Iterate over each item
        for item in items:
            item_id = item['id']
            item_name = item['name']
            item_type = item['mimeType']

            #Check if the item is a folder
            if item_type == 'application/vnd.google-apps.folder':
                folder_path = os.path.join(destination_folder, item_name)
                os.makedirs(folder_path, exist_ok=True)
                #Recursively download the contents of the subfolder
                self.download_all_from_folder(item_id, folder_path)

            else:
                #If the item is a file, download it to the destination folder
                self.download_file_by_file_id(item_id, destination_folder)

    @exponential_backoff()
    def Download_File_by_Name(self, file_name, parent_folder_id, destination_folder):
        query = f"'{parent_folder_id}' in parents and name = '{file_name}' and trashed=false"
        response = self.service.files().list(q=query).execute()
        if response:
            file_id = response.get('files', [])[0]['id']
            request = self.service.files().get_media(fileId=file_id)
            file_path = os.path.join(destination_folder, file_name)
            fh = open(file_path, "wb")
            downloader = MediaIoBaseDownload(fh, request, chunksize=64*1024*1024)
            done = False
            while done is False:
                status, done = downloader.next_chunk()
                print(f"Download progress: {int(status.progress() * 100)}%")
            print(f"File downloaded: {file_path}")
            return True
        return False
    
    #UPLOADING FILES FROM LOCAL FOLDER TO DRIVE FOLDER BY FOLDER ID
    def upload_folder_files(self, local_folder_path, output_folder_id):
        #Get the list of files in a folder
        for item in os.listdir(local_folder_path):
            item_path = os.path.join(local_folder_path, item)
            #Check if item is file
            if os.path.isfile(item_path):
                #Creates metada, and media of item
                print(f"Uploading: {item}")
                file_metadata = {
                    "name": [item],
                    "parents": [output_folder_id]
                }
                self.upload_files(item_path, file_metadata)
                print("Uploaded file:", item)
            else:
                print(f'Creating {item} in output folder')
                folder_id = self.create_folder(output_folder_id, item)
                self.upload_folder_files(item_path, folder_id)



    @exponential_backoff()
    def upload_files(self, filepath, file_metadata):
        media = MediaFileUpload(filepath, chunksize=64*1024*1024 ,resumable=True)
        upload_file = self.service.files().create(
            body=file_metadata,
            media_body=media,
            fields="id"
        )
        #Upload item in chunks
        response = None
        
        while response is None:
            status, response = upload_file.next_chunk()
            if status:
                progress = int(status.progress() * 100)
                print(f"Upload progress: {progress}%")
            
            # sio.emit('progress_update', {'progress': 'just a test'})
        # sio.disconnect()
        # print("Uploaded file:", item)

    def get_filename(self, source_id):
        #Get all the items in the source folder
        results = self.service.files().list(q=f"'{source_id}' in parents and trashed=false", fields='files(id, name, mimeType)').execute()
        items = results.get('files', [])

        return [item['name'] for item in items]

