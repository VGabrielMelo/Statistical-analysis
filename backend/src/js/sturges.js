const sturges = (dados) => {
    let elementos = dados.length
    let numero_classes =Math.ceil(1+3.222*Math.log10(elementos))
    return numero_classes;
}

module.exports = sturges