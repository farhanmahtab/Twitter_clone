import mongoose,{models} from 'mongoose'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ProfilePicture: {
    type: String
  },
  CoverPhoto: {
    type: String
  },
  bio: {
    type: String
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})
const Users = models.User|| mongoose.model('User', userSchema)
export default Users