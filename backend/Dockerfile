FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install \
    && npm run gen \
    && npm run build
EXPOSE 4000
CMD ["npm", "start"]