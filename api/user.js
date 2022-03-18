const KJUR = require('jsrsasign');
const { secret } = require('../config/config');
const { entrepriseControl, authenticateUser } = require('../control/actionsauthentication');

function getTokens({ id }) {
	let jwt = KJUR.jws.JWS.sign(null, { alg: 'HS256' }, { sub: id }, secret);
	return { jwt };
}

module.exports = (app, db) => {
	app.post('/login', (req, res) => {
		let { body } = req;

		if (body?.password && body?.login) {
			db.user.findOne({ where: { login: body.login, password: body.password } })
				.then(user => {
					if (!user) {
						res.status(401).json({
							error: 'wrongcredentials',
							message: 'Wrong login or password',
						});
					} else {
						res.json(getTokens(user));
					}

				})
		} else {
			res.status(401).json({ error: 'nocredentials', message: 'Credentials requiered !' });
		}
	});

	app.post('/register', (req, res) => {
		db.user
			.create({
				name: req.body.name,
				status: req.body.status,
				login: req.body.login,
				password: req.body.password,
			})
			.then(result => res.status(201).json(result))
			.catch(error =>
				res.status(400).json({
					code: 'badrequest',
					message: error.errors[0].message,
				}),
			);
	});

	app.get('/api/user',
		(req, res, next) => authenticateUser(req, res, next, db),
		(req, res) => {
			res.json(req.authenticateUser);
		});

	app.get('/api/user/id',
		(req, res, next) => entrepriseControl(req, res, next, db),
		async (req, res) => {
			db.user.findByPk(req.params.id).then(result => {
				if (result) res.json(result);
				else {
					res.status(404).json({
						code: 'notfound',
						message: `User id ${req.params.id} not found`,
					});
				}
			});
		});
};
