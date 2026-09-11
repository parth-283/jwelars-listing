const mongoose = require('mongoose');

const jewelrySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: () => `JWL-${Date.now()}`
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  description: String,
  category: {
    type: String,
    enum: ['ring', 'necklace', 'bracelet', 'earring', 'pendant'],
    index: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  material: {
    type: String,
    enum: ['gold', 'silver', 'platinum', 'bronze'],
    index: true
  },
  images: [{
    angle: { type: String, enum: ['front', 'side', 'back', 'top', 'detail'] },
    url: String,
    publicId: String
  }],
  specifications: {
    weight: String,
    dimensions: String,
    gemstone: String,
    certificate: String
  },
  availability: { type: Boolean, default: true },
  inStock: { type: Number, default: 1 },
  tags: [String],
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: Date
}, { timestamps: true });

// Text Index for search
jewelrySchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Jewelry', jewelrySchema);
