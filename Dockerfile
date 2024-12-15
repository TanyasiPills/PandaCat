FROM node:16

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN chmod +x ./start.sh

EXPOSE 3000 5173

CMD ["bash","./start.sh"]