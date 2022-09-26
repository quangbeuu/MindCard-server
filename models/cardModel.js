const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, "A card must have a word."],
  },
  meanings: [
    {
      partOfSpeech: {
        type: String,
        default: "N",
        enum: {
          values: ["N", "V", "Adj", "Adv"],
          message: "Part of Speech is either: N, V, Adj, Adv",
        },
        required: [true, "A card must have partOfSpeech."],
      },
      definition: {
        type: String,
        required: [true, "A card must have definition."],
      },
      example: String,
      synonyms: [String],
      antonyms: [String],
    },
  ],
  images: String,
  pronounce: String,
  createdAt: { type: Date, default: Date.now() },
  createdBy: String,
  slug: String,
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
