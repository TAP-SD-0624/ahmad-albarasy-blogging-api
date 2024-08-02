FROM node:latest

# specifying the working dir for our image (so when we run 'npm i' it works in the /app dir) 
WORKDIR /app

COPY package.json .

# the RUN command works while the image is being built (making the image)
RUN npm i

# copying source code files into our image
COPY . .

# this is the port we should expose (to listen for requests)
EXPOSE 80 