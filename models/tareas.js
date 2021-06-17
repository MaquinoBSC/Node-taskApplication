const Tarea= require('./tarea');

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

    crearTarea(desc= ''){
        const tarea= new Tarea(desc);

        this._listado[tarea.id]= tarea;//AUnque _listado es un objeto, podemos usar [] para referirnos o crear alguna prorpiedad del objeto
    }

}

module.exports= Tareas;