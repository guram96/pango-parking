## Temporary image only used to build server
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm install typescript -g
RUN tsc

## Optimized image used as server
FROM node:22-alpine AS server
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package* ./
COPY package-lock.json ./
RUN npm i
EXPOSE 3000
CMD ["npm", "run","start:prod"]