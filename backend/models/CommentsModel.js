export default function (sequelize, DataTypes) {
    const Comments = sequelize.define('Comments', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    })

    Comments.associate = (models) => {
        Comments.belongsTo(models.Users, {
            foreignKey: 'userId'
        })
    }

    return Comments
}