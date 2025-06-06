import { NextRequest, NextResponse } from 'next/server';
import { items, Item } from '@/utils/store';

const generateId = () => Math.random().toString(36).substring(2, 9);

export async function GET(req: NextRequest) {
    return NextResponse.json({ items }, { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newItem: Item = {
            id: generateId(),
            name: body.name || 'Untitled',
            description: body.description || '',
        };
        items.push(newItem);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }
}