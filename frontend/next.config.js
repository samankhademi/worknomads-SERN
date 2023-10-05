/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_API_BASE_URL}/v1/:path*`
            }
        ]
    },

}

module.exports = nextConfig
