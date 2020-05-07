// code away!

const server = require('./server.js')

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

server.use('/users',userRouter)
server.use('/posts',postRouter)

const port = process.env.PORT || 4000
server.listen(port, _ => {
    console.log(`Listening on ${port}`)
})