module.exports = (app, db) => {
    app.get('/admin/contacts', (req, res) => {
        db.jwtcontact.findAll().then(result => {
            res.json(result);
        });
    });

    app.get('/admin/contact/:id', (req, res) => db.jwtcontact.findByPk(req.params.id).then(result => res.json(result)));

    app.post('/admin/contact', (req, res) =>
        db.jwtcontact
            .create({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                phone: req.body.phone,
                avatar: req.body.avatar,
                jwtuserId: req.body.userId,
            })
            .then(result => res.json(result)),
    );

    app.put('/admin/contact/:id', (req, res) =>
        db.jwtcontact
            .update(
                {
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    phone: req.body.phone,
                    avatar: req.body.avatar,
                    jwtuserId: req.body.userId,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                },
            )
            .then(result => res.json(result)),
    );

    app.delete('/admin/contact/:id', (req, res) =>
        db.jwtcontact
            .destroy({
                where: {
                    id: req.params.id,
                },
            })
            .then(result => res.json(result)),
    );

    app.get('/admin/user/:id', (req, res) => {
        db.jwtuser.findByPk(req.params.id).then(result => res.json(result));
    });

    app.get('/admin/users', (req, res) => {
        db.jwtuser.findAll().then(result => {
            res.json(result);
        });
    });
};
