import React from 'react';
import { GlobalStyles } from '@/styles/global';
import { defaultTheme } from '@/styles/theme/default';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<div className={inter.className}>
				<Component {...pageProps} />
			</div>
		</ThemeProvider>
	);
}
