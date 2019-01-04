FROM node:latest

RUN mkdir PROJECTHOME

COPY ./package.json PROJECTHOME
COPY ./webpack.config.js PROJECTHOME
COPY ./.babelrc PROJECTHOME
COPY ./package-lock.json PROJECTHOME
COPY ./js PROJECTHOME/js
COPY ./index.html PROJECTHOME
COPY ./style.css PROJECTHOME
COPY ./images PROJECTHOME/images

RUN mkdir PROJECTHOME/dist
WORKDIR PROJECTHOME
RUN npm install
RUN npm run build

FROM nginx:1.15.2-alpine

COPY --from=0 PROJECTHOME/dist /usr/share/nginx/html
#COPY --from=0 PROJECTHOME/dist /etc/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
