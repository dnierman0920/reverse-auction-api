FROM node:alpine
WORKDIR /Users/davidnierman/Desktop/side-projects/reverse-auction-api/api
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "start"]
