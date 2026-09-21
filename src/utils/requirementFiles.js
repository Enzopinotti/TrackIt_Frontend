export const MAX_REQUIREMENT_FILES = 5;
export const MAX_REQUIREMENT_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_REQUIREMENT_FILE_EXTENSIONS = [
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".pdf",
];

export function validateRequirementFiles(files) {
  const normalizedFiles = files ? Array.from(files) : [];

  if (normalizedFiles.length > MAX_REQUIREMENT_FILES) {
    throw new Error("Máximo 5 archivos.");
  }

  for (const file of normalizedFiles) {
    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!ALLOWED_REQUIREMENT_FILE_EXTENSIONS.includes(extension)) {
      throw new Error(`Extensión no permitida: ${file.name}`);
    }

    if (file.size > MAX_REQUIREMENT_FILE_SIZE_BYTES) {
      throw new Error(`Archivo demasiado grande: ${file.name}`);
    }
  }

  return normalizedFiles;
}
