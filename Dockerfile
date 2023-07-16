FROM node:18.16.0

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_HOST=mysql \
    DATABASE_PORT=3306 \
    DATABASE_USERNAME=root \
    DATABASE_PASSWORD=root \
    DATABASE_SCHEMA=fiap

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY dist ./dist
# COPY swagger.js ./swagger.js

CMD npm run start:prod