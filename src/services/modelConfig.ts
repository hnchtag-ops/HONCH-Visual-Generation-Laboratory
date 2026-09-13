/**
 * HONCH Model Configuration & Adapter Architecture
 * Centralized model definition layer for upgrading models without code rewrite.
 */

export const MODEL_CONFIG = {
  // Reasoning and Creative Orchestration Model
  REASONING_MODEL: 'gemini-3.6-flash',

  // Primary and fallback Image Generation Models
  IMAGE_MODEL: 'gemini-3.1-flash-lite-image',
  IMAGE_MODEL_FALLBACKS: [
    'gemini-3.1-flash-image',
    'gemini-2.5-flash-image',
    'imagen-3.0-generate-002',
  ],

  // Default Editorial Camera Specs
  DEFAULT_CAMERA_SPEC: '80MM · F/2.8 · MEDIUM FORMAT',
  DEFAULT_LIGHTING_SPEC: 'REMBRANDT / DIRECTIONAL KEY',
  DEFAULT_DEPTH_SPEC: 'EDITORIAL OPTICAL SEPARATION',
  DEFAULT_FINISH_SPEC: 'CINEMATIC GRADE / SUBTLE FILM TEXTURE',
};

