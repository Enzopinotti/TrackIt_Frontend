import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, "package-lock.json"), "utf8"));
const failures = [];

const expectedDependencies = {
  react: "19.3.0",
  "react-dom": "19.3.0",
  "react-router": "8.4.0",
  "@lottiefiles/dotlottie-react": "0.19.16",
  "react-modal": "3.16.3",
};

const expectedDevDependencies = {
  "@testing-library/dom": "10.4.2",
  "@testing-library/jest-dom": "7.0.1",
  "@testing-library/react": "16.3.3",
  "@testing-library/user-event": "14.6.7",
};

for (const [name, version] of Object.entries(expectedDependencies)) {
  if (pkg.dependencies?.[name] !== version) {
    failures.push(`expected dependency ${name}@${version}, found ${pkg.dependencies?.[name] ?? "missing"}`);
  }
}

for (const [name, version] of Object.entries(expectedDevDependencies)) {
  if (pkg.devDependencies?.[name] !== version) {
    failures.push(`expected devDependency ${name}@${version}, found ${pkg.devDependencies?.[name] ?? "missing"}`);
  }
}

for (const retired of [
  "react-router-dom",
  "@lottiefiles/react-lottie-player",
  "@fortawesome/free-solid-svg-icons",
  "@fortawesome/react-fontawesome",
  "prop-types",
]) {
  if (pkg.dependencies?.[retired] || pkg.devDependencies?.[retired]) {
    failures.push("retired runtime dependency returned: " + retired);
  }
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(SRC).filter((file) => /\.(js|jsx|mjs|cjs)$/.test(file));
const sources = sourceFiles.map((file) => ({
  file: path.relative(ROOT, file),
  content: fs.readFileSync(file, "utf8"),
}));

const joined = sources.map(({ content }) => content).join("\n");

if (joined.includes("react-router-dom")) {
  failures.push("maintained source still imports or references react-router-dom");
}

if (joined.includes("@lottiefiles/react-lottie-player")) {
  failures.push("maintained source still references the archived Lottie React player");
}

if (joined.includes("prop-types") || /\.propTypes\s*=/.test(joined)) {
  failures.push("React 19 ignored propTypes remain in maintained source");
}

const defaultPropsFiles = sources
  .filter(({ content }) => /\.defaultProps\s*=/.test(content))
  .map(({ file }) => file);

if (defaultPropsFiles.length) {
  failures.push("React 19 function defaultProps remain: " + defaultPropsFiles.join(", "));
}

const routerImportFiles = sources
  .filter(({ content }) => /from\s+["']react-router["']/.test(content))
  .map(({ file }) => file);

if (!routerImportFiles.length) {
  failures.push("no maintained React Router v8 imports found");
}

for (const consumer of [
  "src/components/LoadingOverlay.js",
  "src/pages/PageNotFound.js",
]) {
  const content = fs.readFileSync(path.join(ROOT, consumer), "utf8");
  if (!content.includes("DotLottieReact")) {
    failures.push("dotLottie migration missing from " + consumer);
  }
}

const lockedVersions = {
  react: lock.packages?.["node_modules/react"]?.version,
  "react-dom": lock.packages?.["node_modules/react-dom"]?.version,
  "react-router": lock.packages?.["node_modules/react-router"]?.version,
  "@lottiefiles/dotlottie-react":
    lock.packages?.["node_modules/@lottiefiles/dotlottie-react"]?.version,
};

for (const [name, version] of Object.entries({
  react: "19.3.0",
  "react-dom": "19.3.0",
  "react-router": "8.4.0",
  "@lottiefiles/dotlottie-react": "0.19.16",
})) {
  if (lockedVersions[name] !== version) {
    failures.push(`lockfile expected ${name}@${version}, found ${lockedVersions[name] ?? "missing"}`);
  }
}

for (const retiredLock of [
  "node_modules/react-router-dom",
  "node_modules/@lottiefiles/react-lottie-player",
  "node_modules/@fortawesome/free-solid-svg-icons",
  "node_modules/@fortawesome/react-fontawesome",
]) {
  if (lock.packages?.[retiredLock]) {
    failures.push("retired lockfile package returned: " + retiredLock);
  }
}

console.log("trackit-react-version=" + pkg.dependencies.react);
console.log("trackit-react-dom-version=" + pkg.dependencies["react-dom"]);
console.log("trackit-react-router-version=" + pkg.dependencies["react-router"]);
console.log("trackit-react-router-dom-source-references=" + (joined.match(/react-router-dom/g) || []).length);
console.log("trackit-function-default-props-count=" + defaultPropsFiles.length);
console.log("trackit-router-v8-consumer-files=" + routerImportFiles.length);
console.log("trackit-dotlottie-version=" + pkg.dependencies["@lottiefiles/dotlottie-react"]);

if (failures.length) {
  console.error("TrackIt B2 runtime authority failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("trackit-b2-runtime-authority=clean");
