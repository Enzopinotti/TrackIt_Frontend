import { describe, expect, it } from "vitest";
import {
  MAX_REQUIREMENT_FILE_SIZE_BYTES,
  validateRequirementFiles,
} from "./requirementFiles.js";

function makeFile(name, size = 128) {
  return { name, size };
}

describe("requirement attachment contract", () => {
  it("accepts up to five supported document files", () => {
    const files = [
      makeFile("one.doc"),
      makeFile("two.DOCX"),
      makeFile("three.xls"),
      makeFile("four.xlsx"),
      makeFile("five.pdf"),
    ];

    expect(validateRequirementFiles(files)).toEqual(files);
  });

  it("rejects more than five files", () => {
    const files = Array.from({ length: 6 }, (_, index) =>
      makeFile(`file-${index}.pdf`),
    );

    expect(() => validateRequirementFiles(files)).toThrow("Máximo 5 archivos.");
  });

  it("rejects unsupported extensions", () => {
    expect(() => validateRequirementFiles([makeFile("payload.exe")])).toThrow(
      "Extensión no permitida: payload.exe",
    );
  });

  it("rejects files larger than 5 MiB", () => {
    expect(() =>
      validateRequirementFiles([
        makeFile("large.pdf", MAX_REQUIREMENT_FILE_SIZE_BYTES + 1),
      ]),
    ).toThrow("Archivo demasiado grande: large.pdf");
  });

  it("treats an empty file input as no attachments", () => {
    expect(validateRequirementFiles(undefined)).toEqual([]);
  });
});
