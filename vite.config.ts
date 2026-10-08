import { defineConfig, type Plugin } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";

// Vite records Tailwind's source folders as the files in them when globals.css
// is built, so a file added later doesn't rebuild it and its classes go missing.
const rebuildCssOnNewFile: Plugin = {
  name: "lcsc:rebuild-css-on-new-file",
  apply: "serve",
  hotUpdate({ type, file, modules }) {
    // Only the client's globals.css reaches the browser, and plugin-rsc also
    // leaves the server copies alone when a CSS dependency changes.
    if (this.environment.name !== "client") return;
    const { root } = this.environment.config;
    if (type !== "create" || !file.startsWith(`${root}/app/`)) return;
    if (!/\.[jt]sx?$/.test(file)) return;
    const css = this.environment.moduleGraph.getModulesByFile(`${root}/app/globals.css`);
    if (css) return [...modules, ...css];
  },
};

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
    rebuildCssOnNewFile,
  ],
});
