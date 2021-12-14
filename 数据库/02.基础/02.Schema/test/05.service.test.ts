import {createX, deleteAllX} from '../src/services/service'
import {xPayload} from './02.x-payload'
import { expect } from 'chai'
import {IX, XModel} from '../src/models/schema'

describe('测试 schema 文件里的方法', function (){
    this.afterAll(async () => {
        await deleteAllX()
    })
    this.afterEach(async () => {
        await deleteAllX()
    })
    
    describe("01. 测试 CreateX()方法", function (){
        it("01-01. 用 xModel 对象创建一个文档", async() => {
            const x: IX = await createX(xPayload)
            
            expect(x.name).to.be.equal(xPayload.name)
        })
    })
})



