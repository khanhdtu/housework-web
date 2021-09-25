/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    SHOW_REACT_QUERY_DEV_TOOLS: process.env.SHOW_REACT_QUERY_DEV_TOOLS,
  }
}
