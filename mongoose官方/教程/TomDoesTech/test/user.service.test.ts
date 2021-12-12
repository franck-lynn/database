import mongoose from  "mongoose"
import { createUser } from 'src/services/user.service'
import User from '../src/models/user.model'
import { expect } from "chai"


before(async () => {
    const uri = "mongodb://localhost:27017/test"
    
    mongoose.connect(uri, () => console.log("数据库连接成功"))
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
})

describe("测试 user.service.ts 这个文件", function(){
    it("01. 测试 createUser() 方法", async() => {
        const aUser = new User({
            firstname: "李", 
            lastname: "红",
            email: "lihong@163.com",
            password: "123abc"
        })
        const user = await createUser(aUser)
        expect(user.fullname).to.be.equal('李红')
    })
   
})



after(async () => {
    mongoose.disconnect()
})

