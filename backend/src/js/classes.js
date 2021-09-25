const classes = (dados,intervalo) => {
    let classes = []
    let maximo = Math.ceil(dados[dados.length-1])
    dados.forEach((d,index) => {
        if(index==0){
            let limite = parseFloat((d+intervalo).toFixed(2))
            classes.push([d,limite,[0,0],[0,0]])
        }
        else{
            let base = classes[classes.length-1][1]
            if(!(d<=base)){
                let limite = parseFloat((base+intervalo).toFixed(2)) 
                limite = maximo-intervalo<limite ? maximo : limite
                classes.push([base,limite,[0,0],[0,0]])
            }   
        }
    })
    return classes;
}

module.exports = classes