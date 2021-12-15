import {expect} from 'chai'

import { createXxx,  deleteAllXxx, findXxx } from '../src/services/services'

import { xxxPayload, xxxObject} from './02.x-payload'

describe("测试 services.ts 文件", function (){
    this.afterAll(async () => {
        await deleteAllXxx()
    })
    // this.afterEach(async () => {
    //     await deleteAllXxx()
    // })
    
    
    describe("测试该文件的 createXxxA() 方法", function (){
        it("xxxPayload 将会生成一个文档",async () => {
            const xxx = await createXxx(xxxPayload)
            expect(xxx!.name).to.be.equal(xxxPayload.name)
        })
        // 下面测试也是可以的
        // it("xxxObject 也将会生成一个文档",async () => {
        //     const xxx = await createXxx(xxxObject)
        //     expect(xxx!.name).to.be.equal(xxxObject.name)
        // })
    })
    
    describe("测试 findXxx() 方法", function (){
        it("会返回一个文档",async () => {
            const  xxx = await findXxx({ name: xxxPayload.name }, { lean: false })
            
            expect(xxx!.name).to.be.equal(xxxPayload.name)
        })
    })
    
    
    
})

