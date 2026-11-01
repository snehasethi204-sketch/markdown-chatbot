import fs from "fs";
import path from "path";

export async function getKnowledgeBase() {
  const knowledgePath = path.join(
    process.cwd(),
    "knowledge"
  );

  const files = await fs.readdir(knowledgePath);

  const markdownFiles = files.filter(
    (file) => file.endsWith(".md")
  );

  const contents = await Promise.all(
    markdownFiles.map((file) =>
      fs.readFile(
        path.join(knowledgePath, file),
        "utf-8"
      )
    )
  );

  return contents.join("\n\n");
}