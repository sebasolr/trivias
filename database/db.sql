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
    question varchar(255) not null,
    answer_correct varchar(255) not null,
    answer_incorrect_one varchar(255) not null,
    answer_incorrect_two varchar(255) not null,
    answer_incorrect_three varchar(255) not null
);

--relacion entre tablas 
CREATE TABLE resultados (
    puntaje int not null,
    usuario_id int not null,
    prgunta_id int not null
);


