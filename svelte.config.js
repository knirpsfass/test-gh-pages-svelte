import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const dev = process.argv.includes("dev");

const rawRepo = process.env.REPO_NAME ?? "";
const rawSuffix = process.env.BASE_SUFFIX ?? "";

function joinBase(...parts) {
  const cleaned = parts
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => p.replace(/^\/+|\/+$/g, ""));

  if (cleaned.length === 0) return "";

  return "/" + cleaned.join("/");
}

const base = dev ? "" : joinBase(rawRepo, rawSuffix);

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: "404.html",
      pages: "build",
      assets: "build",
    }),
    paths: {
      base,
    },
  },
};

export default config;
