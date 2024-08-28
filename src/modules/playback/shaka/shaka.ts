// import * as shaka from 'shaka-player';
// import { MimetypeUtils } from '../../common/utils';
// import type { VxdkContext } from '../../context/context';
// import { PLAYBACK_EVENT } from '../../events/events.dto';
// import { HTML5Player } from '../html5';
// import type { LevelDto } from '../playback_types';

// export class ShakaPlayer extends HTML5Player {
//   public name = 'ShakaPlayer';
//   public shakaPlayer: shaka.Player;

//   constructor(ctx: VxdkContext) {
//     super(ctx);
//     this.shakaPlayer = new shaka.Player(this.nativeEl);
//   }
//   public connectedCallback() {
//     super.connectedCallback();

//     this._bindListeners();

//     const configuration: shaka.extern.PlayerConfiguration = {
//       abr: {
//         enabled: true,
//         defaultBandwidthEstimate:
//           Number(this.storage.getItem('estimatedBandwidth')) || 1024 * 1000,
//       } as shaka.extern.AbrConfiguration,
//     };

//     this.logger.info('Starting Shaka', { configuration });

//     this.shakaPlayer.configure(configuration);
//   }

//   public getCurrentLevel() {
//     return this._formatTrack(
//       this.shakaPlayer.getVariantTracks().find((track) => track.active),
//     );
//   }

//   public get levels() {
//     return this.shakaPlayer
//       .getVariantTracks()
//       .filter((track) => track.type === 'variant')
//       .sort((a, b) => b.bandwidth - a.bandwidth)
//       .map(this._formatTrack);
//   }

//   private _bindListeners() {
//     this.shakaPlayer.addEventListener('error', (err) =>
//       this._onErrorEvent(err),
//     );

//     this.shakaPlayer.addEventListener('adaptation', () =>
//       this.onAdaptationEvent(),
//     );
//   }

//   public async load() {
//     const { source, startTime } = this.controller.getOptions();
//     try {
//       await this.shakaPlayer.load(source, startTime);

//       this.emit(PLAYBACK_EVENT.LEVELS_LOADED);

//       // const audioLanguages = this.player.getAudioLanguages();

//       // this.emit(Events.MEDIA_STATE_AUDIOLANGUAGES, {
//       //   audioLanguages,
//       // } as IAudioLanguagesEventData);
//     } catch (error) {
//       this._onError(error);
//     }
//   }

//   public disconnectedCallback() {
//     if (this.shakaPlayer) {
//       this.shakaPlayer.destroy();
//     }
//   }

//   static canPlay(source: string): boolean {
//     shaka.polyfill.installAll();
//     return shaka.Player.isBrowserSupported() && MimetypeUtils.isDash(source);
//   }

//   private emitTrackChange() {
//     this.emit(PLAYBACK_EVENT.LEVEL_CHANGED);
//     this.emit(PLAYBACK_EVENT.AUTOLEVEL_CHANGED);
//   }

//   private _onErrorEvent(event: any) {
//     this._onError(event.detail);
//   }

//   private _onError(error: any) {
//     if (error.severity === 2) {
//       // this.trigger(PLAYBACK_EVENT.error)(
//       //   new VxdkError(ErrorCodes.PLAYBACK_CRITICAL_ERROR, error)
//       // );
//     }
//   }

//   public selectTrack(track: LevelDto | 'auto') {
//     if (track === 'auto') {
//       this.shakaPlayer.configure({
//         abr: { enabled: true } as shaka.extern.AbrConfiguration,
//       });
//       this.emitTrackChange();
//     } else {
//       this.shakaPlayer.configure({
//         abr: { enabled: false } as shaka.extern.AbrConfiguration,
//       });

//       const variantTrack = this.shakaPlayer
//         .getVariantTracks()
//         .find((variantTrack) => variantTrack.id === (track as LevelDto).id);

//       if (variantTrack) {
//         this.shakaPlayer.selectVariantTrack(variantTrack, true);
//         this.emitTrackChange();
//       }
//     }
//   }

//   public selectAudioLanguage(language: string) {
//     this.shakaPlayer.selectAudioLanguage(language);
//   }

//   private onAdaptationEvent() {
//     this.emitTrackChange();

//     const estimatedBandwidth = this.shakaPlayer.getStats().estimatedBandwidth;
//     this.storage.setItem('estimatedBandwidth', estimatedBandwidth);
//   }

//   private _formatTrack = (track: any): LevelDto => ({
//     id: track.id,
//     width: track.width,
//     height: track.height,
//     bandwidth: track.bandwidth,
//     // TODO: NEED to review
//     name: track.id,
//     hd: track.hd,
//   });
// }
