import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const RUNTIME_CONFIG = path.join(SRC, "config", "runtime.js");
const ENV_EXAMPLE = path.join(ROOT, ".env.example");
const failures = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

if (!fs.existsSync(RUNTIME_CONFIG)) {
  failures.push("central runtime config is missing");
}

const sourceFiles = walk(SRC).filter((file) => /\.(js|jsx|mjs|cjs)$/.test(file));
const sources = sourceFiles.map((file) => ({
  file: path.relative(ROOT, file),
  content: fs.readFileSync(file, "utf8"),
}));

const runtime = fs.readFileSync(RUNTIME_CONFIG, "utf8");
const envExample = fs.readFileSync(ENV_EXAMPLE, "utf8");

if (!runtime.includes('const DEFAULT_API_BASE_URL = "https://trackit.somee.com";')) {
  failures.push("default external API origin must be centralized on HTTPS");
}

for (const required of ["VITE_API_BASE_URL", "VITE_APP_BASE_URL"]) {
  if (!runtime.includes(required)) {
    failures.push("runtime config does not read " + required);
  }
  if (!envExample.includes(required)) {
    failures.push(".env.example does not document " + required);
  }
}

for (const retired of ["REACT_APP_", "USE_BACKEND", "SECRET_KEY_CAPTCHA"]) {
  if (envExample.includes(retired)) {
    failures.push("retired frontend config returned in .env.example: " + retired);
  }
}

if (!envExample.includes("VITE_API_BASE_URL=https://trackit.somee.com")) {
  failures.push(".env.example must document the HTTPS historical backend default");
}

const consumerSources = sources.filter(({ file }) => file !== "src/config/runtime.js");
const residualSomee = consumerSources
  .filter(({ content }) => /https?:\/\/trackit\.somee\.com/.test(content))
  .map(({ file }) => file);
const residualLocalhost = sources
  .filter(({ content }) => /http:\/\/localhost(?::\d+)?/.test(content))
  .map(({ file }) => file);
const envReadsOutsideAuthority = consumerSources
  .filter(({ content }) => /import\.meta\.env/.test(content))
  .map(({ file }) => file);
const apiUrlConsumers = consumerSources
  .filter(({ content }) => /\bapiUrl\s*\(/.test(content))
  .map(({ file }) => file);
const callbackCalls = consumerSources.reduce(
  (count, { content }) => count + (content.match(/\bcallbackUrl\s*\(/g) || []).length,
  0,
);

if (residualSomee.length) {
  failures.push("direct Somee origins remain outside runtime authority: " + residualSomee.join(", "));
}
if (residualLocalhost.length) {
  failures.push("hard-coded localhost origins remain: " + residualLocalhost.join(", "));
}
if (envReadsOutsideAuthority.length) {
  failures.push("browser environment reads escaped runtime authority: " + envReadsOutsideAuthority.join(", "));
}
if (apiUrlConsumers.length < 10) {
  failures.push("too few API consumers use central apiUrl authority: " + apiUrlConsumers.length);
}
if (callbackCalls !== 3) {
  failures.push("expected exactly 3 centralized callback URL uses, found " + callbackCalls);
}

console.log("trackit-api-base-default=https://trackit.somee.com");
console.log("trackit-direct-somee-consumer-files=" + residualSomee.length);
console.log("trackit-hardcoded-localhost-files=" + residualLocalhost.length);
console.log("trackit-env-reads-outside-runtime=" + envReadsOutsideAuthority.length);
console.log("trackit-api-url-consumer-files=" + apiUrlConsumers.length);
console.log("trackit-callback-url-call-count=" + callbackCalls);

if (failures.length) {
  console.error("TrackIt B3 API/config authority failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("trackit-b3-api-config-authority=clean");
