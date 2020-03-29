FROM node

LABEL version="0.1"
LABEL description="Base docker image"
LABEL maintainer "EmmsDan[emmsdan.inc@gmail.com]"


WORKDIR /usr/api/auth

COPY . .

# install dependencies and
# run tests

RUN npm install pg && npm i mysql2 && npm install -g nodemon


# RUN npm install && npm run ci
RUN npm install
# build the project
#RUN npm run build

EXPOSE 40000

CMD ["npm", "run", "dev"]
