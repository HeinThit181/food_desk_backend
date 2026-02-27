import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    qty: { type: Number, required: true },
    unitPrice: { type: Number, required: true }, 
});

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String },
    deliveryAddress: { type: String, required: true },
    orderNote: { type: String },
    scheduledDateTime: { type: Date }, // NEW

    items: [OrderItemSchema],

    subtotal: { type: Number, required: true },
    bulkDiscount: { type: Number, default: 0 }, // NEW
    deliveryFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    paymentStatus: {
        type: String,
        enum: ['PENDING', 'PAID', 'REFUNDED'],
        default: 'PENDING'
    }, // NEW

    status: {
        type: String,
        enum: ['CONFIRMED', 'COOKING', 'READY', 'COMPLETED', 'CANCELLED'],
        default: 'CONFIRMED'
    },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
