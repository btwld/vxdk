/**
 * Enum representing the different types of playback.
 * @category Playback
 */
export enum PlaybackType {
  VOD,
  LIVE,
}

/**
 * Interface representing a level DTO (Data Transfer Object).
 */
export interface Level {
  id: number;
  name: string;
  width?: number;
  height?: number;
  bandwidth?: number;
  hd: boolean;
}

/**
 * Interface representing a caption.
 * @category Playback
 */
export interface Caption {
  label: string;
  srclang: string;
  src: string;
}

/**
 * Type representing a cuepoint, which can be "preroll", "postroll", or a number.
 * @category Playback
 */
export type Cuepoint = 'preroll' | 'postroll' | number;
