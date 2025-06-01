# Dockerfile für nfc-travel-vcard

FROM node:20-alpine

WORKDIR /app


# Install supervisor
RUN apk add --no-cache supervisor nginx

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


# Configure nginx as a reverse proxy
RUN mkdir -p /etc/nginx/http.d
COPY dockerfiles/nginx/default.conf /etc/nginx/http.d/default.conf


# Create supervisor config to run all services
RUN mkdir -p /etc/supervisor.d/
COPY <<EOF /etc/supervisor.d/services.ini
[supervisord]
nodaemon=true

[program:api]
command=node server/api.js -l 3001 --debug
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:ui]
command=serve -s dist -l 3000
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:nginx]
command=nginx -g "daemon off;"
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
EOF



# Expose the port serve will use
EXPOSE 8090
# Expose the port for the ui
EXPOSE 3000
# Expose the port for the api
EXPOSE 3001
CMD ["supervisord", "-c", "/etc/supervisor.d/services.ini"]