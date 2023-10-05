"use client";

import React from "react";
import { QueryClientProvider, QueryClient,  } from "@tanstack/react-query";

export function ReactQuery({ children }: React.PropsWithChildren) {
    const [client] = React.useState(new QueryClient({
        defaultOptions: {
            queries: {
                cacheTime: 1,
                refetchOnWindowFocus: false,
                retry: 0
            }
        }
    }));

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQuery;