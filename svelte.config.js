import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const dev = process.argv.includes("dev");
const repo = process.env.REPO_NAME ?? "";
const baseSuffix = process.env.BASE_SUFFIX ?? "";

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: "404.html",
      pages: "build",
      assets: "build",
    }),
    paths: {
      base: dev ? "" : `/${repo}${baseSuffix}`,
    },
  },
};

export default config;
