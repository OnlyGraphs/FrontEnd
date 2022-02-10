FROM node:16
WORKDIR /usr/app/

ARG TOKEN
ARG BACKEND

RUN git clone https://${TOKEN}@github.com/OnlyGraphs/FrontEnd.git

WORKDIR /usr/app/FrontEnd

RUN echo NEXT_PUBLIC_BACKEND=${BACKEND} >> .env.local

RUN npm install

CMD npm run build