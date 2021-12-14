import { xPayload } from './02.x-payload'


// console.log(
//     typeof xPayload,
// )

console.log(
    // xPayload.name,
    // xPayload.binary.toString(),
    xPayload.decimal, "\n",
    xPayload.nested.stuff, "\n",
    xPayload.ofString, "\n",
    xPayload._someId, "\n",
    xPayload.ofObjectId
)