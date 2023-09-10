FROM nginx
 
LABEL maintainer="xueke.alan@gmail.com"
 
RUN rm /etc/nginx/conf.d/default.conf
 
ADD default.conf /etc/nginx/conf.d/
 
COPY dist /usr/share/nginx/html