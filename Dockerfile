# Use Node.js slim image for a smaller footprint
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the port the app runs on (assuming 3000, but can be configured via ENV)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
