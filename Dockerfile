FROM node:16
WORKDIR /usr/app/

ARG TOKEN

RUN git clone https://${TOKEN}@github.com/OnlyGraphs/FrontEnd.git

WORKDIR /usr/app/FrontEnd

RUN npm install

CMD npm run build