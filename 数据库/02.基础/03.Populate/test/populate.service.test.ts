import mongoose, { Schema, model, Document, Types }  from "mongoose"
import { ObjectId } from 'mongodb'
import { expect } from "chai"
import { ParentModel, ChildModel, Child, Parent } from "../src/models/populate.schema"

import {
    deleteAllParent,
    deleteAllChild,
    createParent,
    createChild,
    findParentAndChild,
    findChildById,
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


    const childA: Child = {
        // _id:  new ObjectId,
        name: "childA",
    }
    const childB = new ChildModel({
        // _id: new Types.ObjectId,
        name: "childB",
    })
    const parentA: Parent = {
        // child: new Types.ObjectId,
        name: "parentA",
    }
    const parentB = new ParentModel({
        // child: new Types.ObjectId(),
        name: "parentB",
    })

    describe("聚合查询的 createChild() 方法", function () {
        describe("对象创建", function () {
            let childAA: Child
            let childBB: Child
            this.beforeAll(async () => {
                //! MongoServerError: E11000 duplicate key error collection: test.users index: email_1 dup key: { email: null }
                //! 出现这个错误是之前表设置了name唯一, 删除表重建一下就好了
                childAA = await createChild(childA)
                childBB = await createChild(childB)
            })
            it("传入对象, 会生成一个 Child 实例", async () => {
                expect(childAA.name).to.be.equal(childA.name)
            })
            it("传入实例, 会生成一个 Child 实例", async () => {
                expect(childBB.name).to.be.equal(childB.name)
            })

            it("传入对象, 生成 Parent 的实例, parent.child 会与 childId 相等", async () => {
                //! childAA 是生成数据库是的文档对象, 获取 childAA 的 _id
                parentA.child = childAA._id
                //! 生成一个 parent 文档
                const parent = await createParent(parentA)
                expect(parent.child).to.be.equal(childAA._id)
            })
            
            it("传入实例, 生成 Parent 的实例, parent.child 会与 childId 相等", async () => {
                parentB.child = childBB._id
                const parent = await createParent(parentB)
                expect(parent.child).to.be.equal(childBB._id)
            })
        })
        
        describe("根据Parent 查询 child", function (){
            it("将会返回聚合查询的结果", async () => {
                const doc = await findParentAndChild(parentA.name!)
                expect(doc.name).to.be.equal(parentA.name)
                const childId =  (doc.child as Child)._id as Schema.Types.ObjectId
                const child = await findChildById(childId)
                expect((doc.child as Child)._id).to.be.deep.equal(child!._id)
            })
        })
        
        
    })
})
