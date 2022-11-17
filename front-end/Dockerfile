FROM node:16

RUN mkdir /app

WORKDIR /app

COPY ["package.json", "tsconfig.json", "/app/"]

COPY ./ /app/

RUN cd /app && npm i --legacy-peer-deps

RUN npm -s run build

RUN mkdir -p /var/www/html

RUN mv build/* /var/www/html

WORKDIR /

RUN rm -rf /app