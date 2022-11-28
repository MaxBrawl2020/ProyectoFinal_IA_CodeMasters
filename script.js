const threshold = 0.8; //Nuestro threshold minimo

const input = document.getElementById("text");
const button = document.getElementById("classify");
const output = document.getElementById("output");

// Crear la funcion de Clasificacion
const classify = async (model, text) => {
    const oraciones = [text] //El modelo toma la lista como un input
    output.innerHTML = "Clasificando..."
    let predictions = await model.classify(oraciones);
    predictions = predictions.map(prediction => ({
        label: prediction["label"],
        match: prediction.results[0]["match"] // Label viene a ser el nivel de toxicidad, como ser: "identity_threat", "toxicity" 
    })) // Match es si hay una coincidencia entre el texto y el label

    return predictions.filter(p => p.match).map(p => p.label)
}

const main = async () => {
    const model = await toxicity.load(threshold)
    button.onclick = async () => {
        const text = input.value;
        const predictions = await classify(model, text)
        if (predictions.length == 0) {
            output.innerHTML = "Probablemente no sea un comentario tóxico."
        }
        else
        {
            output.innerHTML = predictions
        }
    }
}


main(); //nuestra funcion principal (main), carga el modelo y crea el conductor de eventos.