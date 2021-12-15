import mongoose from "mongoose"
import { createUser, findUser, loginUser, deleteAllUser } from "src/services/user.service"
import { IUser } from "../src/models/user.model"
import { expect } from "chai"

before(async () => {
    const uri = "mongodb://localhost:27017/test"
    mongoose.connect(uri)
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
})

describe("测试 user.service ", function () {
    this.afterAll(async () => {
        await deleteAllUser()
    })
    this.afterEach(async () => {
        await deleteAllUser()
    })
    
    const userPayload: IUser = {
        firstname: "Jane",
        lastname: "Doe",
        password: "aPassword123",
        email: "Jane@example.com",
    }
    describe("测试 CreateUser", () => {
        describe("给出一个输入", () => {
            it("会产生一个用户", async () => {
                const user = await createUser(userPayload)
                expect(user.password).to.be.length(60)
                expect(user.firstname).to.be.equal(userPayload.firstname)
                expect(user.lastname).to.be.equal(userPayload.lastname)
                expect(user.email).to.be.equal(userPayload.email)
            })
        })
    })
    describe("用户登录", () => {
        describe("给出一个正确的密码", () => {
            it("会返回 true", async() => {
                const user = await createUser(userPayload)
                const isValid = await loginUser({
                    email: user.email,
                    password: userPayload.password
                })
                
                expect(isValid).to.be.true
            })
        })
    })
    
    describe("用户登录", () => {
        describe("给出一个错误的密码", () => {
            it("会返回 false", async() => {
                const user = await createUser(userPayload)
                const isValid = await loginUser({
                    email: user.email,
                    password: "wrong"
                })
                
                expect(isValid).to.be.false
            })
        })
    })
    
    describe("虚拟属性", () => {
        it("会返回全名", async () => {
            await createUser(userPayload)
            const user = await findUser({
                email: userPayload.email,
            }, {
                lean: false
            })
            
            expect(user?.fullname).to.be.equal(`${userPayload.firstname}${userPayload.lastname}`)
        })
    })
    
    
    
})



after(async () => {
    mongoose.disconnect()
})
