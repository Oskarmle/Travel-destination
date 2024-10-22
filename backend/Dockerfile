# Use Node.js 16 as the base image
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker layer caching)
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all other backend files to the container
COPY . .

# Expose the backend port
EXPOSE 3003

# Start the backend server
CMD ["node", "server.js"]
