FROM node:20.11-slim

# server configuration
ENV NODE_ENV "development"
ENV HOST "0.0.0.0"
ENV PORT 5000

ARG PORT PORT
ARG HOST HOST
ARG PORT PORT

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE $PORT
CMD [ "node", "./src/server.js" ]