import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export async function getKnowledgeBase() {
  const knowledgePath = path.join(
    process.cwd(),
    "knowledge"
  );

  const files = await readdir(knowledgePath);

 const markdownFiles = files.filter((file) =>
  file.endsWith(".md")
); 
  
  


  const contents = await Promise.all(
    markdownFiles.map((file) =>
      readFile(
        path.join(knowledgePath, file),
        "utf-8"
      )
    )
  );

  return contents.join("\n\n");
}