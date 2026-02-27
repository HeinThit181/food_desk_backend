import mongoose from 'mongoose';

const DeliveryZoneSchema = new mongoose.Schema({
    zoneName: { type: String, required: true },
    areaKeywords: [{ type: String }],
    fee: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.DeliveryZone || mongoose.model('DeliveryZone', DeliveryZoneSchema);
