const Tarea= require('./tarea');

class Tareas {
    _listado= {};

    constructor(){
        this._listado= {};
    }

    crearTarea(desc= ''){
        const tarea= new Tarea(desc);

        this._listado[tarea.id]= tarea;//AUnque _listado es un objeto, podemos usar [] para referirnos o crear alguna prorpiedad del objeto
    }
    
}

module.exports= Tareas;