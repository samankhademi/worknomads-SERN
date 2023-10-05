# Dockerfile

# Use node alpine as it's a small node image
FROM node:alpine

# Create the directory on the node image
# where our Next.js app will live
RUN mkdir -p /usr/src/react-app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

# Install dependencies in /app
RUN yarn

# Copy the rest of our Next.js folder into /app
COPY . .

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line
RUN yarn build
CMD ["npm", "start"]
