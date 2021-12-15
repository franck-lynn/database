import {expect} from 'chai'

import { createXxxA, deleteAllXxx } from '../src/services/services'

import { xxxPayload, xxxObject} from './02.x-payload'

describe("测试 services.ts 文件", function (){
    this.afterAll(async () => {
        await deleteAllXxx()
    })
    this.afterEach(async () => {
        await deleteAllXxx()
    })
    
    
    describe("测试该文件的 createXxxA() 方法", function (){
        it("xxxPayload 将会生成一个文档",async () => {
            const xxx = await createXxxA(xxxPayload)
            expect(xxx.name).to.be.equal(xxxPayload.name)
        })
        it("xxxObject 也将会生成一个文档",async () => {
            const xxx = await createXxxA(xxxObject)
            expect(xxx.name).to.be.equal(xxxObject.name)
        })
    })
})

