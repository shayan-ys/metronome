export const MAX_BPM = 210;
export const MIN_BPM = 40;

export const MS_PRECISION = 5;

export const AUDIO_URL: {[key: string]: string} = {
    "clock": "https://app.shayanys.com/metronome/audio/clock.wav",
    "button18": "https://app.shayanys.com/metronome/audio/button18.wav",
    "switch8": "https://app.shayanys.com/metronome/audio/switch8.wav",
    "handbag-lock7": "https://app.shayanys.com/metronome/audio/handbag-lock7.wav",
    "button10": "https://app.shayanys.com/metronome/audio/button10.wav",
};
export const AUDIO_URL_DEFAULT_KEY = "clock";
export const AUDIO_URL_DEFAULT = AUDIO_URL[AUDIO_URL_DEFAULT_KEY];

export const NOTES: {[key: string]: number} = {
    "single":    1,
    "half":      0.5,
    "one-third": 1/3,
    "quarter":   0.25,
};

export const NOTES_DEFAULT_KEY = "quarter";
export const NOTES_DEFAULT = NOTES[NOTES_DEFAULT_KEY];
