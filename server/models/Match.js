
const mongoose = require('mongoose')
const pick = require('lodash/pick')
const generateSlug = require('../utils/slugify')

const { Schema } = mongoose

const mongoSchema = new Schema({
  teamHome: {
    player1: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    player2: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    score: Number
  },
  teamAway: {
    player1: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    player2: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    score: Number
  },
  badges: [],
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  }
})

class MatchClass {
  static async list({ offset = 0, limit = 10 } = {}) {
    const matches = await this.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    return { matches };
  }

  static async addMatch({
    teamHome, teamAway, badges = []
  }) {
    if (!teamHome) {
      throw new Error('Data for the Home Team is required')
    }
    if (!teamHome.player1) {
      throw new Error('Player 1 for Home Team is required')
    }
    if (!teamHome.player2) {
      throw new Error('Player 2 for Home Team is required')
    }
    if (!teamAway) {
      throw new Error('Data for the Away Team is required')
    }
    if (!teamAway.player1) {
      throw new Error('Player 1 for Away Team is required')
    }
    if (!teamAway.player1) {
      throw new Error('Player 2 for Away Team is required')
    }
    if (!teamHome.score || !teamAway.score) {
      throw new Error('Add the score for the match')
    }
    if (!(teamHome.score + teamAway.score) > 5 || Math.abs(teamHome.score - teamAway.score) < 2) {
      throw new Error('Add valid score for the match')
    }

    const slug = await generateSlug(this, name)

    const newMatch = await this.create({
      teamHome,
      teamAway,
      badges,
      slug
    })
  }

}

mongoSchema.loadClass(MatchClass)

const Match = mongoose.model('Match', mongoSchema)

module.exports = Match
