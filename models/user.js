module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'jwtuser',
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
        User.hasMany(models.jwtcontact);
    };

    return User;
};
