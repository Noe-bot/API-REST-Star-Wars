const peopleSchema = new mongoose.Schema({
    name: String,
    height: String,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_year: String,
    gender: String,
    homeworld: String,
    films: [String],
    species: [String],
    vehicles: [String],
    starships: [String],
    created: {
      type: Date,
      default: Date.now
    },
    edited: {
      type: Date,
      default: Date.now
    },
  });
  
  const People = mongoose.model('People', peopleSchema);
  
  module.exports = People;