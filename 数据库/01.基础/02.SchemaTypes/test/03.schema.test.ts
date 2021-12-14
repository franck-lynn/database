import { xPayload } from './02.x-payload'
import { expect } from "chai"

describe("测试 schema.ts 文件里定义的各种属性 ", function(){
    
    describe("获取各种属性 ", function (){
        it("01. name 属性", async() => {
            expect(typeof xPayload).to.be.equal('object')
            expect(xPayload.name).to.be.equal("迪丽")
            expect(xPayload.binary.toString()).to.be.equal("runoob")
            expect(xPayload.update).to.be.equal(new Date())
        })
    })
})

