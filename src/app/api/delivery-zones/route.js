import dbConnect from '@/lib/db';
import DeliveryZone from '@/models/DeliveryZone';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await dbConnect();
    try {
        const zones = await DeliveryZone.find({});
        return NextResponse.json(zones);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const zone = await DeliveryZone.create(body);
        return NextResponse.json(zone, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
