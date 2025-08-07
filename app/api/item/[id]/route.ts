import { NextRequest, NextResponse } from 'next/server';
import { items } from '@/utils/store';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const found = items.find((item) => item.id === id);
    if (!found) {
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(found, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await req.json();
        const index = items.findIndex((item) => item.id === id);
        if (index === -1) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }
        items[index] = { ...items[index], ...body };
        return NextResponse.json(items[index], { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    const deleted = items.splice(index, 1)[0];
    return NextResponse.json(deleted, { status: 200 });
}