export type Item = { id: string; name: string; description: string };

// fetch-with-timeout helper
export async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = 5000
): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        return res;
    } finally {
        clearTimeout(id);
    }
}

export const api = {
    getItems: async (): Promise<Item[]> => {
        const res = await fetchWithTimeout('/api/items', { method: 'GET' }, 5000);
        if (!res.ok) throw new Error('Error fetching items');
        const data = await res.json();
        return data.items;
    },
    getItem: async (id: string): Promise<Item> => {
        const res = await fetchWithTimeout(`/api/item/${id}`, { method: 'GET' }, 5000);
        if (!res.ok) throw new Error('Error fetching item');
        return res.json();
    },
    createItem: async (payload: { name: string; description: string }): Promise<Item> => {
        const res = await fetchWithTimeout(
            '/api/items',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            },
            5000
        );
        if (!res.ok) throw new Error('Error creating item');
        return res.json();
    },
    updateItem: async (id: string, payload: Partial<Item>): Promise<Item> => {
        const res = await fetchWithTimeout(
            `/api/item/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            },
            5000
        );
        if (!res.ok) throw new Error('Error updating item');
        return res.json();
    },
    deleteItem: async (id: string): Promise<Item> => {
        const res = await fetchWithTimeout(`/api/item/${id}`, { method: 'DELETE' }, 5000);
        if (!res.ok) throw new Error('Error deleting item');
        return res.json();
    },
};