FROM node:latest as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY webpack.config.js ./
COPY babel.config.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

# Bundle app source
COPY src/ src/
RUN yarn build

FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html