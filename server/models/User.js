const mongoose = require('mongoose')
const pick = require('lodash/pick')
var uuid = require('uuid');
const { Schema } = mongoose

const mongoSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  points: Number,
  avatarUrl: String,
  active: Boolean
})

class UserClass {
  static publicFields() {
    return [
      'userId',
      'name',
      'points',
      'avatarUrl',
      'slug',
      'active'
    ]
  }

  static async list({ offset = 0, limit = 100 } = {}) {
    const users = await this.find({})
      .sort({ points: 1 })
      .skip(offset)
      .limit(limit)
    return { users }
  }

  static search(query) {
    return this.find(
      {
        $or: [
          { name: { $regex: query, $options: 'i' } }
        ],
      },
      UserClass.publicFields().join(' ')
    )
  }

  static generateSlug() {
    return uuid.v1()
  }

  static async addModifyUser({ userId, name, avatarUrl }) {
    const user = await this.findOne({ userId }).select(UserClass.publicFields().join(' '))

    // if user exists then modify
    if (user) {
      await this.updateOne({ userId }, { name, avatarUrl });

      return user
    }

    const slug = uuid.v1()

    const newUser = await this.create({
      name,
      avatarUrl,
      slug,
      active
    })

    return pick(newUser, UserClass.publicFields())
  }

}

mongoSchema.loadClass(UserClass)

const User = mongoose.model('User', mongoSchema)

module.exports = User
