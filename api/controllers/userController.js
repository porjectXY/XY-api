import User from '../models/User.js'
import Service from '../services/Service.js'

const serviceUser = new Service(User)

const getUser = async (req, res) => {
  try {
    const users = await serviceUser.get().select('-password')
    if (!users) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(200).json({ msg: 'user:', users })
  } catch (error) {
    res.status(500).json({
      msg: 'user not found',
      Error: error.message
    })
  }
}

export {
  getUser
}
