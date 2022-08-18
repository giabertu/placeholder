import mongoose from 'mongoose'

export async function connectMongoose() {
  if (process.env.MONGODB_URI !== undefined) {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('Mongoose connection successful 🟢')
    } catch (error) {
      console.log('Mongoose connection failed 🔴')
    }
  }
}
//beginnerForm
//nonBeginnerForm
//userInfo


export default mongoose;
