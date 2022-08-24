
import mongoose from 'mongoose'

let model;
try {
  model = mongoose.model('Account')
} catch (error) {
  model = mongoose.model('Account', new mongoose.Schema({}), "accounts")
}

export const Account = model;



