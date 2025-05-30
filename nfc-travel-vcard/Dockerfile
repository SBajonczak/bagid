# Dockerfile für nfc-travel-vcard

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Add environment variables for database configuration
ENV DB_USER="sbaadmin"
ENV DB_PASSWORD="=S?p86`YCYjo*7TNc~[S"
ENV DB_SERVER="sbadbprod.database.windows.net,1433"
ENV DB_DATABASE="nfc"

# Build the application
RUN npm run build

# Install serve to host the production build
RUN npm install -g serve

# Expose the port serve will use
EXPOSE 8080

# Command to serve the production build
CMD ["serve", "-s", "build"]
# CMD ["serve", "-s", "build", "-l", "80"]
