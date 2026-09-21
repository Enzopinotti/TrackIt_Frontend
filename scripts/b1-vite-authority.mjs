import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

const failures = [];

const forbiddenPackages = [
  "react-scripts",
  "dotenv",
  "lottie-react",
  "web-vitals",
  "concurrently",
  "cross-env",
  "nodemon",
];

for (const name of forbiddenPackages) {
  if (pkg.dependencies?.[name] || pkg.devDependencies?.[name]) {
    failures.push("retired CRA/tooling dependency returned: " + name);
  }
}

const expectedDev = {
  vite: "8.3.0",
  vitest: "5.0.1",
  "@vitejs/plugin-react": "6.1.1",
  jsdom: "30.0.1",
};

for (const [name, version] of Object.entries(expectedDev)) {
  if (pkg.devDependencies?.[name] !== version) {
    failures.push(`expected ${name}@${version}, found ${pkg.devDependencies?.[name] ?? "missing"}`);
  }
}

for (const [script, command] of Object.entries({
  start: "vite",
  dev: "vite",
  build: "vite build",
  test: "vitest run",
})) {
  if (pkg.scripts?.[script] !== command) {
    failures.push(`script ${script} must be ${command}`);
  }
}

for (const required of [
  "index.html",
  "vite.config.js",
  "vercel.json",
  ".nvmrc",
  "src/styles/scss/main.scss",
]) {
  if (!fs.existsSync(path.join(ROOT, required))) {
    failures.push("Vite source authority missing: " + required);
  }
}

for (const retired of [
  "public/index.html",
  "src/styles/css/main.css",
  "src/styles/css/main.css.map",
  "src/config/config.js",
]) {
  if (fs.existsSync(path.join(ROOT, retired))) {
    failures.push("retired CRA/generated source returned: " + retired);
  }
}

const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
if (vercel.framework !== "vite") {
  failures.push("Vercel framework authority must be vite");
}
if (vercel.buildCommand !== "npm run build") {
  failures.push("Vercel build command must use npm run build");
}
if (vercel.outputDirectory !== "dist") {
  failures.push("Vercel output directory must be dist");
}
const spaRewrite = vercel.rewrites?.find(
  (rewrite) => rewrite.source === "/(.*)" && rewrite.destination === "/index.html",
);
if (!spaRewrite) {
  failures.push("Vercel SPA rewrite to /index.html is missing");
}

const entry = fs.readFileSync(path.join(SRC, "index.js"), "utf8");
if (!entry.includes("import './styles/scss/main.scss';")) {
  failures.push("src/index.js must import Sass source directly");
}
if (entry.includes("./styles/css/main.css")) {
  failures.push("src/index.js must not import generated CSS");
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(SRC).filter((file) => /\.(js|jsx)$/.test(file));
const source = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

const craEnvReads = source.match(/process\.env\.REACT_APP_/g) || [];
const insecureApi = source.match(/http:\/\/trackit\.somee\.com/g) || [];
const localhost = source.match(/http:\/\/localhost(?::\d+)?/g) || [];

if (craEnvReads.length !== 0) {
  failures.push("CRA process.env reads remain in maintained source: " + craEnvReads.length);
}

if (insecureApi.length !== 17) {
  failures.push("B3 API-origin debt changed unexpectedly before API authority work: " + insecureApi.length);
}

if (localhost.length !== 3) {
  failures.push("B3 localhost callback debt changed unexpectedly before API authority work: " + localhost.length);
}

console.log("trackit-build-authority=Vite");
console.log("trackit-test-authority=Vitest");
console.log("trackit-node-authority=" + pkg.engines.node);
console.log("trackit-generated-css-source=absent");
console.log("trackit-vercel-framework=" + vercel.framework);
console.log("trackit-vercel-output=" + vercel.outputDirectory);
console.log("trackit-vercel-spa-rewrite=present");
console.log("trackit-cra-env-read-count=" + craEnvReads.length);
console.log("trackit-legacy-http-somee-reference-count=" + insecureApi.length);
console.log("trackit-hardcoded-localhost-reference-count=" + localhost.length);

if (failures.length) {
  console.error("TrackIt B1 Vite authority failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("trackit-b1-vite-authority=clean");
