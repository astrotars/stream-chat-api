module.exports = (options) => (req, res, next) => {
	if (req.headers.authorization === options.key) {
		return next();
	} else {
		res.status(401).json({
			error: 'Missing or incorrect authentication credentials.'
		});

		return;
	}
};
