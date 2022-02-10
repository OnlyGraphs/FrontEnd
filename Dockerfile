FROM node:16
WORKDIR /usr/app/

ARG TOKEN

RUN git clone https://${TOKEN}@github.com/OnlyGraphs/FrontEnd.git

RUN cd FrontEnd

RUN npm install

CMD npm run build