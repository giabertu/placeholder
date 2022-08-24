import mongoose from 'mongoose'

let model;
try {
  model = mongoose.model('Session')
} catch (error) {
  model = mongoose.model('Session', new mongoose.Schema({}), "sessions")
}

export const Session = model;



