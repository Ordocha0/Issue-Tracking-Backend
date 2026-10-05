# Use official Node.js LTS image
FROM node:20

# Set NODE_ENV BEFORE any install so npm prunes devDependencies correctly
ENV NODE_ENV=production

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for caching layers)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the app
COPY . .

# Expose the app port
EXPOSE 3003

# Start the app
CMD ["npm", "start"]
