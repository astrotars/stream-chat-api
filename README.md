# Stream Chat Boilerplate API

> **_This API is not meant for production as there is no auth in place. Please use carefully in testing and development environments only!_**

## Getting Started

To spin this up, clone it and run `yarn install` within the root directory, then run `yarn start`. Create a `.env` file within the main directory with the following environment variables found on https://getstream.io/dashboard:

```
NODE_ENV=production
PORT=8080

STREAM_API_KEY=<YOUR_API_KEY>
STREAM_API_SECRET=<YOUR_API_SECRET>
```

> Note: You can reference `.env.example`.

## To spin up the API, click the Deploy with Heroku button below!

Alternatively, you can spin up the API using Heroku. This Heroku deploy button will autodeploy the API as well as provision a chat trial with Stream. The environment variables will be automatically added to the project. This is by far the easiest way to get up and running.

<a href="https://heroku.com/deploy?template=https://github.com/nparsons08/stream-chat-boilerplate-api" target="_blank">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>
