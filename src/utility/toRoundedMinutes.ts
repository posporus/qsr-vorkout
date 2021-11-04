const toRoundedMinutes = (milliseconds:number):number => {
    const roundedMinutes = Math.round(milliseconds/6e4)
    return roundedMinutes// > 0 ? roundedMinutes.toString() : '< 1'
}

export default toRoundedMinutes