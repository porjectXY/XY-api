import User from '../models/User.js'
import Service from '../services/Service.js'

const serviceUser = new Service(User)

const getProfile = async (req, res) => {
  try {
    const user = await serviceUser.getById(req.params.userId).select('-password')
    if (!user) {
      return res.json(404).json({
        msg: 'User not found'
      })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      msg: 'Error Servidor',
      error: error.message
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { bio, avatar } = req.body
    const user = await serviceUser.updateById(req.user._id, { bio, avatar })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      erro: error.message
    })
  }
}

export {
  getProfile,
  updateProfile
}
