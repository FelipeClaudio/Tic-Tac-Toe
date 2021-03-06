FROM node:latest as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY webpack.config.js ./webpack.config.js
COPY babel.config.json ./babel.config.json

RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .
RUN yarn build

FROM nginx:latest

COPY ./nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'