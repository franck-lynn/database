import { XModel, IX } from '../src/models/schema'

const xPayload = new XModel({
    name: "迪丽", 
    binary: Buffer.from('runoob', 'ascii'),
    living: true,
    update: new Date(),
    age: 12,
    integerOnly: 12.02,
    _someId: "asssa",
    decimal: "q1121",
    arr: ["a", "b"],
    ofString: ["c", "d"],
    ofNumber: [1, 2, 3], 
    ofMixed: [],
    ofObjectId: [],
    ofArray: [['A'], ["B", "C"]],
    nested: {
        stuff: "stuff"
    }
    
})

export { xPayload }