'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Item } from '../utils/api';

// Fetch all items
export function useItems() {
    return useQuery<Item[], Error>({
        queryKey: ['items'],
        queryFn: api.getItems,
    });
}

// Create new item
export function useCreateItem() {
    const queryClient = useQueryClient();

    const mutation = useMutation<Item, Error, { name: string; description: string }>({
        mutationFn: (payload) => api.createItem(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });

    return {
        createItem: mutation.mutate,
        isCreating: mutation.isPending,
        createError: mutation.error,
    };
}

// Update existing item
export function useUpdateItem() {
    const queryClient = useQueryClient();

    type UpdateVariables = { id: string; payload: Partial<Item> };

    const mutation = useMutation<Item, Error, UpdateVariables>({
        mutationFn: ({ id, payload }) => api.updateItem(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });

    return {
        updateItem: mutation.mutate,
        isUpdating: mutation.isPending,
        updateError: mutation.error,
    };
}

// Delete item
export function useDeleteItem() {
    const queryClient = useQueryClient();

    const mutation = useMutation<Item, Error, string>({
        mutationFn: (id) => api.deleteItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });

    return {
        deleteItem: mutation.mutate,
        isDeleting: mutation.isPending,
        deleteError: mutation.error,
    };
}