# challengeMeli

API en Heroku = 

Endpoints validos
/mutant
Metodo: POST 
Objetivo: Validar la matriz ingresada por body, la cual si es valida se procederá a insertarla en la Base de Datos. Si es Mutante devolverá HTTP 200-OK, caso contrario 403-Forbidden.
Premisas: La matriz ingresada por body tendrá que ser cuadrada, Las letras de los Strings solo pueden ser (A,T,C,G) las cuales representa cada base nitrogenada del ADN. Es mutante, si se encuentra más de una secuencia de cuatro letras iguales, de forma oblicua, horizontal o vertical.
Ejemplo de Body de Entrada:
{ "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

/stats
Metodo: GET
Objetivo: Devolver la cantidad de humanos y cantidad de mutantes, como tambien el ratio entre estas cantidades.
Ejemplo de Body de Salida: { "count_mutant_dna":40, "count_human_dna":100, "ratio":0.4}

/swagger-ui.html
Objetivo: Documentación Online API Rest
Pruebas Locales
Base de Datos: Para poder utilizar la API de manera local se deberá montar la misma, ejecutando el script "DB_xmen_human.sql" ubicado en el repo (repo-xmen/api-xmen/DB_xmen_human.sql), tener en cuenta que dentro del proyecto de la API, se debera configurar el database.properties ubicado en la carpeta "src/main/resources", especialmente los atributos url_development, username_development y password_development para que funcione en MySQL. A tener en cuenta, estos 3 atributos estan encriptados y podrá ser de ayuda el test "EncrypterTest".
Iniciar API: Ejecutar el comando "npm install" en el directorio del mismo para poder instalar todas las dependencias del proyecto, luego ejecutar "npm start" para iniciarlo.
Tests: Ejecutar el comando "mocha" para que inicien los tests.