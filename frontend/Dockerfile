
FROM alpine
ADD ./nginx_conf/nginx.react.conf /etc/nginx/http.d/default.conf
RUN apk add --no-cache nginx
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
WORKDIR /var/www/localhost/htdocs

