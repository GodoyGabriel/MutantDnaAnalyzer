# X-Men Api - Analizador de ADN mutante
API en Heroku = https://mutant-dna-anayzer.herokuapp.com

Endpoints validos
#### [/mutant](https://mutant-dna-anayzer.herokuapp.com/mutant)
* Metodo: POST 
* Objetivo: Validar la matriz ingresada por body, la cual si es valida se procederá a insertarla en la Base de Datos. Si es Mutante devolverá HTTP 200-OK, caso contrario 403-Forbidden.
* Premisas: La matriz ingresada por body tendrá que ser cuadrada, Las letras de los Strings solo pueden ser (A,T,C,G) las cuales representa cada base nitrogenada del ADN. Es mutante, si se encuentra más de una secuencia de cuatro letras iguales, de forma oblicua, horizontal o vertical.
* Ejemplo de Body de Entrada:
{ "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

#### [/stats](https://mutant-dna-anayzer.herokuapp.com/stats)
* Metodo: GET
* Objetivo: Devolver la cantidad de humanos y cantidad de mutantes, como tambien el ratio entre estas cantidades.
* Ejemplo de Body de Salida: { "count_mutant_dna":40, "count_human_dna":100, "ratio":0.4}
### Pruebas Locales
* Base de Datos: La base de datos esta desplegada en cloud.mongodb.com , consultar por las variables de entorno.
* Iniciar API: Ejecutar el comando "npm install" en el directorio del mismo para poder instalar todas las dependencias del proyecto, luego ejecutar "npm start" para iniciarlo.
* Tests: Ejecutar el comando "npm test" o "mocha" para que inicien los tests.
