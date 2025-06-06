'use client';

import React, { useState } from 'react';
import { Item } from '../utils/api';
import { useUpdateItem, useDeleteItem } from '../hooks/useItems';

interface Props {
    item: Item;
}

const ItemComponent: React.FC<Props> = ({ item }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);

    const { updateItem, isUpdating, updateError } = useUpdateItem();
    const { deleteItem, isDeleting, deleteError } = useDeleteItem();

    const handleUpdate = () => {
        updateItem(
            { id: item.id, payload: { name, description } },
            { onSuccess: () => setIsEditing(false) }
        );
    };

    const handleDelete = () => {
        deleteItem(item.id);
    };

    return (
        <div className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            {isEditing ? (
                <div className="flex-1 space-y-2">
                    <input
                        className="border rounded p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        className="border rounded p-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex space-x-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={handleUpdate}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Saving…' : 'Save'}
                        </button>
                        <button
                            className="bg-gray-300 text-black px-3 py-1 rounded"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                    {updateError && (
                        <p className="text-red-500">
                            Error: {(updateError as Error).message}
                        </p>
                    )}
                </div>
            ) : (
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-700">{item.description}</p>
                </div>
            )}

            {!isEditing && (
                <div className="flex flex-col space-y-2 mt-4 md:mt-0 md:ml-4">
                    <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting…' : 'Delete'}
                    </button>
                    {deleteError && (
                        <p className="text-red-500">
                            Error: {(deleteError as Error).message}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ItemComponent;