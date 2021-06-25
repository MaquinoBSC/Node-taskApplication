require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
//const {mostrarMenu, pausa}= require('./helpers/mensajes');

//Importar las funciones que usan inquirer
const {inquirerMenu, pausa, leerInput} = require('./helpers/inquirer');
//importamos la clase Tareas, pues con esta hacemos el CRUD de tareas
const Tareas = require('./models/tareas');


const main = async() =>{
    let opt= '';
    
    const tareas= new Tareas();
    const tareasDB= leerDB();

    if(tareasDB){
        //Establcer las tareas
    }
    await pausa();

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