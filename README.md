# Django using Gunicorn, Postgres, Nginx, Tailwind CSS on Docker

## Considerations

This is bowler plate code I use to get my projects started that is built on django using gunicorn, postgres, nginx, tailwinds. This is all designed to run on docker containers. 

## Prerequisite 

1. Built for linux debian flavors. Might work on other OS systems but I did not test it. 
2. Nginx proxy server used in front of website. 
3. Let's Encrypt used for SSL.
4. Can be self hosted with the correct infrastructure or used on a cloud provider. You will need to be tech savy to figure this all out.
5. Environment Files Needed in root folder. Refer to example in code and change with your variables. All variables are set in the settings.py file for django.
    1. .env for development
    2. .env.prod for production

Install django
```bash
pip3 install django
django-admin startproject ENTERPROJECTNAME .

# copy the following from project folder setting.py created above and enter into the .env files created below.
# copy SECRET_KEY= 
# copy WSGI_APPLICATION = 
# copy ROOT_URLCONF =

#projectname is the name entered above it creates a folder, I usually use the domain name. Move the root settings.py to project folder to replace standard settings.py file
mv settings.py projectname
```

This will spin up 2 containers; django built in runserver and postgres container
```bash
# Create .env file enter in custom variables below are just examples
sudo nano .env 

DEBUG=1
SECRET_KEY=$SECRET_KEY
WSGI_APPLICATION=$WSGI_APPLICATION
ROOT_URLCONF=$ROOT_URLCONF

EMAIL_PASSWORD=$EMAIL_PASSWORD
EMAIL_ADMIN=$EMAIL_ADMIN
EMAIL_ADDRESS=$EMAIL_ADDRESS
EMAIL_PORT=$EMAIL_PORT
EMAIL_HOST=$EMAIL_HOST
EMAIL_USE_TLS=$EMAIL_USE_TLS

SQL_ENGINE=django.db.backends.postgresql
POSTGRES_DB=$POSTGRES_DB
POSTGRES_USER=$POSTGRES_USER
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
SQL_HOST=$SQL_HOST
SQL_PORT=$SQL_POST
DATABASE=$DATABASE

ALLOWED_HOSTS=yourdomainname.com,www.yourdomainname.com
CSRF_TRUSTED_ORIGINS=https://*.yourdomainname.com,http://*.yourdomainname.com

# Set permissions for .env
sudo chmod 600 .env

# Command to build docker containers
sudo docker-compose up -d --build

#migrate database
sudo docker-compose exec web python3 manage.py migrate --noinput
```

## Production 

This will spin up 3 containers; nginx, gunicorn, and postgres containers
```bash
# Create .env file
sudo nano .env 

#copy these variables enter in custom variables below are just examples
DEBUG=1
SECRET_KEY=$SECRET_KEY
WSGI_APPLICATION=$WSGI_APPLICATION
ROOT_URLCONF=$ROOT_URLCONF

EMAIL_PASSWORD=$EMAIL_PASSWORD
EMAIL_ADMIN=$EMAIL_ADMIN
EMAIL_ADDRESS=$EMAIL_ADDRESS
EMAIL_PORT=$EMAIL_PORT
EMAIL_HOST=$EMAIL_HOST
EMAIL_USE_TLS=$EMAIL_USE_TLS

SQL_ENGINE=django.db.backends.postgresql
POSTGRES_DB=$POSTGRES_DB
POSTGRES_USER=$POSTGRES_USER
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
SQL_HOST=$SQL_HOST
SQL_PORT=$SQL_POST
DATABASE=$DATABASE

ALLOWED_HOSTS=yourdomainname.com,www.yourdomainname.com
CSRF_TRUSTED_ORIGINS=https://*.yourdomainname.com,http://*.yourdomainname.com

# Set permissions for .env
sudo chmod 600 .env.prod

# Create SSL Certificate
cd nginx
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./etc/ssl/private/localhost.key -out ./etc/ssl/certs/localhost.crt

# Change all the MODULENAME in this file to domain name used so nginx will work correctly. This config is designed to be used behind a proxy nginx server. 
sudo nano nginx/nginx.conf

# Command to build docker production containers
sudo docker-compose up -f docker-compose.prod.yml up -d --build

# Command to migrate all the django models 
sudo docker-compose -f docker-compose.prod.yml exec web python3 manage.py migrate

# Command to build all static files.
sudo docker-compose -f docker-compose.prod.yml exec web python3 manage.py collectstatic

```
