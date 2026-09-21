import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

const failures = [];

const read = (file) => fs.readFileSync(file, "utf8");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(SRC).filter((file) => /\.(js|jsx)$/.test(file));
const source = sourceFiles.map((file) => read(file)).join("\n");

const insecureApiMatches = source.match(/http:\/\/trackit\.somee\.com/g) || [];
const localhostMatches = source.match(/http:\/\/localhost(?::\d+)?/g) || [];
const craEnvMatches = source.match(/process\.env\.REACT_APP_/g) || [];
const fetchMatches = source.match(/\bfetch\s*\(/g) || [];

const rootEnv = path.join(ROOT, ".env");
if (fs.existsSync(rootEnv)) failures.push("tracked/current root .env must remain absent");

const envExamplePath = path.join(ROOT, ".env.example");
if (!fs.existsSync(envExamplePath)) {
  failures.push(".env.example configuration contract is missing");
} else {
  const envExample = read(envExamplePath);
  for (const required of [
    "REACT_APP_USE_BACKEND=false",
    "REACT_APP_SECRET_KEY_CAPTCHA=public-client-key-placeholder",
    "REACT_APP_CLIENT_URI=http://localhost:3000",
  ]) {
    if (!envExample.includes(required)) failures.push("baseline env example contract missing: " + required);
  }
}

if (insecureApiMatches.length !== 16) {
  failures.push(`expected 16 legacy HTTP Somee origin references, found ${insecureApiMatches.length}`);
}

if (localhostMatches.length !== 3) {
  failures.push(`expected 3 hard-coded localhost callback references in src, found ${localhostMatches.length}`);
}

if (craEnvMatches.length !== 3) {
  failures.push(`expected 3 CRA REACT_APP environment reads, found ${craEnvMatches.length}`);
}

const configPath = path.join(SRC, "config", "config.js");
const config = read(configPath);
if (!config.includes("useBackend: process.env.REACT_APP_USE_BACKEND")) {
  failures.push("legacy useBackend config declaration changed before its authority is characterized");
}

const useBackendConsumers = sourceFiles
  .filter((file) => file !== configPath)
  .filter((file) => read(file).includes("useBackend"));

if (useBackendConsumers.length !== 0) {
  failures.push("unexpected maintained useBackend consumers found: " + useBackendConsumers.map((x) => path.relative(ROOT, x)).join(", "));
}

console.log("trackit-baseline-source-files=" + sourceFiles.length);
console.log("trackit-baseline-fetch-call-count=" + fetchMatches.length);
console.log("trackit-legacy-http-somee-reference-count=" + insecureApiMatches.length);
console.log("trackit-hardcoded-localhost-reference-count=" + localhostMatches.length);
console.log("trackit-cra-env-read-count=" + craEnvMatches.length);
console.log("trackit-usebackend-consumer-count=" + useBackendConsumers.length);
console.log("trackit-current-root-env=absent");

if (failures.length) {
  console.error("TrackIt baseline authority failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("trackit-baseline-authority=clean");
