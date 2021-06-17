require('colors');
const { guardarDB } = require('./helpers/guardarArchivo');
//const {mostrarMenu, pausa}= require('./helpers/mensajes');

//Importar las funciones que usan inquirer
const {inquirerMenu, pausa, leerInput} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() =>{
    let opt= '';
    //instancia de la clase que se encarga de las operaciones con las tareas
    const tareas= new Tareas();

    do {
        opt= await inquirerMenu();

        switch (opt) {
            case '1':
                const desc= await leerInput('Descripcion: ');
                tareas.crearTarea(desc);

                break;
        
            case '2':
                console.log(tareas.listadoArray);;
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArray);

        if(opt !== '0') await pausa();
        
    } while (opt !== '0');
}

main();