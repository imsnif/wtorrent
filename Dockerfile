FROM node:argon

# Create storage directory
RUN mkdir -p /var/wtorrent

# Create app directory
RUN mkdir -p /usr/src/wtorrent
WORKDIR /usr/src/wtorrent

# Bundle app source
COPY . /usr/src/wtorrent

# Install app dependencies
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]
