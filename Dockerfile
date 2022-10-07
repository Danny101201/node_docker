FROM node:alpine
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
ARG NODE_ENV
RUN npm i nodemon -g
RUN if ["$NODE_ENV" = "development"]; \
    then npm ci ; \
    else npm i --only=production; \
    fi  
ENV PORT 3001
COPY . .
EXPOSE $PORT
CMD node app.js
