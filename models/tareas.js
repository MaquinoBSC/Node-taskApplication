const colors= require('colors');
const Tarea= require('./tarea');


//clase que envuelve la estructura de la clase tarea
//Por medio de esta clase podremos crear tareas, listar tareas,
class Tareas {
    _listado= {};

    get listadoArray(){
        const listado= [];
        
        //Object.keys regresa un array
        Object.keys(this._listado).forEach((key)=> {
            listado.push(this._listado[key]);
        })

        return listado;
    }

    constructor(){
        this._listado= {};
    }

    //Funcion que recibe las tareas que fueron cargadas de la DB y las carga a la aplicacion
    cargarTareas(tareas= []){
        tareas.forEach((tarea)=> {
            this._listado[tarea.id]= tarea;
        })
    }

    crearTarea(desc= ''){
        const tarea= new Tarea(desc);

        this._listado[tarea.id]= tarea;//AUnque _listado es un objeto, podemos usar [] para referirnos o crear alguna prorpiedad del objeto
    }

    listadoCompleto(){
        let lista_tareas= [];
        Object.keys(this._listado).forEach((key)=> {
            lista_tareas.push(this._listado[key]);
        });

        console.log('/n');
        lista_tareas.forEach((tarea, index)=> {
            let status= tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${colors.green(index+1)}${'.'.green} ${tarea.desc.green} :: ${status}`);
        })
    }

    listarPendientesCompletadas(completadas= true){
        let lista_tares= [];
        Object.keys(this._listado).forEach((key)=> {
            lista_tares.push(this._listado[key]);
        });

        let contador= 0;
        console.log('\n');
        lista_tares.forEach((tarea)=> {
            if(completadas){
                if(tarea.completadoEn){
                    contador++;
                    const desc= tarea.desc;
                    const status= 'Completada'.green;

                    console.log(`${contador.toString().green + '.'.green} ${desc} :: ${status}`);
                }
            }
            else{
                if(!tarea.completadoEn){
                    contador++;
                    const desc= tarea.desc;
                    const status= 'Pendiente'.red;

                    console.log(`${contador.toString().green + '.'.green} ${desc} :: ${status}`);
                }
            }
        });
    }

    borrarTarea(id= ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
}

module.exports= Tareas;