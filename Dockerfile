FROM ubuntu:14.04
MAINTAINER cassiuschen chzsh1995@gmail.com

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y nginx && rm -rf /var/lib/apt/lists/* && echo "\ndaemon off;" >> /etc/nginx/nginx.conf && chown -R www-data:www-data /var/lib/nginx
RUN echo "Asia/Shanghai" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata
RUN mkdir -pv /var/www
ADD ./ /var/www/lzlj
ADD ./nginx.conf /etc/nginx/con.d/lzlj.conf
RUN mkdir -pv /var/www/lzlj/log
RUN echo "Nginx Log" > /var/www/lzlj/log/nginx.access.log
RUN service nginx restart
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/lzlj"]
WORKDIR /var/www/lzlj
EXPOSE 80
EXPOSE 443
