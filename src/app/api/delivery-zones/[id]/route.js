import dbConnect from '@/lib/db';
import DeliveryZone from '@/models/DeliveryZone';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const zone = await DeliveryZone.findById(id);
        if (!zone) {
            return NextResponse.json({ error: 'DeliveryZone not found' }, { status: 404 });
        }
        return NextResponse.json(zone);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const body = await request.json();
        const zone = await DeliveryZone.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!zone) {
            return NextResponse.json({ error: 'DeliveryZone not found' }, { status: 404 });
        }
        return NextResponse.json(zone);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    try {
        const { id } = await params;
        const zone = await DeliveryZone.findByIdAndDelete(id);
        if (!zone) {
            return NextResponse.json({ error: 'DeliveryZone not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'DeliveryZone deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
