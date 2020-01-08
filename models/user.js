module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                validate: {
                    len: 1,
                },
            },
        },
        {
            freezeTableName: true,
        },
    );

    User.associate = models => {
        User.hasMany(models.contact);
    };

    return User;
};
