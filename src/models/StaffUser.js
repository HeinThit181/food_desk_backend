import mongoose from 'mongoose';

const StaffUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'staff' }, 
}, { timestamps: true });

export default mongoose.models.StaffUser || mongoose.model('StaffUser', StaffUserSchema);
