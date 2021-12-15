import mongoose from "mongoose"
import { Schema, model, Document, Types } from "mongoose"
import { expect } from "chai"
import { ParentModel, ChildModel, Child, Parent } from "../src/models/populate.schema"
import {
    deleteAllParent,
    deleteAllChild,
    createParent,
    createChild,
    findParentAndChild,
} from "../src/services/populate,service"

before(async () => {
    const uri = "mongodb://localhost:27017/test"
    mongoose.connect(uri)
    mongoose.connection.on("error", console.error.bind(console, "mongoDB连接异常"))
})
after(async () => {
    mongoose.disconnect()
})

describe("测试聚合查询 populate ", function () {
    this.afterAll(async () => {
        await deleteAllChild()
        await deleteAllParent()
    })
    this.afterEach(async () => {
        await deleteAllChild()
        await deleteAllParent()
    })

    const childA: Child = {
        name: "childA",
    }
    const childB = new ChildModel({
        name: "childB",
    })
    const parentA: Parent = {
        // child: new Types.ObjectId(),
        name: "parentA",
    }
    const parentB = new ParentModel({
        // child: new Types.ObjectId(),
        name: "parentB",
    })

    describe("聚合查询的 createChild() 方法", function () {
        describe("对象创建", function () {
            let childA: Child
            this.beforeAll(async () => {
                // MongoServerError: E11000 duplicate key error collection: test.users index: email_1 dup key: { email: null }
                childA = await createChild(childA)
            })
            it("传入对象, 会生成一个 Child 实例", async () => {
                expect(childA.name).to.be.equal(childA.name)
            })

            it("传入对象, 生成 Parent 的实例, parent.child 会与 childId 相等", async () => {
                // 获取 child 的 _id
                parentA.child = childA._id
                const parent = await createParent(parentA)
                expect(parent.child).to.be.equal(childA._id)
            })
        })
        
        describe("实例创建", function () {
            let childB: Child
            this.beforeAll(async () => {
                childB = await createChild(childB)
            })
            it("传入实例, 会生成一个 Child 实例", async () => {
                expect(childB.name).to.be.equal(childB.name)
            })
            it("传入实例, 生成 Parent 的实例, parent.child 会与 childId 相等", async () => {
                // 获取 child 的 _id
                parentB.child = childB._id
                const parent = await createParent(parentB)
                expect(parent.child).to.be.equal(childB._id)
            })
        })
    })
})
