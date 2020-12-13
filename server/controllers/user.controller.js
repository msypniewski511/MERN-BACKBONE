import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res, next) => {
	const user = new User(req.body);
	try {
		await user.save();
		return res.status(200).json({
			message: 'Successfully signed up!',
		});
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};
const list = async (req, res) => {
	try {
		let users = await User.find().select('name email updated created');
		res.json(users);
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
};
const userByID = async (req, res, next, id) => {
	try {
		let user = await User.findById(id);
		if (!user)
			return res.status('400').json({
				error: 'User not found',
			});
		req.profile = user;
		next();
	} catch (err) {
		return res.status('400').json({
			error: 'Could not retrieve user',
		});
	}
};
const read = (req, res) => {
	req.profile.hashed_password = undefined;
	req.profile.salt = undefined;
	return res.json(req.profile);
};

const update = (req, res, next) => {};
const remove = (req, res, next) => {};

export default { create, userByID, read, list, remove, update };
