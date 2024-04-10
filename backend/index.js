import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'

import { sequelize } from './models/index.js'

import PostsRouter from "./routes/PostsRouter.js"
import CommentsRouter from "./routes/CommentsRouter.js"
import AuthRouter from "./routes/AuthRouter.js"
import UsersRouter from "./routes/UsersRouter.js"

const port = 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(cookie())

app.use('/uploads', express.static('uploads'))
app.use('/posts', PostsRouter)
app.use('/comments', CommentsRouter)
app.use('/auth', AuthRouter)
app.use('/users', UsersRouter)

await sequelize.sync({ force: true })
    .then(() => {
        console.log('DB connected')
    })
    .catch((e) => {
        console.log(`DB error: ${e.message}`)
    })

app.get('/', (req, res) => {
    res.send('Default route')
})

app.listen(port, () => {
    console.log('Server started')
})