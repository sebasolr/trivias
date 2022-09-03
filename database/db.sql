CREATE database trivias;

use trivias;
--tabala de usaruios
CREATE TABLE usuarios(
    id serial not null auto_increment primary key,
    firstname varchar(16) not null,
    lastname varchar(60) not null,
    email varchar(255) not null,
    username varchar(255) not null,
    password varchar(255) not null
);  

alter table usuarios 
modify aqui va el codigo;

--tabla de preguntas
CREATE TABLE preguntas(
    id serial not null auto_increment primary key,
    pregunta varchar(255) not null default,
    respuesta_correcta varchar(255) not null,
    pregunta_incorrecta1 varchar(255) not null,
    pregunta_incorrecta2 varchar(255) not null,
    pregunta_incorrecta3 varchar(255) not null,
);

--relacion entre tablas 
CREATE TABLE resultados (
    puntaje int not null,
    usuario_id int not null,
    prgunta_id int not null
);


