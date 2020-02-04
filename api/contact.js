const contactAuth = require('../jwtControl/actionsauthentication').contactAuthentication;

module.exports = (app, db) => {
    /**
     * Utilise l'identifiant de jwt req.jwtId pour les requètes
     */
    app.get('/api/contacts', (req, res) => {
        db.jwtcontact
            .findAll({
                attributes: ['id', 'firstName', 'lastName'],
                where: {
                    jwtuserId: req.jwtId,
                },
            })
            .then(contacts => res.json(contacts));
    });

    app.post('/api/contact', (req, res) =>
        db.jwtcontact
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                avatar: req.body.avatar,
                jwtuserId: req.jwtId,
            })
            .then(result => res.status(201).json(result))
            .catch(error =>
                res.status(400).json({
                    code: 'badrequest',
                    message: error.errors[0].message,
                }),
            ),
    );

    /**
     * Controle l'authorisation d'accès au contact :id
     */
    app.use('/api/contact/:id', (req, res, next) => contactAuth(req, res, next, db));

    app.get('/api/contact/:id', (req, res) => res.json(req.contactFromId));

    app.put('/api/contact/:id', (req, res) =>
        db.jwtcontact
            .update(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    avatar: req.body.avatar,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                },
            )
            .then(result => res.json(result)),
    );

    app.delete('/api/contact/:id', (req, res) =>
        db.jwtcontact
            .destroy({
                where: {
                    id: req.params.id,
                },
            })
            .then(result => res.status(204).json(result)),
    );
};
