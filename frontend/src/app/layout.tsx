import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeRegistry from '@/providers/mui/ThemeRegistry'
import ReactQuery from "@/providers/ReactQuery";
const inter = Inter({ subsets: ['latin'] })
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AppGuardProvider} from "@/providers/AppGuard";

export const metadata: Metadata = {
  title: 'WorkNomads',
  description: 'WorkNomads is a global',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQuery>
            <ToastContainer />
            <ThemeRegistry>
                <AppGuardProvider>
                    {children}
                </AppGuardProvider>
            </ThemeRegistry>
        </ReactQuery>
      </body>
    </html>
  )
}
