//const axios = require('axios')
/*const fs = require('fs')
const diacritics = require('diacritics')
const textoEntrada = fs.readFileSync('entrada.txt', 'utf-8')
console.log("Texto original: ",textoEntrada)
const textoSalida = textoEntrada.toLowerCase()
console.log("Texto modificado: ",textoSalida)
const textoNormalizado = diacritics.remove(textoSalida)
console.log("Texto sin acentos y en minúsculas ",textoNormalizado)
fs.writeFileSync('salida.txt', textoNormalizado)
console.log("El texto modificado se ha guardado en salida.txt")*/

/*const fs = require('fs');
const diacritics = require('diacritics');
const axios = require('axios'); // Nueva importación

// Función principal asíncrona
async function procesarTexto() {
    try {
        // 1. Leer y normalizar el texto (lógica que ya tenías)
        const textoEntrada = fs.readFileSync('entrada.txt', 'utf8');
        const textoNormalizado = diacritics.remove(textoEntrada.toLowerCase());
        console.log('Texto normalizado:',textoNormalizado);
        // 2. Preparar los datos para enviar a la API
        const datosParaAPI =
        {
            title:'Texto desde script Node.js',
            body:textoNormalizado,
            userId:1,
            // Un dato de ejemplo

        };
        // 3. Realizar la petición HTTP POST a una API de prueba
        console.log('\nEnviando texto a la API de prueba...');
        const respuestaAPI = await axios.post('https://jsonplaceholder.typicode.com/posts',datosParaAPI);
        // 4. Mostrar la respuesta de la API en la consola
        console.log('¡Respuesta recibida de la API!');
        console.log('Status:',respuestaAPI.status);
        console.log('Datos devueltos:',respuestaAPI.data);

    } catch (error) {
        console.error('Ha ocurrido un error:', error.message);
    }
}

// Ejecutar la función principal
procesarTexto();*/
const fs = require('fs'); 
const axios = require('axios'); // Ya lo teníamos instalado
 
// La dirección de nuestra API de Ollama local 
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
 
// Función principal asíncrona 
async function generarTexto() {
    try {
        // 1. Leer el archivo de entrada (nuestro prompt)
        const promptTexto = fs.readFileSync('entrada.txt', 'utf-8');
        console.log(`Enviando prompt: "${promptTexto}"`);

        // 2. Preparar el cuerpo (payload) para la API de Ollama
        const datosParaAPI = {
            model: "mistral", // El modelo que descargamos
            prompt: promptTexto, // El texto de nuestro archivo
            stream: false // Importante: le pedimos la respuesta completa, no en trozos
        };

        // 3. Realizar la petición HTTP POST con axios
        console.log('Esperando respuesta de Ollama (esto puede tardar)...');
        const respuestaAPI = await axios.post(OLLAMA_API_URL, datosParaAPI);

        // 4. Extraer y guardar la respuesta
        const respuestaTexto = respuestaAPI.data.response;
        fs.writeFileSync('salida.txt', respuestaTexto);
 
        console.log(' ¡Éxito! Respuesta guardada en "salida.txt"');
        console.log('Respuesta:', respuestaTexto);

    } catch (error) {
        console.error(' Ha ocurrido un error:');
        if (error.code === 'ECONNREFUSED') {
            console.error('Error: No se pudo conectar. ¿Está Ollama corriendo?');
        } else {
            console.error(error.message);
        }
    }
}
 
// Ejecutar la función principal
generarTexto();
