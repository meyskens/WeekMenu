FROM httpd:2.4-buster

RUN apt-get update && apt-get install -y python3.7 python3-pip

COPY ./public_html /var/www/html/
COPY ./api /var/www/html/api

WORKDIR /var/www/html/

RUN cd /var/www/html/api && pip3 install -r requirements.txt
RUN chmod +x /var/www/html/api/menu.py

COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf