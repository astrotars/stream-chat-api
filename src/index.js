import dotenv from 'dotenv';

dotenv.config();

import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import './utils/db';
import auth from './utils/auth';

const api = express();

api.use(cors());
api.use(compression());
api.use(helmet());
api.use(express.json());
api.use(auth({ key: process.env.AUTH_KEY, override: false }));

api.listen(process.env.PORT, (error) => {
	if (error) {
		console.warn('Database connection error.', new Error(error));
		process.exit(1);
	}

	// eslint-disable-next-line array-callback-return
	fs.readdirSync(path.join(__dirname, 'routes')).map((file) => {
		require('./routes/' + file)(api);
	});

	console.info(`API is now running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode. 👨‍🚀`);
});

module.exports = api;
