import colorPalette from 'src/static/colorPalette'
/**
 * 
 * @param tone 
 * @returns color as string
 */
export default function randomColor (tone?:number): string {
    const _tone:string = tone ? tone.toString() : ''
    const randomIndex: number = Math.floor(
        Math.random() * colorPalette.length - 1
    )
    console.log('condomColor!', randomIndex)
    return `${colorPalette[randomIndex]}-${_tone}`
}