export default function (sequelize, DataTypes) {
    const Posts = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        }
    }, {
        freezeTableName: true,
        tableName: 'Posts'
    })

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: 'cascade',
            foreignKey: 'postId'
        })
        Posts.belongsTo(models.Users, {
            foreignKey: 'userId'
        })
    }

    return Posts
}