import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema ({
  departs: {type: Date, default: function() {
    return new Date(Date.now() + 365*24*60*60*1000)
  }},
  airline: {type: String, enum: ['American', 'Southwest', 'United']},
  airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN'},
  flightNo: {type: Number, required: true, min: 10, max: 9999}
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}