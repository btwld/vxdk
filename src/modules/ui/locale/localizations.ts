export type Locale = 'en' | 'pt-BR';

export type RawDictionary = {
  button: {
    play: string;
    pause: string;
    mute: string;
    unmute: string;
    settings: string;
    miniplayer: string;
    enter_fullscreen: string;
    exit_fullscreen: string;
    airplay: string;
  };
  settings_menu: {
    title: string;
    option: {
      speed: string;
      quality: string;
    };
  };
};

export const en: RawDictionary = {
  button: {
    play: 'Play (k)',
    pause: 'Pause (k)',
    mute: 'Mute (m)',
    unmute: 'Unmute (m)',
    settings: 'Settings',
    miniplayer: 'Miniplayer',
    enter_fullscreen: 'Fullscreen',
    exit_fullscreen: 'Exit Fullscreen',
    airplay: 'Airplay',
  },
  settings_menu: {
    title: 'Settings',
    option: {
      speed: 'Speed',
      quality: 'Quality',
    },
  },
};

export const ptBR: RawDictionary = {
  button: {
    play: 'Tocar (k)',
    pause: 'Pausar (k)',
    mute: 'Mudo (m)',
    unmute: 'Habilitar Som (m)',
    settings: 'Configurações',
    miniplayer: 'Miniplayer',
    enter_fullscreen: 'Tela Cheia',
    exit_fullscreen: 'Tela Normal',
    airplay: 'Airplay',
  },
  settings_menu: {
    title: 'Settings',
    option: {
      speed: 'Speed',
      quality: 'Quality',
    },
  },
};
