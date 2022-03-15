module.exports = {
	authenticateUser: (req, res, next, db) => {
		db.user.findByPk(req.jwtId)
		.then(user => {
			if (user) {
				req.authenticateUser = user;
				next();
			} else {
				res.status(404).json({
					code: 'notfound',
					message: 'authenticate user not found',
				});
			}
		});
	},

	entrepriseControl: (req, res, next, db) => {
		db.user.findByPk(req.jwtId)
			.then(user => {
				if (user.status !== "entreprise") {
					res.status(403).json({
						code: `accessdenied`,
						message: `access denied for user ${req.jwtId}`,
					});
				}
		
				next();		
			});

	},

	candidateControl: (req, res, next, db) => {
		db.user.findByPk(req.jwtId)
			.then(result => {
				if (result.status !== "candidat") {
					res.status(403).json({
						code: `accessdenied`,
						message: `access denied for user ${req.jwtId}`,
					});
				}
				
				next();		
			});
	},

	getJobById : (req, res, next, db) => {
		db.job.findByPk(req.params.id)
			.then(job => {
				if (job) {
					req.job = job;
					next();
				} else {
					res.status(404).json({
						code: 'notfound',
						message: `Job ${req.params.id} not found`,
					});
				}
			});
	},
};
