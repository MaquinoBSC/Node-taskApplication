require('colors');

const mostrarMenu = async() =>{
    return new Promise((resolve, reject)=> {
        console.clear();

        console.log("===========================".green);
        console.log("   Seleccione una opcion   ".green);
        console.log("===========================\n".green);

        console.log(`${'1'.green}. Crear tarea`);
        console.log(`${'2'.green}. Listar tareas`);
        console.log(`${'3'.green}. Listar tareas completadas`);
        console.log(`${'4'.green}. Listas tareas pendientes`);
        console.log(`${'5'.green}. Completar tarea(s)`);
        console.log(`${'6'.green}. Borrar tarea`);
        console.log(`${'0'.green}. Salir\n`);

        const readLine= require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Seleccion una opcion: ', (opt)=> {
            readLine.close();
            resolve(opt);
        });
    });
}

const pausa= ()=> {
    return new Promise((resolve, reject)=> {
        const readLine= require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPresiona ${'ENTER'.green} para continuar \n` , (opt)=> {
            readLine.close();
            resolve();
        });
    });
}

module.exports= {
    mostrarMenu,
    pausa
}