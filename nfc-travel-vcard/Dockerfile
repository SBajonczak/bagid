# Dockerfile für nfc-travel-vcard

FROM node:20-alpine

WORKDIR /app

# Install supervisor and nginx
RUN apk add --no-cache supervisor nginx

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_OPTIONS="--openssl-legacy-provider"

# Build the application
RUN npm run build

# Configure nginx as a reverse proxy
RUN mkdir -p /etc/nginx/http.d
COPY dockerfiles/nginx/default.conf /etc/nginx/http.d/default.conf


# Create supervisor config to run all services
RUN mkdir -p /etc/supervisor.d/
COPY <<EOF /etc/supervisor.d/services.ini
[supervisord]
nodaemon=true

[program:ui]
environment=PUBLIC_PORT="8090"
command=npm start -- -H 0.0.0.0 -p 3000
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



# Expose the port nginx will use
EXPOSE 8090
CMD ["supervisord", "-c", "/etc/supervisor.d/services.ini"]