# Use Node.js 16 as the base image
FROM node:16

# Set working directory
WORKDIR /app

# If no npm packages are needed, remove the following two lines
# COPY package*.json ./
# RUN npm install

# Copy all frontend files (HTML, CSS, JS)
COPY . .

# Expose frontend port
EXPOSE 3000

# Start frontend server using live-server
CMD ["npx", "live-server", "--host=0.0.0.0", "--port=3000"]
