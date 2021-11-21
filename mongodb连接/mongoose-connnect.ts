import mongoose = require('mongoose')
import { ConnectOptions, Schema, model } from 'mongoose'

const url = 'mongodb://localhost:27017/test?replicaSet=my_repl'

// const MONGOOSE_OPTIONS: ConnectOptions = {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useFindAndModify: false,
//     useCreateIndex: true,

// }
// const mongoose = new Mongoose()

mongoose.connect(url, /*  MONGOOSE_OPTIONS,  */() => console.log('数据库连接成功!'))
mongoose.connection.on('error', console.error.bind(console, 'mongoDB连接异常'))

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'pending' },
    meta: {
        createdAt: { type: Date, default: Date.now() },
        updateAt: { type: Date, default: Date.now() }
    },
    avatar: { type: String }
})

const User = model('User', userSchema);


(async () => {
    const user = await User.find()
    console.log("user", user)
    mongoose.disconnect()
})()




