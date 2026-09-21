import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const failures = [];

const requiredTests = [
  "src/config/runtime.test.js",
  "src/utils/localStorageUtils.test.js",
  "src/utils/requirementFiles.test.js",
  "src/components/routeGuards.test.js",
  "src/context/AuthContext.test.js",
  "src/pages/mockAdministration.test.js",
];

for (const testFile of requiredTests) {
  if (!fs.existsSync(path.join(ROOT, testFile))) {
    failures.push("required behavior test missing: " + testFile);
  }
}

const viteConfig = fs.readFileSync(path.join(ROOT, "vite.config.js"), "utf8");
if (!viteConfig.includes('setupFiles: "./src/test/setup.js"')) {
  failures.push("Vitest setup file is not authoritative");
}
if (!viteConfig.includes("passWithNoTests: false")) {
  failures.push("Vitest must fail when maintained tests disappear");
}

const requirementForm = fs.readFileSync(
  path.join(ROOT, "src/components/RequirementForm.js"),
  "utf8",
);
if (!requirementForm.includes("validateRequirementFiles(data.files)")) {
  failures.push("RequirementForm is not using the tested attachment contract");
}

const testSource = requiredTests
  .map((file) => fs.readFileSync(path.join(ROOT, file), "utf8"))
  .join("\n");

const protectedContracts = [
  ["route redirect behavior", "ProtectedRoute"],
  ["auth restore behavior", "stored-token"],
  ["runtime URL behavior", "VITE_API_BASE_URL"],
  ["localStorage behavior", "loadFromLocalStorage"],
  ["attachment limits", "Máximo 5 archivos."],
  ["mock administration boundary", "mock/local administration boundaries"],
];

for (const [label, marker] of protectedContracts) {
  if (!testSource.includes(marker)) {
    failures.push(`behavior contract missing: ${label}`);
  }
}

console.log("trackit-b4-required-test-files=" + requiredTests.length);
console.log("trackit-b4-pass-with-no-tests=false");
console.log("trackit-b4-attachment-contract=protected");
console.log("trackit-b4-mock-admin-boundary=protected");

if (failures.length) {
  console.error("TrackIt B4 behavior-test authority failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("trackit-b4-behavior-test-authority=clean");
