import { init } from '../controllers/v1/init';

import { wrapAsync } from '../utils/controllers';

module.exports = api => {
	api.route('/v1/init').post(wrapAsync(init));
};
