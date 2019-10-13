################### STAGE BUILDER ##############################
# Create image based on the official Node 10 image from dockerhub
FROM node:10-alpine

# Change directory so that our commands run inside this new directory
WORKDIR /workdir

# Copy dependency definitions
COPY . /workdir

# Install dependecies
RUN npm install --loglevel silly

# Expose the port the app runs in
EXPOSE 4200

#
ENTRYPOINT [ "npm", "run" ]

# Serve the app
CMD [ "start:dev" ]