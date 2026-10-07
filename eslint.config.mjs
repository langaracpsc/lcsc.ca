import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // vinext / Cloudflare build output — generated code, not ours to lint.
    "dist/**",
    ".vinext/**",
    ".wrangler/**",
  ]),
  {
    /*
      Registry components, vendored via `shadcn add`.

      These are third-party source we did not write, and they trip the newer
      React Compiler lint rules — `DiaTextReveal` uses the "latest ref" pattern,
      assigning `optsRef.current` and `playRef.current` during render, which
      `react-hooks/refs` rejects.

      Fixed here by scoping the rule off rather than patching the file: these are
      registry-managed, so the next `shadcn add` (or an update to the component)
      would overwrite any local fix and the failure would come straight back.
      Only these two rules are relaxed — everything else still applies, so a real
      mistake in a vendored component still surfaces.

      Worth knowing: the pattern is a genuine (if usually benign) React
      correctness hazard, because a render that never commits can leave the ref
      holding values from a discarded pass. It affects animation timing here, not
      data, which is why it is acceptable to leave upstream.
    */
    files: ["app/components/ui/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
]);

export default eslintConfig;
