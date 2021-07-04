require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
//const {mostrarMenu, pausa}= require('./helpers/mensajes');

//Importar las funciones que usan inquirer
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar} = require('./helpers/inquirer');
//importamos la clase Tareas, pues con esta hacemos el CRUD de tareas
const Tareas = require('./models/tareas');


const main = async() =>{
    let opt= '';
    
    const tareas= new Tareas();

    //leemos las tareas almacenadas en la DB
    const tareasDB= leerDB();

    if(tareasDB){
        //Establecer las tareas
        tareas.cargarTareas(tareasDB);
    }

    do {
        opt= await inquirerMenu();

        switch (opt) {
            case '1':
                const desc= await leerInput('Descripcion: ');
                tareas.crearTarea(desc);

                break;
        
            case '2':
                tareas.listadoCompleto();
                break;

            case '3'://Listar completadas
                tareas.listarPendientesCompletadas(true);
                break;

            case '4'://listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '6'://Borrar
                const id= await listadoTareasBorrar(tareas.listadoArray);
                if(id !== 0){
                     //Preguntar si estas seguro
                    const ok= await confirmar('¿Estas seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }

            default:
                break;
        }

        guardarDB(tareas.listadoArray);

        if(opt !== '0') await pausa();
        
    } while (opt !== '0');
}

main();