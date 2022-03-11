
const KJUR = require('jsrsasign');
const { secret } = require('../config/config');
const { entrepriseControl } = require('../control/actionsauthentication');

function getTokens({ id }) {
	let jwt = KJUR.jws.JWS.sign(null, { alg: 'HS256' }, { sub: id }, secret);
	return { jwt };
}

module.exports = (app, db) => {
	app.post('/login', (req, res) => {
		let { body } = req;

		if (!body || !(body.login && body.password)) {
			res.status(401).json({ error: 'nocredentials', message: 'Credentials requiered !' });
		}

		if (body.password) {
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

	app.get('/api/user', (req, res) => {
		db.user.findByPk(req.jwtId).then(result => {
			if (result) res.json(result);
			else {
				res.status(404).json({
					code: 'notfound',
					message: `User id ${jwtId} not found`,
				});
			}
		});
	});

	/* check if user is an entreprise */
	app.use('/api/user/id', entrepriseControl);

	app.get('/api/user/id', async (req, res) => {
		db.user.findByPk(req.jwtId).then(result => {
			if (result) res.json(result);
			else {
				res.status(404).json({
					code: 'notfound',
					message: `User id ${jwtId} not found`,
				});
			}
		});
	});
};
