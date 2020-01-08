FROM mhart/alpine-node:latest
RUN apk update && apk upgrade
RUN apk add --no-cache make gcc g++ python git
WORKDIR /usr/src/api
COPY . /usr/src/api
EXPOSE 8080
CMD ["yarn", "start"]