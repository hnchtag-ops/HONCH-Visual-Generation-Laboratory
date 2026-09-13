import { CameraPresetId, FinishProfileId, AdvancedCameraParams } from './services/cameraPresets';

export type ReferenceStrength = 'light' | 'balanced' | 'strong';

export interface ReferenceImageData {
  base64: string;
  mimeType: string;
  previewUrl: string;
  strength?: ReferenceStrength;
}

export interface VisualSpecification {
  subject: string;
  action: string;
  impossibleIdea: string;
  objects: string[];
  environment: string;
  materials: string;
  geometry: string;
  camera: string; // e.g. "85MM · F/2.8 · ICONIC HERO"
  perspective: string;
  lighting: string; // e.g. "REMBRANDT / DIRECTIONAL KEY"
  spatialDepth: string; // e.g. "EDITORIAL OPTICAL SEPARATION"
  physicalInteraction: string;
  color: string;
  finish: string; // e.g. "PRISTINE LARGE FORMAT"
  opticalDna?: string;
}

export interface GenerationRequest {
  conceptPrompt: string;
  sourceImageBase64?: string;
  sourceImageMimeType?: string;
  referenceImageBase64?: string;
  referenceImageMimeType?: string;
  referenceStrength?: ReferenceStrength;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  materialInspiration?: string;
  cameraPreset?: CameraPresetId;
  finishProfile?: FinishProfileId;
  advancedCameraParams?: AdvancedCameraParams;
}

export interface GeneratedImageItem {
  id: string;
  imageUrl: string;
  conceptPrompt: string;
  spec: VisualSpecification;
  constructedPrompt: string;
  createdAt: number;
  sourceImageUsed?: boolean;
  referenceImageUsed?: boolean;
  referenceStrength?: ReferenceStrength;
  aspectRatio?: string;
  cameraPreset?: CameraPresetId;
  finishProfile?: FinishProfileId;
  advancedCameraParams?: AdvancedCameraParams;
}

export type SynthesisStage =
  | 'idle'
  | 'interpreting'
  | 'constructing'
  | 'matching'
  | 'rebuilding'
  | 'resolving'
  | 'rendering'
  | 'complete'
  | 'error';

