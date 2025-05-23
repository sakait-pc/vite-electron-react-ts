import type { UserConfig, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import { join } from "path";

const formatEnv = (env: string | undefined): string => {
  if (!env) return '';
  return JSON.stringify(env).replace(/"/g, '');
};

const srcRoot = join(__dirname, "src");
const plugins = [react()];

export default ({ command }: ConfigEnv): UserConfig => {
  process.env.VITE_VERSION = formatEnv(process.env.npm_package_version);
  if (command === "serve") {
    return {
      root: srcRoot,
      base: "/",
      plugins,
    };
  } else {
    // command === "build"
    return {
      root: srcRoot,
      base: "./",
      plugins,
      build: {
        outDir: "../out",
        emptyOutDir: true,
      },
    };
  }
};
