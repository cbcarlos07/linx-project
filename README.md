# Desafio Proposto pela Linx Impulse

## Sumário
### [1. Intrudução](#intro)
### [2. Banco de Dados](#db)

## 1. <a name="intro"> Introdução
Este foi um desafio proposto pela empresa Linx Impulse para desenvolve um projeto onde tenha apis e frontends 

Algumas das apis foram criadas usando container do docker-compose

Eis o conteúdo do desafio

* db_product
* api_catalog
* api_service
* api_recommendation
* frontend

OBSERVAÇÃO

Este projeto funcionou em container usando docker-compose com sucesso no Sistema Operacional MAC OS 10, mas no Sistema Linux Mint (Cinamon 19.3) tivemos problemas ao testar, sendo necessário executar através do host da máquina

## 2. <a name="db"> Banco de Dados

O projeto foi desenvolvido utilizando o Banco de Dados MYSQL versão no docker-compose

ATENÇÃO:

Antes de "subir" o container do banco dados faz-se necessário criar uma rede virtual usando o docker utilizando o seguinte comando

    docker network create -d bridge linx-network






    
