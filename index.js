const express = require('express');
const dotenv =  require('dotenv');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const {connectDb} = require('./config/db');
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const Comment = require("./models/comment");
const fs = require('fs/promises');

dotenv.config({path:'./config/.env'});


const io = new Server(httpServer,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});


io.on('connection',  (socket) => {

    socket.on('add-comment',  async ({page, limit, key, sort}) => {
        const offset = (page - 1) * limit;

        const data = await Comment.findAll({
            where: {
                parentId: null
            },
            order: [
                [key, sort]
            ],
            limit:Number(limit),
            offset,
            include: [{ model: Comment, as: 'descendents', hierarchy: true }]
        })

        io.emit('get-comment', data)
    })


})


const commentsRouter = require('./routes/api/comments')


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';


app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connectDb();


app.use('/api/v1/comments', commentsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
console.log(err.message);
  if(err.status || err.message) {
   return res.status(err.status=400).json({ message: err.message })
  }
  res.status(500).json({ message: 'Internal Server Error'})
})


const {PORT} = process.env;


const server = httpServer.listen(PORT, async () => {
    await fs.mkdir('tmp',{recursive:true});
    console.log(`Server is running on port:${PORT}`)
});

process.on('unhandledRejection',(error, _) => {
  if(error) {
      console.log(`Error: ${error.message}`)
      server.close(() => process.exit(1))
  }
})

