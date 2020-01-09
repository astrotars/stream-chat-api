import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import omit from 'lodash.omit';
import { StreamChat } from 'stream-chat';

import User from '../../../models/user';

dotenv.config();

exports.init = async (req, res) => {
	try {
		// extract json from body
		const data = req.body;

		let apiKey;
		let apiSecret;

		// if this env is found, it's assumed that the api is running on heroku
		if (process.env.STREAM_URL) {
			// extract the key and secret from the environment variable
			[apiKey, apiSecret] = process.env.STREAM_URL.substr(8)
				.split('@')[0]
				.split(':');
		} else {
			// api key and secret were provided from a .env file
			apiKey = process.env.STREAM_API_KEY;
			apiSecret = process.env.STREAM_API_SECRET;
		}

		const client = new StreamChat(apiKey, apiSecret);

		// if the channel does not exist, this creates a new channel (e.g. initialization)
		const channel = await client.channel('messaging', 'General');

		// if the user does not exist, create a new user
		let user = await User.findOneOrCreate(
			{ email: data.email }, // lowercase email to avoid lookup issues
			{
				name: {
					first: data.name.first,
					last: data.name.last,
				},
				email: data.email, // email is set to lowercase automatically by mongoose via model
				password: data.password, // password is hashed using bcrypt automatically by mongoose plugin
			}
		);

		// convert mongoose object to raw object (we can't do this with doc.toObject() because we're using a plugin)
		user = omit(user._doc, ['__v', 'createdAt', 'updatedAt']); // and remove data we don't need with the lodash omit

		// if the user does not exist
		if (!user) {
			// generate a new token based on the users unique database id (e.g. member.id)
			const token = client.createToken(user._id.toString());

			// add the new user to the general channel using their member id
			await channel.addMembers([user._id]);

			// update the users role (admin, channel_member, guest, etc.)
			await serverClient.updateUsers([
				{
					id: user._id,
					role: 'admin', // https://getstream.io/chat/docs/js/#update_users
				},
			]);

			// sanitize / remove password
			delete user.password;

			// return the response
			return res.json({ user, token, apiKey });
		}

		// validate that the provided password matches the hashed password stored in the database
		const match = await bcrypt.compare(data.password, user.password);

		// if the password does not match, throw a 403 forbidden error status code
		if (!match) {
			return res.sendStatus(403);
		}

		// generate token using the unique database id
		const token = client.createToken(user._id.toString());

		// sanitize / remove password
		delete user.password;

		// return the response with user data, token, and api key
		return res.json({ user, token, apiKey });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
