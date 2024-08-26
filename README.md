# ZUBIN WEB 2.0 (TEAM17-CTG)

## Project Overview
This project comprises three main products, each designed to serve distinct user groups and streamline operations efficiently:

### 1. Participants and Volunteers Facing Webpage
- **Purpose:** A user-friendly interface designed to engage participants and volunteers. It offers easy access to event information, registration forms, schedules, and other relevant resources.
- **Features:** 
  - Interactive event calendar
  - Registration and application forms for participants and volunteers
  - Access to essential resources and updates

### 2. Admin Facing Webpage
- **Purpose:** A comprehensive administrative portal that centralizes all critical operations, enabling efficient management of events, communications, and analytics.
- **Features:** 
  - **Analytics Dashboard:** Provides insights into participant engagement, event metrics, and volunteer contributions.
  - **Application Management:** Streamlined process for reviewing and managing submissions.
  - **Mass Communication:** Tools for sending bulk WhatsApp messages and emails to participants and volunteers.
  - **Event Management:** Tools for organizing and managing event details, participants, and logistics.

### 3. Continuous Learning Chatbot
- **Purpose:** An AI-powered chatbot integrated into the public-facing webpage to assist web visitors. The chatbot is designed to learn continuously, improving its responses based on interactions and the Zubin Foundation program’s information.
- **Features:** 
  - Real-time assistance for website visitors
  - Continuous learning capabilities to enhance user interaction over time
  - Knowledge base grounded in the Zubin Foundation program

### Technical Architecture
- **Webpages:** The project includes two webpages: one for public access (participants and volunteers) and one for admin use.
- **Backend:** Both webpages are powered by the same backend built using the Django framework.
- **Hosting:** The entire application is hosted in a Docker container with restrictive access to ensure security and reliability.



To start the ecosystem, initiate the system sequentially as follows:

1. Initiating the Backend
2. Initiating admin-portal
3. Initiating front-end


# Detailed Steps of Initiation per System:


## Initiating the backend
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

## Initiating the Admin Portal

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

## Initiating the frontend


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
