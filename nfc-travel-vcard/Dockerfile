# Dockerfile für nfc-travel-vcard
# Supports running both Next.js (port 3000) and Express API (port 3001) together

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


# Create supervisor config to run all services (Next.js + Express + nginx)
RUN mkdir -p /etc/supervisor.d/
COPY <<EOF /etc/supervisor.d/services.ini
[supervisord]
nodaemon=true

[program:nextjs]
command=npm start -- -p 3000
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:express]
command=node -r ts-node/register server.ts
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
environment=EXPRESS_PORT=3001

[program:nginx]
command=nginx -g "daemon off;"
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
EOF



# Expose the ports
# 3000: Next.js
# 3001: Express API
# 8090: nginx (if used)
EXPOSE 3000 3001 8090
CMD ["supervisord", "-c", "/etc/supervisor.d/services.ini"]