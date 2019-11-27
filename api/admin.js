module.exports = (app, db) => {
    app.get('/admin/contacts', (req, res) => {
        db.contact.findAll().then(result => {
            res.json(result);
        });
    });

    app.get('/admin/contact/:id', (req, res) => db.contact.findByPk(req.params.id).then(result => res.json(result)));

    app.post('/admin/contact', (req, res) =>
        db.contact
            .create({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                phone: req.body.phone,
                avatar: req.body.avatar,
                userId: req.body.userId,
            })
            .then(result => res.json(result)),
    );

    app.put('/admin/contact/:id', (req, res) =>
        db.contact
            .update(
                {
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    phone: req.body.phone,
                    avatar: req.body.avatar,
                    userId: req.body.userId,
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
        db.contact
            .destroy({
                where: {
                    id: req.params.id,
                },
            })
            .then(result => res.json(result)),
    );

    app.get('/admin/user/:id', (req, res) => {
        db.user.findByPk(req.params.id).then(result => res.json(result));
    });

    app.get('/admin/users', (req, res) => {
        db.user.findAll().then(result => {
            res.json(result);
        });
    });
};
