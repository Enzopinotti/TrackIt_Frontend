import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const failures = [];

const deadSource = [
  "src/components/PrivateRoute.js",
  "src/components/Dashboard.js",
  "src/components/layouts/Main.js",
  "src/pages/TiposCategorias.js",
  "src/pages/Usuarios.js",
  "src/styles/scss/components/_recuperarContrasenia.scss",
  "src/styles/scss/components/_resetearContrasenia.scss",
];

for (const retired of deadSource) {
  if (fs.existsSync(path.join(ROOT, retired))) {
    failures.push("retired dead source returned: " + retired);
  }
}

for (const retiredDependency of [
  "@fortawesome/free-solid-svg-icons",
  "@fortawesome/react-fontawesome",
  "prop-types",
]) {
  if (
    pkg.dependencies?.[retiredDependency] ||
    pkg.devDependencies?.[retiredDependency]
  ) {
    failures.push("retired direct dependency returned: " + retiredDependency);
  }
}

const expectedDevDependencies = {
  eslint: "9.39.5",
  "@eslint/js": "9.39.5",
  globals: "17.12.0",
  "eslint-plugin-react-hooks": "7.1.1",
  "eslint-plugin-jsx-a11y": "6.10.2",
};

for (const [name, version] of Object.entries(expectedDevDependencies)) {
  if (pkg.devDependencies?.[name] !== version) {
    failures.push(
      `expected B5 devDependency ${name}@${version}, found ${pkg.devDependencies?.[name] ?? "missing"}`,
    );
  }
}

if (pkg.scripts?.lint !== "eslint src scripts vite.config.js eslint.config.js") {
  failures.push("npm lint command is not authoritative");
}

if (!fs.existsSync(path.join(ROOT, "eslint.config.js"))) {
  failures.push("eslint.config.js is missing");
}

if (fs.existsSync(path.join(ROOT, ".github/workflows/b5-lock-refresh.yml"))) {
  failures.push("temporary B5 lock refresh workflow must not remain");
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const jsFiles = walk(SRC).filter((file) => /\.(js|jsx|mjs|cjs)$/.test(file));
const jsSource = jsFiles
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

if (/from\s+["']prop-types["']/.test(jsSource) || /\.propTypes\s*=/.test(jsSource)) {
  failures.push("React 19 ignored propTypes remain in maintained source");
}

const scssFiles = walk(path.join(SRC, "styles", "scss")).filter((file) =>
  file.endsWith(".scss"),
);
const scssSource = scssFiles
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const darkenCount = (scssSource.match(/\bdarken\s*\(/g) || []).length;
const lightenCount = (scssSource.match(/\blighten\s*\(/g) || []).length;

if (darkenCount || lightenCount) {
  failures.push(
    `deprecated Sass color helpers remain: darken=${darkenCount}, lighten=${lightenCount}`,
  );
}

const sassColorUsers = scssFiles.filter((file) =>
  fs.readFileSync(file, "utf8").includes("@use 'sass:color';"),
);

if (!sassColorUsers.length) {
  failures.push("modern Sass color module has no maintained consumers");
}

console.log("trackit-b5-dead-source-count=0");
console.log("trackit-b5-direct-prop-types=absent");
console.log("trackit-b5-direct-fontawesome=absent");
console.log("trackit-b5-deprecated-sass-darken-count=" + darkenCount);
console.log("trackit-b5-deprecated-sass-lighten-count=" + lightenCount);
console.log("trackit-b5-sass-color-module-files=" + sassColorUsers.length);
console.log("trackit-b5-eslint-version=" + pkg.devDependencies.eslint);
console.log(
  "trackit-b5-jsx-a11y-version=" +
    pkg.devDependencies["eslint-plugin-jsx-a11y"],
);

if (failures.length) {
  console.error("TrackIt B5 source-quality authority failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("trackit-b5-source-quality-authority=clean");
