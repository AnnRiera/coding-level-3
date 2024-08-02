FROM node:20-alpine
WORKDIR /home/node/app
COPY package.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run compile
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "src/index.js"]