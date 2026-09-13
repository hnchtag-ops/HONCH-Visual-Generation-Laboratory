import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { MODEL_CONFIG } from "./src/services/modelConfig";
import { interpretConceptWithGemini, generateEditorialImage } from "./server/services/honchEngine";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON & URL-encoded payloads with base64 images
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      models: MODEL_CONFIG,
    });
  });

  // Interpret Concept Endpoint (Creative Direction Step)
  app.post("/api/interpret", async (req, res) => {
    try {
      const {
        conceptPrompt,
        sourceImageBase64,
        sourceImageMimeType,
        referenceImageBase64,
        referenceImageMimeType,
        referenceStrength,
        materialInspiration,
        cameraPreset,
        finishProfile,
        advancedCameraParams,
      } = req.body;
      if (!conceptPrompt || typeof conceptPrompt !== "string") {
        return res.status(400).json({ error: "conceptPrompt string is required" });
      }

      const result = await interpretConceptWithGemini(
        conceptPrompt,
        sourceImageBase64,
        sourceImageMimeType,
        referenceImageBase64,
        referenceImageMimeType,
        referenceStrength,
        materialInspiration,
        cameraPreset,
        finishProfile,
        advancedCameraParams
      );

      res.json(result);
    } catch (error: any) {
      console.error("Error in /api/interpret:", error);
      res.status(500).json({
        error: error.message || "Failed to interpret visual concept",
      });
    }
  });

  // Master Generation Endpoint (Interpret + Render)
  app.post("/api/generate", async (req, res) => {
    try {
      const {
        conceptPrompt,
        sourceImageBase64,
        sourceImageMimeType,
        referenceImageBase64,
        referenceImageMimeType,
        referenceStrength,
        aspectRatio = "1:1",
        materialInspiration,
        cameraPreset,
        finishProfile,
        advancedCameraParams,
      } = req.body;

      if (!conceptPrompt || typeof conceptPrompt !== "string") {
        return res.status(400).json({ error: "conceptPrompt string is required" });
      }

      // Step 1: Creative Direction & Specification synthesis via Gemini
      const { spec, constructedPrompt } = await interpretConceptWithGemini(
        conceptPrompt,
        sourceImageBase64,
        sourceImageMimeType,
        referenceImageBase64,
        referenceImageMimeType,
        referenceStrength,
        materialInspiration,
        cameraPreset,
        finishProfile,
        advancedCameraParams
      );

      // Step 2: Render Image via Centralized Image Model Adapter
      const imageUrl = await generateEditorialImage(
        constructedPrompt,
        sourceImageBase64,
        sourceImageMimeType,
        referenceImageBase64,
        referenceImageMimeType,
        aspectRatio
      );

      const id = `honch_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

      res.json({
        id,
        imageUrl,
        conceptPrompt,
        spec,
        constructedPrompt,
        createdAt: Date.now(),
        sourceImageUsed: Boolean(sourceImageBase64),
        referenceImageUsed: Boolean(referenceImageBase64),
        referenceStrength,
        aspectRatio,
        cameraPreset,
        finishProfile,
        advancedCameraParams,
      });
    } catch (error: any) {
      console.error("Error in /api/generate:", error);
      res.status(500).json({
        error: error.message || "Failed to generate editorial photograph",
      });
    }
  });

  // Vite Middleware in Dev vs Static Files in Prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HONCH Generation Laboratory server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
