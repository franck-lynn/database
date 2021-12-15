import { xxxPayload,  xxxObject} from './02.x-payload'
import { expect } from "chai"
import { Schema, model, Types } from "mongoose"
import {IXxx, XxxModel } from '../src/models/schema'
import { Decimal } from "decimal.js"


describe("测试 schema.ts 文件里定义的各种属性 ", function(){
    
    describe("获取各种属性 ", function (){
        it("01. name 属性", async() => {
            expect(xxxPayload).to.be.instanceOf(XxxModel)
            expect(xxxPayload.name).to.be.equal("迪丽")
            expect(xxxPayload.binary.toString()).to.be.equal("runoob")
            expect(xxxPayload.integerOnly).to.be.equal(12)
            
            expect(xxxPayload.nested.stuff).to.be.equal('STUFF')
            expect(xxxPayload.decimal).to.be.instanceOf(Types.Decimal128)
        })
    })
    
    
    
})

