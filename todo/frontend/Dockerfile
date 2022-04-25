FROM nginx:stable

COPY ./build var/www
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx
