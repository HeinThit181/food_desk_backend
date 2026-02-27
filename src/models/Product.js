import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    costToMake: { type: Number, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isSoldOut: { type: Boolean, default: false },
    imageUrl: { type: String },
    madeWith: { type: [String] },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
