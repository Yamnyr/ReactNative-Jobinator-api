const { entrepriseControl, authenticateUser, getJobById } = require("../control/actionsauthentication");

module.exports = (app, db) => {
	/* liste les jobs de l'entreprise connecté ou tous les jobs pour un candidat connecté */
	app.get('/api/jobs',
		(req, res, next) => authenticateUser(req, res, next, db),
		(req, res) => {
			if (req.authenticateUser.status === "entreprise") {
				return db.job
					.findAll({
						attributes: ['id', 'name'],
						where: {
							userId: req.jwtId,
						},
					})
					.then(jobs => res.json(jobs));
			} else {
				return db.job
					.findAll({
						attributes: ['id', 'name'],
					})
					.then(jobs => res.json(jobs));
			}
		});

	app.post('/api/jobs',
		(req, res, next) => entrepriseControl(req, res, next, db),
		(req, res) =>
			db.job
				.create({
					...req.body,
					userId: req.jwtId,
				})
				.then(result => res.status(201).json(result))
				.catch(error =>
					res.status(400).json({
						code: 'badrequest',
						message: error.errors[0].message,
					})
				)
	);

	app.get('/api/jobs/:id',
		(req, res, next) => authenticateUser(req, res, next, db),
		(req, res, next) => getJobById(req, res, next, db),
		(req, res) => {
			if (req.authenticateUser.status === "entreprise") {
				if (req.job.userId === req.jwtId)
					res.json(req.job)
				else {
					res.status(403).json({
						code: `accessdenied`,
						message: `Job access denied for user ${req.jwtId}`,
					});
				}
			} else {
				res.json(req.job);
			}
		});

	app.put('/api/jobs/:id',
		(req, res, next) => getJobById(req, res, next, db),
		(req, res) => {
			if (req.jwtId === req.job.userId) {
				db.job
					.update({
						...req.body,
					}, {
						where: {
							id: req.params.id,
						},
					},
					)
					.then(result => res.json(result))
			} else {
				res.status(403).json({
					code: `accessdenied`,
					message: `Job access denied for user ${req.jwtId}`,
				});
			}
		});

	app.delete('/api/jobs/:id',
		(req, res, next) => getJobById(req, res, next, db),
		(req, res) => {
			if (req.jwtId === req.job.userId) {
				db.job
					.destroy({
						where: {
							id: req.params.id,
						},
					})
					.then(result => res.status(204).json(result));
			} else {
				res.status(403).json({
					code: `accessdenied`,
					message: `Job access denied for user ${req.jwtId}`,
				});
			}
		});

	app.get('/api/jobs/:id/candidates',
		(req, res, next) => getJobById(req, res, next, db),
		(req, res) => {
			if (req.jwtId === req.job.userId) {
				db.candidate.findAll({
					attributes: ['userId'],
					where: {
						jobId: req.job.id,
					},
				})
					.then(candidates => res.json(candidates))
			} else {
				res.status(403).json({
					code: `accessdenied`,
					message: `Job access denied for user ${req.jwtId}`,
				});
			}
		});
};
