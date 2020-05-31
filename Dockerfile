FROM node:lts-alpine

RUN apk add --no-cache git
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production
COPY . .
CMD npm run 
