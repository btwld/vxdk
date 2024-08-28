export namespace MimetypeUtils {
  export function mimeTypeForUrl(url: string): string[] {
    const extension = (url.split('?')[0].match(/.*\.(.*)$/) || [])[1];
    return (MIMETYPES[extension.toLowerCase()] as string[]) || [];
  }

  export function playbackSupports(url: string, mimetype: string[]) {
    const lowerCaseMimeType = mimetype.map((m) => m.toLowerCase());
    return mimeTypeForUrl(url).some((mime) => lowerCaseMimeType.includes(mime));
  }

  export function isHls(url: string) {
    return playbackSupports(url, [
      'application/vnd.apple.mpegurl',
      'application/x-mpegURL',
    ]);
  }

  export function isDash(url: string) {
    return playbackSupports(url, ['application/dash+xml']);
  }

  export const MIMETYPES: { [key: string]: string[] } = {
    mp4: [
      'avc1.42E01E',
      'avc1.58A01E',
      'avc1.4D401E',
      'avc1.64001E',
      'mp4v.20.8',
      'mp4v.20.240',
      'mp4a.40.2',
    ].map((codec) => {
      return 'video/mp4; codecs="' + codec + ', mp4a.40.2"';
    }),
    ogg: [
      'video/ogg; codecs="theora, vorbis"',
      'video/ogg; codecs="dirac"',
      'video/ogg; codecs="theora, speex"',
    ],
    ogv: [
      'video/ogg; codecs="theora, vorbis"',
      'video/ogg; codecs="dirac"',
      'video/ogg; codecs="theora, speex"',
    ],
    '3gpp': ['video/3gpp; codecs="mp4v.20.8, samr"'],
    '3gp': ['video/3gpp; codecs="mp4v.20.8, samr"'],
    webm: ['video/webm; codecs="vp8, vorbis"'],
    mkv: ['video/x-matroska; codecs="theora, vorbis"'],
    m3u8: ['application/x-mpegurl'],
    mpd: ['application/dash+xml'],
  };

  export const AUDIO_MIMETYPES = {
    wav: ['audio/wav'],
    mp3: ['audio/mp3', 'audio/mpeg;codecs="mp3"'],
    aac: ['audio/mp4;codecs="mp4a.40.5"'],
    oga: ['audio/ogg'],
  };
}
