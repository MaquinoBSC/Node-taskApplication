const fs= require('fs');
const archivo= './db/data.json';

//El archivo JSON funciona como nuestra base de datos

//funcion para guardar nuestras tareas en el archivo JSON
const guardarDB= (data)=> {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

//funcion para leer las tareas contenidas en nuestro archivo JSON
const leerDB= ()=> {
    if(!fs.existsSync(archivo)){
        return null;
    }

    const info= fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data= JSON.parse(info);

    return data;
}



//Exportar nuestras funciones
module.exports= {
    guardarDB,
    leerDB,
}