FROM node:16-alpine3.11

WORKDIR /app

COPY package*.json ./

ENV SERVER_PORT=3000
ENV HOSTNAME_MONGODB=interstellar.k8idl.mongodb.net
ENV BD_MONGODB=puzzledb
ENV USER_MONGODB=agiladalton
ENV PASS_MONGODB=soloyo258
ENV JWT_SECRET=puzzle
ENV JWT_EXPIRES_TIME=300s

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]