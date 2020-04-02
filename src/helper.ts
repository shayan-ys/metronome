export function toMS(bpm: number, note: number = 0.25) : number
{
    return 240000 * note / bpm;
}
