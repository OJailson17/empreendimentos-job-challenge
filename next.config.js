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
};

module.exports = nextConfig;
