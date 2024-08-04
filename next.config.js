/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
  module.exports = async (phase) => {
    /** @type {import("next").NextConfig} */
  
  // Your current or future configuration 
  
    const nextConfig = {
  
    };
  
      const withSerwist = (await import("@serwist/next")).default({
        swSrc: "src/service-worker/app-worker.ts",
        swDest: "public/sw.js",
        reloadOnOnline: true,
      });
      return withSerwist(nextConfig);
  };