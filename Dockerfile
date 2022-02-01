FROM node:16
WORKDIR /usr/app/
ADD package.json ./
ADD package-lock.json ./
ADD pages/ ./
ADD public/ ./
ADD components/ ./

RUN npm install

CMD npm run build