
#to start the backend


1. paste this to your terminal to work in the container
```
cd django
sudo docker run -it --rm \
-p 0.0.0.0:8000:8000 \
-v "$(pwd):/content" \
python:3.8 bash
```
2. enter your password
3. open content
```
cd content
```
4. install all the dependencies
```
pip install django Pillow passlib django-cors-headers
```
5. start the script
```
python manage.py runserver 0.0.0.0:8000
```
