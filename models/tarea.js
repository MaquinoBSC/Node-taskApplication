const { v4 : uuidv4 }= require('uuid');

//clase que genera la estructura de una tarea
class Tarea {
    id= '';
    desc= '';
    completadoEn= null;

    constructor(desc){
        this.id= uuidv4();
        this.desc= desc;
        this.completadoEn= null;
    }
}

module.exports= Tarea;