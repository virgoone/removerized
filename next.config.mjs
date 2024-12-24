/**
 * @type {import('next').Config}
 */

import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"
import withSerwistInit from "@serwist/next"

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform()
}

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
})

export default withSerwist({
  reactStrictMode: true,
  serverRuntimeConfig: {
    runtime: "edge",
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    // See https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    }
    return config
  },
})
