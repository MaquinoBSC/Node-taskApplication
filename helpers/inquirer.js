const inquirer= require('inquirer');
require('colors');

//Esta constante almacena el menu que vamos a mostrar en nuestra aplicacion
const preguntas= [
    {
        type: 'list',
        name: "opcion",
        message: 'Que deseas hacer?',
        choices: [
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
            type: 'input',
            name: 'pausa',
            message: `Presiona ${'ENTER'.green} para continuar`,
        }
    ])
}

//funcion que lee el dato que ingresa el usuario en la aplicacion
const leerInput= async(message)=> {
    const question= {
        type: 'input',
        name: 'desc',
        message,
        validate(value){//Validar los datos que se ingresan por consola
            if(value.length === 0){
                return "Ingrese un valor";//Retorno un mensaje de error
            }
            return true;//Si regreso el true significa que la validacion fue aprobada
        }
    };

    const {desc}= await inquirer.prompt(question);
    return desc;
}

module.exports= {
    inquirerMenu,
    pausa,
    leerInput,
}
