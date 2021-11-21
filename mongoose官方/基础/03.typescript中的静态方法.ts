// https://mongoosejs.com/docs/typescript/statics.html
// typescript中的静态方法
import { model, Model, Schema } from 'mongoose';

interface IMovie  {
    name: string
}
interface MovieModel extends Model<IMovie>{
    myStaticMethod(): number
}

const movieSchema = new Schema<IMovie, MovieModel>({name: String})

movieSchema.static('myStaticMethod', function myStaticMethod() {
    return 42
})

const Movie = model<IMovie, MovieModel>('Movie', movieSchema)

const answer: number = Movie.myStaticMethod()
console.log(answer)

