import { MongoClient } from "mongodb"
import mongoose from "./models/mongoose";
import { connectMongoose } from "./models/mongoose";

connectMongoose()
const uri = process.env.MONGODB_URI;
let clientPromise: Promise<MongoClient>

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local")
} else {
  const client = new MongoClient(uri)
  clientPromise = client.connect();
}
export default clientPromise

// // const users = mongoose.connection.db.collection('users')


// var User = mongoose.model("User", new mongoose.Schema({ profile: {name: String, email: String, height: String, length: String, interests: String}, name: String, email:  String, avatar: String}), "users")

// async function example() {
//   const user = await User.findOne({name: 'giabertu'})
//   console.log('Here is the user: ', user)

//   const newUser = new User({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await newUser.save();
  
//   const profile = {
//     name: 'gianni',
//     email: 'hello@gmail.com',
//     height: '5 feet',
//     length: 'box',
//     interests: 'littering'
//   }
//   await User.findOneAndUpdate({name: 'giabertu'}, {profile: profile} )

// }
// example()
