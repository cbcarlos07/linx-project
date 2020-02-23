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

**OBSERVAÇÃO**

Este projeto funcionou em container usando docker-compose com sucesso no Sistema Operacional MAC OS 10, mas no Sistema Linux Mint (Cinamon 19.3) tivemos problemas ao testar, sendo necessário executar através do host da máquina

## 2. <a name="db"> Banco de Dados

O projeto foi desenvolvido utilizando o Banco de Dados MYSQL versão no docker-compose

**ATENÇÃO:**

Antes de "subir" o container do banco dados faz-se necessário criar uma rede virtual usando o docker utilizando o seguinte comando

    docker network create -d bridge linx-network

## API de Catálogo

A api de catálogo é composta das seguintes rotas:

    / -> Onde tem as boas vindas da api
    /api/product -> Onde tem as boas vindas do endpoint produtos
    /api/product/ -> Com o verbo post, é a opção para inserção de produto no bandos o seguintes objeto

        {
            sku: codigo,
            name: nome do produto,
            price: preco,
            oldprice: preco antigo,
            count: parcelas,
            countprice: preco da parcela,
            image1: url da imagem,
            status: status do produto,
            categories: categoria do produtoi
        }

    /api/product/recommended -> post -> é a opção para adicionar na api microserviço a lista de recomendações. Para adicionar é preciso enviar o seguinte objeto

    {
        "weight": 2.001,
        "type": "price", //price para produtos que baixaram ou most para mais popular
        "id": 990458 // codigo do produto
    }

    /api/product/all -> Lista todos os produtos
    /api/product/v1/12347 - (complete) O numero é codigo do produto a ser informado, este endoint traz o produto selecionado com todos os campos do banco de dados
    /api/product/v2/123 -> (compact) O numero é codigo do produto a ser informado, este endoint traz apenas os campos name, price, status e categories;
    /api/product/import -> importa produtos do arquivos json. Como o arquivo enviado estava dando problema, foi necessário criar outro com algumas centenas de itens, chama-se object1.json [clique aqui][#link] para visualizá-lo







    
