import { model, Model, Schema } from 'mongoose';


interface IActor {
    name: string
}
interface IActorModel extends Model<IActor>{
    myStaticMethod(): number
}

// 定义 schema
const actorSchema = new Schema<IActor, IActorModel>({
    name: String
})
// 定义类
const Actor = model<IActor, IActorModel>('Actor', actorSchema)

// 静态方法
Actor.myStaticMethod = () => 42
const answer: number = Actor.myStaticMethod()

console.log(answer)