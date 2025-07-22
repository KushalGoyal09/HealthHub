FROM node:18-bullseye as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-bullseye as backend

WORKDIR /app
COPY --from=builder /app ./
RUN apt-get update && apt-get install -y openssl
CMD ["node", "dist/app.js"]
