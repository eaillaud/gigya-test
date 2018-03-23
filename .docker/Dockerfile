FROM php:7.1-apache

MAINTAINER Enrico Aillaud <enrico.aillaud@yameveo.com>

COPY . /var/www/html
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /var/www/html

# Install developer dependencies
RUN apt-get update -yqq && apt-get install -y --no-install-recommends apt-utils git libsqlite3-dev libxml2-dev libicu-dev libfreetype6-dev libmcrypt-dev libjpeg62-turbo-dev libpng12-dev libcurl4-gnutls-dev libbz2-dev libssl-dev vim -yqq

