/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	compiler: {
		styledComponents: {
			ssr: true,
			minify: true,
			displayName: true,
		},
	},
	pageExtensions: ['page.tsx', 'page.ts', 'tsx', 'jsx', 'js'],
};

module.exports = nextConfig;
