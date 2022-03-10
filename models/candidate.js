module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define(
        'candidate',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        {
            freezeTableName: true,
        },
    );

    Candidate.associate = models => {
        Candidate.belongsTo(models.user);
        Candidate.belongsTo(models.job);
    };

    return Candidate;
};
