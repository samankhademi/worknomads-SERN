import React from "react";
import type { AppProps } from 'next/app'
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {EmotionCache} from "@emotion/react";

interface PropsType extends AppProps {
    pageProps: any,
    emotionCache?: EmotionCache;
}


export default function MyApp({ Component, pageProps }: PropsType) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    )
}