const { authenticateUser, getJobById } = require("../control/actionsauthentication");

module.exports = (app, db) => {
	app.get('/api/candidates',
		(req, res) => {
			return db.candidates
				.findAll({
					attributes: ['jobId'],
					where: {
						userId: req.jwtId,
					},
				})
				.then(candidates => res.json(candidates));
		});

	app.post('/api/candidates/:id',
		(req, res, next) => authenticateUser(req, res, next, db),
		(req, res, next) => getJobById(req, res, next, db),
		(req, res) => {
			if (req.authenticateUser.status === "candidat") {
				db.candidate
					.create({
						userId: req.jwtId,
						jobId: req.params.id,
					})
					.then(candidate => res.status(201).json(candidate))
					.catch(error =>
						res.status(400).json({
							code: 'badrequest',
							message: error.errors[0].message,
						})
					)
			}
		});

	app.delete('/api/candidates/:id',
		(req, res, next) => authenticateUser(req, res, next, db),
		(req, res, next) => getJobById(req, res, next, db),
		async (req, res) => {
			const candidate = await db.candidate.findOne({ where: { userId: req.jwtId, jobId: req.params.id } })
			if (candidate) {
				db.candidate
					.destroy({
						where: {
							id: candidate.id,
						},
					})
					.then(result => res.status(204).json(result));
			} else {
				res.status(404).json({
					code: 'notfound',
					message: `candidate not found`,
				});
			}
		});
};
