import mongoose from "mongoose"
import { Schema, model, Document, Types } from "mongoose"
import { expect } from "chai"
import { ParentModel, ChildModel, Child, Parent } from "../src/models/populate.schema"
import { deleteAllParent, deleteAllChild, createParent, createChild, findParentAndChild } from "../src/services/populate,service"

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
        name: "child",
    }
    const childB = new ChildModel({
        name: "child",
    })
    const parentA: Parent = {
        // child: new Types.ObjectId(),
        name: "parent",
    }
    const parentB = new ParentModel({
        // child: new Types.ObjectId(),
        name: "parent",
    })

    describe("聚合查询的 createChild() 方法", function () {
        let child: Child
        
        this.beforeAll(async () => {
            child = await createChild(childA)
        })
        it("会生成一个 Child 实例", async () => {
            expect(child.name).to.be.equal(childA.name)
        })

        it("生成 Parent 的实例, parent.child 会与 childId 相等", async () => {
            // 获取 child 的 _id
            parentA.child  = child._id
            const parent = await createParent(parentA)
            expect(parent.child).to.be.equal(child._id)
        })
    })
})
