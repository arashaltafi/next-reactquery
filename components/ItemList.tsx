'use client';

import React from 'react';
import { useDeleteItem, useItems } from '../hooks/useItems';
import ItemComponent from './Item';

export const ItemList: React.FC = () => {
    const { data: items, error, isLoading } = useItems();
    const { deleteItem, isDeleting, deleteError } = useDeleteItem();

    if (isLoading) return <p className="text-blue-500">Loading items...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="space-y-4">
            {items && items.length > 0 ? (
                items.map((item) => (
                    <ItemComponent
                        key={item.id}
                        item={item}
                        onDelete={() => deleteItem(item.id)}
                    />
                ))
            ) : (
                <p className="text-gray-500">No items found.</p>
            )}

            {deleteError && (
                <p className="text-red-500">Delete error: {deleteError.message}</p>
            )}
        </div>
    );
};
