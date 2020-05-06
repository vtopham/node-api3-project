// code away!

const server = require('./server.js')

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')

server.use('/users',userRouter)
server.use('/posts',postRouter)

server.listen(4000, _ => {
    console.log("Listening on 4000")
})