import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { EnterpriseProvider } from '@/context/EnterpriseContext';
import { GlobalStyles } from '@/styles/global';
import { defaultTheme } from '@/styles/theme/default';

import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<EnterpriseProvider>
			<ThemeProvider theme={defaultTheme}>
				<ToastContainer />
				<GlobalStyles />
				<div className={inter.className}>
					<Component {...pageProps} />
				</div>
			</ThemeProvider>
		</EnterpriseProvider>
	);
}
