FROM node:9.6.1

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn
COPY package.json package.json
RUN npm install
RUN npm install -g serve
ENV PATH /node_modules/.bin:$PATH

RUN mkdir -p /app
WORKDIR /app