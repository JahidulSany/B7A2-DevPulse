import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"], // Vercel Node.js runtime prefers a single clean format (ESM)
  target: "esnext",
  outDir: "dist",
  clean: true,
  bundle: true,
  splitting: false,
  sourcemap: true,
  // Shims require() for ESM environments if needed by dependencies
  banner: {
    js: `
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    `,
  },
});
