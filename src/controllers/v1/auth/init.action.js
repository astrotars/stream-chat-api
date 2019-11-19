import dotenv from 'dotenv';
import { StreamChat } from 'stream-chat';

import User from '../../../models/user';

dotenv.config();

exports.init = async (req, res) => {
	try {
		const data = req.body;

		let apiKey;
		let apiSecret;

		if (process.env.STREAM_URL) {
			[apiKey, apiSecret] = process.env.STREAM_URL.substr(8)
				.split('@')[0]
				.split(':');
		} else {
			apiKey = process.env.STREAM_API_KEY;
			apiSecret = process.env.STREAM_API_SECRET;
		}

		const exists = await User.findOne({ email: data.email.toLowerCase() });

		const client = new StreamChat(apiKey, apiSecret);

		if (exists) {
			const user = {
				id: exists._id,
				role: 'member',
				image: `https://ui-avatars.com/api/?name=${exists.name.first}+${exists.name.last}&size=200&background=0480f0&color=ffffff`,
				name: {
					first: exists.name.first,
					last: exists.name.last,
				},
			};

			const token = client.createToken(user.id);

			return res.status(200).json({ user, token, apiKey });
		} else {
			const create = await User.create({
				name: {
					first: exists.name.first,
					last: exists.name.last,
				},
				password: data.password,
			});

			const user = Object.assign(
				{},
				{
					id: create._id,
					role: 'channel_member',
					image: `https://ui-avatars.com/api/?name=${data.name.first}+${data.name.last}&size=200&background=0480f0&color=ffffff`,
					name: create.name,
				}
			);

			const token = client.createToken(user.id);
			await client.updateUser(user);

			return res.status(200).json({ user, token, apiKey });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
