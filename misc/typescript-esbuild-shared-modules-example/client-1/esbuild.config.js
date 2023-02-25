import esbuild from "esbuild";
import serve, { error, log } from "create-serve";
import { exec } from "child_process";

const port = 8001;
export const isWatch = process.argv.includes("--watch");

const esbuildServe = async (options = {}, serveOptions = {}) => {
  esbuild
    .build({
      ...options,
      watch: isWatch && {
        onRebuild(err) {
          serve.update();
          err ? error("× Failed") : log("✓ Updated");
        },
      },
    })
    .catch(() => process.exit(1));

  if (isWatch) {
    await serve.start(serveOptions);
    if (process.argv.includes("--open")) {
      const openCmds = { darwin: "open", win32: "start", default: "xdg-open" };
      const openCmd = openCmds[process.platform] || openCmds.default;
      exec(openCmd + ` http://localhost:${port}/`);
    }
  }
};

esbuildServe(
  {
    logLevel: "info",
    entryPoints: ["client-1.tsx"],
    bundle: true,
    outfile: "www/build/client-1.js",
    define: {
      "process.env.NODE_ENV": "'production'",
    },
  },
  { root: "www", port }
);
