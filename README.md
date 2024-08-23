# TEAM17-CTG

##to start the backend
1. paste this to your terminal to work in the container
```
cd django
sudo docker run -it --rm \
-p 0.0.0.0:8000:8000 \
-v "$(pwd):/content" \
python:3.8 bash
```
2. enter your password
3. open content/backend
```
cd content/backend
```
4. install all the dependencies
```
pip install django
```
5. start the script
```
python manage.pu runserver 0.0.0.0:8080
```
