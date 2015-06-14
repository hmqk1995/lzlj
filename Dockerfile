FROM ubuntu:14.04
MAINTAINER cassiuschen chzsh1995@gmail.com

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y -q nginx
RUN echo "Asia/Shanghai" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata
RUN mkdir -pv /var/www
ADD ./ /var/www/lzlj
ADD ./nginx.conf /etc/nginx/nginx.conf
ADD ./site.conf /etc/nginx/conf.d/
RUN mkdir -pv /var/www/lzlj/log
RUN service nginx stop
WORKDIR /var/www/lzlj
VOLUME ["/var/www/lzlj"]
EXPOSE 80
EXPOSE 443
