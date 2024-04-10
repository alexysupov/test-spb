import bcrypt from "bcrypt";

export default function (sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt
                    .hash(user.password, 10)
                    .catch(error => { throw error })
            },
            beforeUpdate: async (user) => {
                user.password = await bcrypt
                    .hash(user.password, 10)
                    .catch(error => { throw error })
            }
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            foreignKey: 'userId'
        })
        Users.hasMany(models.Comments, {
            foreignKey: 'userId'
        })
    }

    return Users
}