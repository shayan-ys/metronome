import {SpeedStore} from "./components/Metronome/speed/store";
import {AUDIO_URL} from "./metrics";

export function toMS(bpm: number, note: number) : number
{
    return 240000 * note / bpm;
}

export const alternateTone    = () => {
    let audio_urls = Object.values(AUDIO_URL);
    // next URL in the list (if at the end, the first one)
    let next_index = (audio_urls.indexOf(SpeedStore.getState().audio_url) + 1) % audio_urls.length;
    return audio_urls[next_index];
};
