FROM nginx:latest
ENV WEB_PATH usr/share/nginx/html/
COPY dist/hnpwa/ $WEB_PATH
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]
# docker run -i -t -p 8082:80 node-image:latest
# docker run -d -p 8080:3000 -v $(pwd):/usr/share/nginx/html nginx:latest

# docker rmi $(docker images -a -q)

