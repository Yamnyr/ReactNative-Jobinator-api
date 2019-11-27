module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
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
