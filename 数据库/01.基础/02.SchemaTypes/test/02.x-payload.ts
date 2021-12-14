import { XModel } from '../src/models/schema'

const xPayload = new XModel({
    name: "迪丽",
    binary: Buffer.alloc(12)
})

export { xPayload }