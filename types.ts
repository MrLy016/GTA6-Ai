export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GenerationResult {
  originalImage: string; // Base64
  generatedImage: string; // Base64
}

export interface ErrorState {
  hasError: boolean;
  message: string;
}