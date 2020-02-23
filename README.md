# Desafio Proposto pela Linx Impulse

## Sumário
### [1. Intrudução](#intro)
### [2. Banco de Dados](#db)
### [3. API de Catálogo](#catalogo)
### [4. API de Microsserviço](#service)
### [5. API de Recomendação](#remmendation)
### [6. Realtime](#realtime)

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

A porta usada foi a 3307

**ATENÇÃO:**

Antes de "subir" o container do banco dados faz-se necessário criar uma rede virtual usando o docker utilizando o seguinte comando

    docker network create -d bridge linx-network

## 3 <a name="catalogo"> API de Catálogo

Esta api na porta 4000

A api de catálogo é composta das seguintes rotas:

* / -> Onde tem as boas vindas da api
* /api/product -> Onde tem as boas vindas do endpoint produtos
* /api/product/ -> Com o verbo post, é a opção para inserção de produto no bandos o seguintes objeto

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

* <a name="endpoint"> /api/product/recommended -> post -> é a opção para adicionar na api microserviço a lista de recomendações. Para adicionar é preciso enviar o seguinte objeto

        {
            "weight": 2.001,
            "type": "price", //price para produtos que baixaram ou most para mais popular
            "id": 990458 // codigo do produto
        }
Ao executar esta ação a api irá adicionar um item no arquivo json conforme o tipo informado no atributo type na api de microsserviço   

* /api/product/all -> Lista todos os produtos
* /api/product/v1/12347 - (complete) O numero é codigo do produto a ser informado, este endoint traz o produto selecionado com todos os campos do banco de dados
* /api/product/v2/123 -> (compact) O numero é codigo do produto a ser informado, este endoint traz apenas os campos name, price, status e categories;
* /api/product/import -> importa produtos do arquivos json. Como o arquivo enviado estava dando problema, foi necessário criar outro com algumas centenas de itens, chama-se `object1.json`([Clique aqui](https://raw.githubusercontent.com/cbcarlos07/linx-project/master/api-catalog/src/data/object1.json) para visualizá-lo )


## 4 <a name="service"> API de Microsserviço de Recomendação

Esta api na porta 4001

A api de catálogo é composta das seguintes rotas:

* /api/ranking -> Traz todas as recomendações organizada por `mostpopular` e `pricereduction`. Este endpoint busca dos respectivos arquivos em json e monta um retorno para a api de recomendação consultar os dados. 
Este endpoint também se comunica com a api de catálogo para trazer os nomes do respectivos produtos salvos no arquivos json

## 5 <a name="recommendation"> API de Recomendação

Esta api na porta 4002

A api de catálogo é composta das seguintes rotas:

* /api/ranking/maxproducts/9 -> Onde o numero 9 é o número de itens que eu quero que retorne, caso seja menor que 10 o número será ignorado e a api trará 10 resultados

* /api/ranking/vitrine -> Carrega os ultimos 16 registros atualizados na api de microsserviço 

## 6 <a name="realtime"> Realtime


A página frontend está sincronizada com a **API de Recomendação**.

Quando um item é adicionado na [API de Catálogo](#endpoint) no endpoint : `/api/product/recommended`, esse sinal percorre todas as apis até chegar no frontend e automaticamente atualiza a lista de produtos da vitrine

![Image description](https://github.com/cbcarlos07/linx-project/blob/master/frontend/teste8.gif)



    
