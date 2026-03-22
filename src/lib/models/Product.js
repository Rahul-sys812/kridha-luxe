import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  comparePrice: { type: Number, default: 0 },
  image: { type: String, required: true },
  image2: { type: String, default: '' },
  images: [{ type: String }],
  category: { type: String, required: true },
  description: { type: String, default: '' },
  sku: { type: String, default: '' },
  stock: { type: Number, default: 100 },
  isNew: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  weight: { type: Number, default: 0.1 }, // kg for shipping
  legacyId: { type: String }, // original id from JSON data
}, { timestamps: true, suppressReservedKeysWarning: true });

ProductSchema.index({ category: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
