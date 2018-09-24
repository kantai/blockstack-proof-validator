FROM node:8

# Project directory
WORKDIR /src/subdomain-registrar
COPY . .

RUN npm i

CMD node ./index.js

