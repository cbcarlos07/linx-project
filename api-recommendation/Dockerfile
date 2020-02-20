FROM node:12.16.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 4002

CMD ["npm","run", "dev"]