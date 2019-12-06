function solve(inputObj) {
    let engine = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ]

    return {
        model: inputObj.model,
        engine: engine.find(x => x.power >= inputObj.power),
        carriage: {
            type: inputObj.carriage,
            color: inputObj.color
        },
        wheels: inputObj.wheelsize % 2 === 0 ? new Array(4).fill(--inputObj.wheelsize) : new Array(4).fill(inputObj.wheelsize)
    }
}


console.log(solve(
    {
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
))