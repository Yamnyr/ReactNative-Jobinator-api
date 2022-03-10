module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define(
        'job',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            freezeTableName: true,
        },
    );

    Job.associate = models => {
        Job.belongsTo(models.user);
        Job.hasMany(models.candidate);
    };

    return Job;
};
