import { Router } from "express";
import archiver from "archiver";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/", (req, res) => {
  const archive = archiver("zip", { zlib: { level: 9 } });
  res.attachment("cabinet-benameur-radiologie.zip");
  archive.pipe(res);

  const root = path.resolve(".");
  const files = ["client", "server", "shared", "components.json", "drizzle.config.ts", "package.json", "tsconfig.json", "vite.config.ts"];

  files.forEach(file => {
    const filePath = path.join(root, file);
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      stat.isDirectory()
        ? archive.directory(filePath, file)
        : archive.file(filePath, { name: file });
    }
  });

  archive.finalize();
});

export default router;
