export default class Service {
  constructor (model) {
    this.model = model
  }

  get (query) {
    return this.model.find(query)
  }

  getOne (query) {
    return this.model.findOne(query)
  }

  getById (id) {
    return this.model.findById(id)
  }

  UpdateById (id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true })
  }

  create (data) {
    return this.model.create(data)
  }

  deleteById (id) {
    return this.model.findByIdAndDelete(id)
  }

  softDeleteById (id) {
    return this.model.findByIdAndUpdate(id, { isActive: true }, { new: true })
  }

  restoreById (id) {
    return this.model.findByIdAndUpdate(id, { isActive: false }, { new: true })
  }
}
