FROM node:latest

EXPOSE 5000

WORKDIR /app

COPY ./package.json ./

RUN npm install -g serve

RUN npm install -g npm

RUN npm install

COPY . .

CMD ["npm", "run", "start"]