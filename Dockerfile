FROM ubuntu:14.04
MAINTAINER cassiuschen chzsh1995@gmail.com

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y nginx git-core
RUN mkdir -pv /var/www
ADD ./ /var/www/lzlj
ADD ./nginx.conf /etc/nginx/con.d/lzlj.conf
RUN service nginx restart
