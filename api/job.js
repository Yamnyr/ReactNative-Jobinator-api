module.exports = (app, db) => {
    /**
     * Utilise l'identifiant de jwt req.jwtId et le status de l'utilisateur pour la réponse
     */
    app.get('/api/jobs/ent', (req, res) => {
        db.user.findByPk(req.jwtId)
            .then(result => {
                if (result.status !== "entreprise") {
                    res.json([])
                } else {
                    db.job
                        .findAll({
                            attributes: ['id', 'name'],
                            where: {
                                userId: req.jwtId,
                            },
                        })
                        .then(jobs => res.json(jobs));
                }
            });
    });

    app.get('/api/jobs/candidat', (req, res) => {
        db.job
            .findAll({
                attributes: ['id', 'name'],
            })
            .then(jobs => res.json(jobs));
    });

    app.post('/api/jobs', (req, res) =>
        db.user.findByPk(req.jwtId)
            .then(result => {
                if (result.status === "entreprise") {
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
                }
            })
    );

    /**
     * Controle l'autorisation d'accès au contact :id
     */
    /*app.use('/api/jobs/:id', (req, res, next) => {
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
    });*/

    app.get('/api/jobs/:id', (req, res) => db.job.findByPk(req.params.id).then(result => res.json(result)));

    app.put('/api/jobs/:id', (req, res) =>
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
    );

    app.delete('/api/jobs/:id', (req, res) =>
        db.job
            .destroy({
                where: {
                    id: req.params.id,
                },
            })
            .then(result => res.status(204).json(result)),
    );
};
