# ---- Base ----
FROM mhart/alpine-node:12 AS base
# Create application directory
RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/dist
# Set working directory
WORKDIR /opt/app
# Copy project files
COPY package.json yarn.lock /opt/app/

# ---- Dependencies ----
FROM base AS dependencies
COPY ./src /opt/app/src
# Install NPM packages and build source
RUN yarn install --ignore-engines
# Build source
RUN yarn build

# ---- Release ----
FROM dependencies AS release
# Copy node_modules from dependencies
COPY --from=dependencies /opt/app/node_modules ./node_modules
COPY --from=dependencies /opt/app/dist ./dist
# Copy app source
COPY . .


EXPOSE 8080

CMD ["yarn", "start"]
