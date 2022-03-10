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
            },
            status: {
                type: DataTypes.ENUM,
                values: ['entreprise', 'candidat'],
                allowNull: false,
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            freezeTableName: true,
        },
    );

    User.associate = models => {
        User.hasMany(models.job);
        User.hasMany(models.candidate);
    };

    return User;
};
