# TEAM17-CTG


The entire ecosystem is based on 3 sub-systems. Namely, backend, admin-portal, and front-end. To start the ecosystem, initiate the system sequentially as follows:

1. Initiating the Backend
2. Initiating admin-portal
3. Initiating front-end


#Detailed Steps of Initiation per System:


#Initiating the backend
1. go to backend folder
```
cd backend_dev/ctg17
```
2. paste the following line to your terminal to work in the container
```
sudo docker run -it --rm \
-p 0.0.0.0:8000:8000 \
-v "$(pwd):/content" \
python:3.8 bash
```
3. enter your root password
4. open content, by running the following command
```
cd content
```
5. install all the dependencies by running the following command
```
pip install django Pillow passlib django-cors-headers requests pandas google-auth google-auth-oauthlib google-api-python-client twilio
```
6. start the script by running the following command
```
python manage.py runserver 0.0.0.0:8000
```

#Initiating the Admin Portal

paste the following line to your terminal to work in the container

1. go to the admin-portal folder
```
cd admin-portal
```
2. install all dependencies
```
npm install
```
3. start the app
```
npm start
```

#Initiating the frontend


paste the following line to your terminal to work in the container
1. go to the front-end folder
```
cd front-end
```
2. install all dependencies
```
npm install
```
3. start the app
```
npm start
```
