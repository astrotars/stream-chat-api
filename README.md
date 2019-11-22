# Example API in Node.js for Stream Chat

## Overview

This API will quickly get you up to speed on best practices for deploying an auth API for [Stream Chat](https://getstream.io/chat/). The API can be deployed Heroku with a single click or to any other hosting environment that supports Node.js.

## Technology Used

The following technologies were used to build this application:

-   [Node.js](https://nodejs.org)
-   [Express](https://expressjs.com/)
-   [MongoDB Atlas](https://atlas.mongodb.com)
-   [Mongoose](https://mongoosejs.com/)
-   [Stream Chat](https://getstream.io/chat/)

## Support:

-   User storage via MongoDB database
-   Mongoose schema with validation for user profiles
-   Password validation and hashing with bcrypt
-   Find or create for users within the MongoDB database
-   Easy deployment to Heroku (optional) or any other environment
-   Token generation for existing and new users (for Stream Chat)
-   Creation of a new channel named `General` if one does not exist
-   Automatic adding of users to the `General` channel
-   Heavily commented modern JavaScript

Please see below for installation requirements.

## Requirements

This section covers the various requirements for deploying this API in different environments. When in doubt, have a look at the `.env.example` file which outlines what required variables you will need to supply in order for the API to run properly.

### Heroku

The easiest method to deploy this API to Heroku is to click the deploy button below:

<p>
  <a href="https://heroku.com/deploy?template=https://github.com/nparsons08/stream-chat-api" target="_blank">
    <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
  </a>
</p>

> Note: You will need to spin up a MongoDB cluster and add your MongoDB URI to your environment variables under the `Settings` section of your applications dashboard on Heroku. Ensure that the environment variable is named `MONGODB_URI`. For local installations, you will need to add your MongoDB URI to the `.env` file in the root of this project.

_[MongoDB Atlas](https://atlas.mongodb.com) provides 100% free shared clusters to all customers on various cloud providers such as AWS, GCP, and Azure._
