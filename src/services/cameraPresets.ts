export type CameraPresetId = 'hero' | 'immersive' | 'observer' | 'cinema';
export type FinishProfileId = 'pristine' | 'editorial' | 'filmic' | 'raw';

export interface CameraPreset {
  id: CameraPresetId;
  title: string;
  label: string;
  purpose: string;
  description: string;
  cameraSpec: string;
  behaviorPrompt: string;
}

export interface FinishProfile {
  id: FinishProfileId;
  title: string;
  purpose: string;
  description: string;
  finishSpec: string;
  behaviorPrompt: string;
}

export interface AdvancedCameraParams {
  focalLength?: string;
  cameraHeight?: string;
  cameraDistance?: string;
  perspectiveStrength?: string;
  depthOfField?: string;
  focusDistance?: string;
}

export const CAMERA_PRESETS: Record<CameraPresetId, CameraPreset> = {
  hero: {
    id: 'hero',
    title: 'HERO',
    label: 'Make it iconic.',
    purpose: 'Create iconic, authoritative imagery.',
    description: 'Controlled perspective, medium focal length (50–85mm), strong subject separation, deliberate framing, balanced negative space.',
    cameraSpec: '85MM · F/2.8 · ICONIC HERO',
    behaviorPrompt: 'CAMERA MODE: HERO. Controlled perspective, medium focal length (50–85mm equivalent), strong subject separation, deliberate framing, balanced negative space, stable camera position, subtle low-angle bias, strong geometric composition.',
  },
  immersive: {
    id: 'immersive',
    title: 'IMMERSIVE',
    label: 'Feel physically present.',
    purpose: 'Make the viewer feel physically present inside the scene.',
    description: 'Wider focal length (28–35mm), foreground depth, pronounced spatial relationships, close camera placement, environmental scale.',
    cameraSpec: '28MM · F/2.0 · IMMERSIVE PERSPECTIVE',
    behaviorPrompt: 'CAMERA MODE: IMMERSIVE. Wider focal length (28–35mm equivalent), foreground depth, pronounced spatial relationships, close camera placement, controlled perspective distortion, environmental scale, layered depth.',
  },
  observer: {
    id: 'observer',
    title: 'OBSERVER',
    label: 'Editorial intelligence.',
    purpose: 'Create editorial intelligence and visual distance.',
    description: 'Elevated or distant viewpoint, long focal length (70–135mm), compressed spatial relationships, strong negative space, graphic composition.',
    cameraSpec: '105MM · F/4.0 · OBSERVER DISTANCE',
    behaviorPrompt: 'CAMERA MODE: OBSERVER. Elevated or distant viewpoint, medium-to-long focal length (70–135mm equivalent), compressed spatial relationships, strong negative space, graphic composition, subject/environment relationship emphasized.',
  },
  cinema: {
    id: 'cinema',
    title: 'CINEMA',
    label: 'Deliberate film frame.',
    purpose: 'Make the image feel like a frame deliberately captured from a film.',
    description: 'Off-axis composition, layered foreground/subject/background, natural perspective, controlled depth of field, visual storytelling.',
    cameraSpec: '50MM ANAMORPHIC · F/2.0 · CINEMATIC FRAME',
    behaviorPrompt: 'CAMERA MODE: CINEMA. Off-axis composition, layered foreground, subject and background, natural perspective, controlled depth of field, subtle environmental obstruction, asymmetrical framing, visual storytelling through camera placement.',
  },
};

export const FINISH_PROFILES: Record<FinishProfileId, FinishProfile> = {
  pristine: {
    id: 'pristine',
    title: 'PRISTINE',
    purpose: 'Large-format photographic clarity & optical coherence',
    description: 'Controlled highlight rolloff, natural shadow density, clean edge rendering, realistic reflections, subtle atmospheric depth, no artificial HDR.',
    finishSpec: 'LARGE FORMAT · OPTICAL CLARITY · NATURAL RESPONSE',
    behaviorPrompt: 'FINISH PROFILE: PRISTINE. Large-format photographic clarity, controlled highlight rolloff, natural shadow density, high believable microcontrast, clean edge rendering, natural material response, realistic reflections, subtle atmospheric depth, controlled lens character, natural depth separation, restrained filmic texture, accurate exposure, no artificial HDR, no excessive sharpening, no plastic skin, no synthetic surfaces.',
  },
  editorial: {
    id: 'editorial',
    title: 'EDITORIAL',
    purpose: 'Fashion photography & magazine-grade composition',
    description: 'Soft directional light, controlled imperfections, subtle lens character, natural skin/material response, sophisticated color separation.',
    finishSpec: 'MAGAZINE EDITORIAL · DIRECTIONAL SOFT LIGHT',
    behaviorPrompt: 'FINISH PROFILE: EDITORIAL. Fashion photography aesthetic, controlled subtle imperfections, subtle lens character, soft but directional light, natural skin and material response, sophisticated color separation, moderate atmospheric depth, magazine-grade composition.',
  },
  filmic: {
    id: 'filmic',
    title: 'FILMIC',
    purpose: 'Cinematic exposure & dense photographic tones',
    description: 'Cinematic exposure, natural highlight rolloff, dense blacks, controlled shadow detail, subtle color separation, atmospheric depth, restrained grain.',
    finishSpec: 'CINEMATIC EXPOSURE · DENSE BLACKS · RESTRAINED GRAIN',
    behaviorPrompt: 'FINISH PROFILE: FILMIC. Cinematic exposure, natural highlight rolloff, dense blacks, controlled shadow detail, subtle color separation, atmospheric depth, restrained grain, natural lens character, photographic rendering.',
  },
  raw: {
    id: 'raw',
    title: 'RAW',
    purpose: 'Documentary photographic character & unpolished texture',
    description: 'Natural exposure, documentary lens behavior, subtle lens imperfections, realistic unpolished texture, minimal processing, natural contrast.',
    finishSpec: 'DOCUMENTARY RAW · UNPOLISHED TEXTURE',
    behaviorPrompt: 'FINISH PROFILE: RAW. Natural exposure, less polished optical behavior, subtle lens imperfections, realistic texture, documentary photographic character, minimal processing, natural contrast.',
  },
};
