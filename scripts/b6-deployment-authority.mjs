import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const failures = [];

const appPath = path.join(ROOT, "src", "App.js");
const vercelPath = path.join(ROOT, "vercel.json");
const readmePath = path.join(ROOT, "README.md");
const deploymentDocPath = path.join(ROOT, "docs", "deployment.md");
const distAssets = path.join(ROOT, "dist", "assets");

const app = fs.readFileSync(appPath, "utf8");
const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
const readme = fs.readFileSync(readmePath, "utf8");
const deploymentDoc = fs.readFileSync(deploymentDocPath, "utf8");

const lazyImports = app.match(/lazy\(\(\)\s*=>\s*import\(/g) || [];
const eagerPageImports = app.match(/import\s+[^;]+from\s+["']\.\/pages\//g) || [];

if (lazyImports.length < 18) {
  failures.push("route lazy-loading authority regressed: " + lazyImports.length);
}
if (eagerPageImports.length) {
  failures.push("eager page imports returned to App.js: " + eagerPageImports.length);
}
if (!app.includes("<Suspense")) {
  failures.push("route Suspense boundary is missing");
}

if (vercel.framework !== "vite") {
  failures.push("Vercel framework must remain vite");
}
if (vercel.buildCommand !== "npm run build") {
  failures.push("Vercel build command must remain npm run build");
}
if (vercel.outputDirectory !== "dist") {
  failures.push("Vercel output directory must remain dist");
}

const rewrite = vercel.rewrites?.find(
  (entry) => entry.source === "/(.*)" && entry.destination === "/index.html",
);
if (!rewrite) {
  failures.push("Vercel SPA rewrite to /index.html is missing");
}

for (const marker of [
  "VITE_API_BASE_URL",
  "VITE_APP_BASE_URL",
  "npm run lint",
  "npm test",
  "npm run build",
]) {
  if (!readme.includes(marker)) {
    failures.push("README deployment/quality marker missing: " + marker);
  }
}

for (const marker of [
  "External backend boundary",
  "Vercel SPA",
  "Smoke checklist",
  "35674532649",
]) {
  if (!deploymentDoc.includes(marker)) {
    failures.push("deployment runbook marker missing: " + marker);
  }
}

if (!fs.existsSync(distAssets)) {
  failures.push("dist/assets does not exist; B6 authority must run after build");
}

let jsAssets = [];
if (fs.existsSync(distAssets)) {
  jsAssets = fs
    .readdirSync(distAssets)
    .filter((name) => name.endsWith(".js"))
    .map((name) => {
      const file = path.join(distAssets, name);
      return {
        name,
        bytes: fs.statSync(file).size,
      };
    })
    .sort((a, b) => b.bytes - a.bytes);
}

if (jsAssets.length < 5) {
  failures.push("expected route code-splitting to create at least 5 JS chunks, found " + jsAssets.length);
}

const MAX_CHUNK_BYTES = 500_000;
const oversized = jsAssets.filter(({ bytes }) => bytes > MAX_CHUNK_BYTES);
if (oversized.length) {
  failures.push(
    "JS chunks exceed 500 kB: " +
      oversized.map(({ name, bytes }) => `${name}=${bytes}`).join(", "),
  );
}

const largest = jsAssets[0] ?? { name: "none", bytes: 0 };

console.log("trackit-b6-lazy-route-imports=" + lazyImports.length);
console.log("trackit-b6-eager-page-imports=" + eagerPageImports.length);
console.log("trackit-b6-js-chunk-count=" + jsAssets.length);
console.log("trackit-b6-largest-js-chunk=" + largest.name);
console.log("trackit-b6-largest-js-chunk-bytes=" + largest.bytes);
console.log("trackit-b6-js-chunk-limit-bytes=" + MAX_CHUNK_BYTES);
console.log("trackit-b6-vercel-framework=" + vercel.framework);
console.log("trackit-b6-vercel-output=" + vercel.outputDirectory);

if (failures.length) {
  console.error("TrackIt B6 deployment authority failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("trackit-b6-deployment-authority=clean");
