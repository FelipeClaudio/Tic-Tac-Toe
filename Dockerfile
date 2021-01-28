FROM node:latest as build

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN yarn build

FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html