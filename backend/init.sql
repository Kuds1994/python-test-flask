CREATE DATABASE IF NOT EXISTS teste;
use teste;

CREATE TABLE `todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(30) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `data_inicio` timestamp not null,
  `feito` tinyint(1) not null,
  `data_termino` timestamp not null,
  PRIMARY KEY (`id`)
);
