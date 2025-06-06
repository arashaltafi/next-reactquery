'use client';

import React, { useState } from 'react';
import { useCreateItem } from '../hooks/useItems';

const ItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const { createItem, isCreating, createError } = useCreateItem();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        createItem(
            { name, description },
            {
                onSuccess: () => {
                    setName('');
                    setDescription('');
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
                className="border rounded p-2 w-full"
                placeholder="Item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                className="border rounded p-2 w-full"
                placeholder="Item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={isCreating}
            >
                {isCreating ? 'Adding...' : 'Add Item'}
            </button>

            {createError && (
                <p className="text-red-500">
                    Error: {(createError as Error).message}
                </p>
            )}
        </form>
    );
};

export default ItemForm;