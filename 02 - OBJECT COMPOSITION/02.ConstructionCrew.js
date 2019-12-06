function solve(obj){

    if(!obj.hasOwnProperty("dizziness"))
    {
        return obj;
    }

    if(obj.dizziness === true){
        let sum = ((obj.experience * obj.weight) /10) + obj.levelOfHydrated;

        obj.levelOfHydrated = sum;
        obj.dizziness = false;
    }

    return obj;
}


console.log(solve({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }
  ));