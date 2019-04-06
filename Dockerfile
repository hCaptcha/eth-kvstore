
FROM node:alpine

WORKDIR /work
RUN apk update && \
    apk upgrade && \
    apk add git python-dev build-base
COPY package.json package-lock.json /work/
RUN npm install

COPY . /work/

CMD ["npm", "run", "deploy"]
