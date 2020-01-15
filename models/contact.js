module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define(
        'jwtcontact',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            avatar: DataTypes.STRING,
        },
        {
            freezeTableName: true,
        },
    );

    Contact.associate = models => {
        Contact.belongsTo(models.jwtuser);
    };

    return Contact;
};
