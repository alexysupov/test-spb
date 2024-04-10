import { Sequelize, DataTypes } from 'sequelize'
import pg from 'pg'

import PostsModel from './PostsModel.js'
import CommentsModel from "./CommentsModel.js"
import UsersModel from "./UsersModel.js"

export const sequelize = new Sequelize('db_blog', 'user', 'password', {
    host: 'postgres',
    dialect: 'postgres',
    dialectModule: pg
})

export const Posts = PostsModel(sequelize, DataTypes)
export const Comments = CommentsModel(sequelize, DataTypes)
export const Users = UsersModel(sequelize, DataTypes)

for (const model of Object.values(sequelize.models)) {
    if ('associate' in model) {
        model.associate(sequelize.models)
    }
}
