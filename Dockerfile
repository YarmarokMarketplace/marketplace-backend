FROM node:18-alpine
ENV PORT=8081

WORKDIR /app
COPY . .

COPY package.json .
RUN npm install

EXPOSE $PORT
CMD npm run start
