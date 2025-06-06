'use client';

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 2,
            retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 3000),
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
        mutations: {
            retry: 1,
            retryDelay: 1000,
        },
    },
});