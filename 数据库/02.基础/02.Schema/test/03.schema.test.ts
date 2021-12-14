import { xPayload } from './02.x-payload'
import { expect } from "chai"
import mongoose from 'mongoose'
import { XModel, IX  } from '../src/models/schema'

describe("测试 schema.ts 文件里定义的各种属性 ", function(){
    
    describe("获取各种属性 ", function (){
        it("01. name 属性", async() => {
            expect(xPayload).to.be.an.instanceOf(XModel)
            expect(xPayload.name).to.be.equal("迪丽")
            expect(xPayload.binary.toString()).to.be.equal("runoob")
            expect(xPayload.update).to.be.an.instanceOf(Date)
            expect(xPayload.integerOnly).to.be.equal(12)
            expect(xPayload.decimal).to.be.an.instanceOf(mongoose.Types.Decimal128)
            expect(xPayload.ofObjectId).to.be.an.instanceOf(mongoose.Types.ObjectId)
            expect(xPayload.nested.stuff).to.be.equal('STUFF')
            
        })
    })
    
    
    
})

