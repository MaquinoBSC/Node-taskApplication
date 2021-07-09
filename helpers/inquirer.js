const inquirer= require('inquirer');
require('colors');

//Esta constante almacena el menu que vamos a mostrar en nuestra aplicacion
const preguntas= [
    {
        type: 'list',//list muestra una lista
        name: "opcion",//manera en la que identificamos el dato seleccionado de la lista
        message: 'Que deseas hacer?',
        choices: [//Debido a que el tipo es una lista, choices son las opciones que se muestran
            {
                value: '1',
                name: `${'1.'.red} Crear tarea`,
            },
            {
                value: '2',
                name: `${'2.'.red} Listar tareas`,
            },
            {
                value: '3',
                name: `${'3.'.red} Listar tareas completadas`,
            },
            {
                value: '4',
                name: `${'4.'.red} Listar tareas pendientes`,
            },
            {
                value: '5',
                name: `${'5.'.red} Completar tarea(s)`,
            },
            {
                value: '6',
                name: `${'6.'.red} Borrar tarea`,
            },
            {
                value: '0',
                name: `${'0.'.red} Salir`,
            },
        ],
    }
]

//funcion que mostrara el menu utilizando inquirer
const inquirerMenu= async ()=> {
    console.clear();

    console.log("===========================".green);
    console.log("   Seleccione una opcion   ".green);
    console.log("===========================\n".green);

    //Aqui asignamos nuestra constante que muestra el menu
    const {opcion}= await inquirer.prompt(preguntas);//inquirer devuelve un objeto, por eso se hace destructuring

    return opcion;
}

//funcion que hace una pausa en la aplicacion, el usuario debe presionar un atecla para seguir con la ejecucion
const pausa= async()=> {
    console.log('\n');

    const {opcion}= await inquirer.prompt([
        {
            type: 'input',//input es una entrada de al gun dato
            name: 'pausa',//manera en la que identificamos la entrada de dicho dato
            message: `Presiona ${'ENTER'.green} para continuar`,//Mensaje que se muestra esperando a que se ingrese el dato
        }
    ])
}

//funcion que lee el dato que ingresa el usuario en la aplicacion
const leerInput= async(message)=> {
    const question= {
        type: 'input',
        name: 'desc',//nombre con el que identificamos y se guarda el dato ingresado
        message,
        validate(value){//Validar los datos que se ingresan por consola
            if(value.length === 0){
                return "Ingrese un valor";//Retorno un mensaje de error
            }
            return true;//Si regreso el true significa que la validacion fue aprobada
        }
    };

    //debido a que desc es la manera en la que identificamos el dato ingresado, hacemos su debida destructuracion
    const {desc}= await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar= async(tareas= [])=> {
    //Vamos a generar una lista dinamica con las tareas que estan actualemnet en la base de datos
    const choices= tareas.map((tarea, index)=> {
        const idx= `${index + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
        }
    });
    //Unshift es un metodo para ingresar elementos a un array en la primer posicion
    choices.unshift({
        value: 0,
        name: '0.'.green + 'Cancelar'
    })

    const preguntas= [
        {
            type: 'list',
            name: 'id',//Nombre con el identificaremos el dato que el usuario ha ingresado
            message: 'Borrar',
            choices: choices,
        }
    ]
    const {id}= await inquirer.prompt(preguntas);
    return id;
}

 const confirmar= async(message)=> {
    const question= {
        type: 'confirm',//confirmar una accion
        name: 'ok',
        message: message
    }

    //Ok sera un dato de tipo booleano ya que confirmo asi funciona
    const {ok}= await inquirer.prompt(question);
    return ok;
 }

 const mostrarListadoCheckList= async(tareas= [])=> {
    //Vamos a generar una lista dinamica con las tareas que estan actualemnet en la base de datos
    const choices= tareas.map((tarea, index)=> {
        const idx= `${index + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false,
            //dado que esta funcion mostrara una lista para poder seleccionar o deseleccionar, checked es el status de la tarea en la lista
        }
    });

    const preguntas= [
        {
            type: 'checkbox',
            name: 'ids',//Nombre con el identificaremos el dato que el usuario ha ingresado
            message: 'Seleccione',
            choices: choices,
        }
    ]
    const {ids}= await inquirer.prompt(preguntas);
    return ids;
}

module.exports= {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
}
