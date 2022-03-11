module.exports = {
	entrepriseControl: (req, res, next) => {
		const isEnt = await db.user.findByPk(req.jwtId)
			.then(result => result.status === "entreprise");

		if (!isEnt) {
			res.status(403).json({
				code: `accessdenied`,
				message: `User access denied for user ${req.jwtId}`,
			});
		}
		
		next();
	}

    jobAuthentication: (req, res, next, db) => {
		db.job.findByPk(req.params.id).then(result => {
			if (result && req.jwtId === result.userId) {
				req.jobFromId = result;
				next();
			} else if (result) {
				res.status(403).json({
					code: `accessdenied`,
					message: `Job access denied for user ${req.jwtId}`,
				});
			} else {
				res.status(404).json({
					code: 'notfound',
					message: 'Job not found',
				});
			}
		});
	},
};
