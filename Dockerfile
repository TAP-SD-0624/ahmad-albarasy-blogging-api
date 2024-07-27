FROM node:latest

# specifying the working dir for our image (so when we run 'npm i' it works in the /app dir) 
WORKDIR /app

# copying source code files into our image
COPY . .

RUN npm i

# this is the port we should expose (to listen for requests)
EXPOSE 80 

CMD ["npm run", "test"]