export function toMS(bpm: number, note: number) : number
{
    return 240000 * note / bpm;
}
