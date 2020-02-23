# Desafio Proposto pela Linx Impulse

## <a name="sumario">Sumário
### [1. Intrudução](#intro)
### [2. Banco de Dados](#db)
### [3. API de Catálogo](#catalogo)
### [4. API de Microsserviço](#service)
### [5. API de Recomendação](#remmendation)
### [6. Realtime](#realtime)
### [7. Conclusão](#finished)


## 1. <a name="intro"> Introdução
Este foi um desafio proposto pela empresa **Linx Impulse** para desenvolver um projeto onde tenha apis e frontends 

Algumas das apis foram criadas usando container do docker-compose

Eis o conteúdo do desafio:

* db_product
* api_catalog
* api_service
* api_recommendation
* frontend

**OBSERVAÇÃO**

Este projeto funcionou em container usando docker-compose com sucesso no Sistema Operacional MAC OS 10, mas no Sistema Linux Mint (Cinamon 19.3) tivemos problemas ao testar, sendo necessário executar através do host da máquina

[Voltar ao início](#sumario)

## 2. <a name="db"> Banco de Dados

O projeto foi desenvolvido utilizando o Banco de Dados MYSQL versão no docker-compose

A porta usada foi a 3307

O banco de dados usado foi o `linx`

        CREATE DATABASE linx

**ATENÇÃO!!**

Antes de "subir" o container do banco dados faz-se necessário criar uma rede virtual usando o docker utilizando o seguinte comando

    docker network create -d bridge linx-network


[Voltar ao início](#sumario)


## 3 <a name="catalogo"> API de Catálogo

Esta api na porta 4000.

A api de catálogo é composta das seguintes rotas:

* / -> Onde tem as boas vindas da api
* /api/product -> (get)Onde tem as boas vindas do endpoint produtos
* /api/product/ -> (post), é a opção para inserção de produto no bandos o seguintes objeto

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

* <a name="endpoint"> /api/product/recommended -> (post) é a opção para adicionar na api microsserviço a lista de recomendações. Para adicionar é preciso enviar o seguinte objeto

        {
            "weight": 2.001,
            "type": "price", //price para produtos que baixaram ou most para mais popular
            "id": 990458 // codigo do produto
        }
Ao executar esta ação a api irá adicionar um item no arquivo json conforme o tipo informado no atributo type na api de microsserviço   

* /api/product/all -> (get) Lista todos os produtos
* /api/product/v1/12347 -> (get) (complete) O numero é codigo do produto a ser informado, este endoint traz o produto selecionado com todos os campos do banco de dados
* /api/product/v2/123 -> (get) (compact) O numero é codigo do produto a ser informado, este endoint traz apenas os campos name, price, status e categories;
* /api/product/import -> (get) importa produtos do arquivos json. Como o arquivo enviado estava dando problema, foi necessário criar outro com algumas centenas de itens, chama-se `object1.json`([Clique aqui](https://raw.githubusercontent.com/cbcarlos07/linx-project/master/api-catalog/src/data/object1.json) para visualizá-lo )

[Voltar ao início](#sumario)

## 4 <a name="service"> API de Microsserviço de Recomendação

Esta api na porta 4001

A api de catálogo é composta das seguintes rotas:

* /api/ranking -> (get) Traz todas as recomendações organizada por `mostpopular` e `pricereduction`. Este endpoint busca dos respectivos arquivos em json e monta um retorno para a api de recomendação consultar os dados. 
Este endpoint também se comunica com a api de catálogo para trazer os nomes do respectivos produtos salvos no arquivos json

[Voltar ao início](#sumario)

## 5 <a name="recommendation"> API de Recomendação

Esta api na porta 4002

A api de catálogo é composta das seguintes rotas:

* /api/ranking/maxproducts/9 -> (get) Onde o numero 9 é o número de itens que eu quero que retorne, caso seja menor que 10 o número será ignorado e a api trará 10 resultados

* /api/ranking/vitrine -> Carrega os ultimos 16 registros atualizados na api de microsserviço 

## 6 <a name="realtime"> Realtime


A página frontend está sincronizada com a **API de Recomendação**.

Quando um item é adicionado na [API de Catálogo](#endpoint) no endpoint : `/api/product/recommended`, esse sinal percorre todas as apis até chegar no frontend e automaticamente atualiza a lista de produtos da vitrine, comendaçando pela API de Catálogo, Salvando no JSON da API de Microsserviço, enviando para API de Recomendação que entrega para o front end, conforme imagem abaixo:

![Image description](https://github.com/cbcarlos07/linx-project/blob/master/frontend/teste8.gif)

[Voltar ao início](#sumario)

## 7 <a name="teste">Teste Unitários

A **API de Produtos** possui testes unitários

**ATENÇÃO**

O teste unitário remove todos os dados da base de dados e adiciona apenas um para testes, certifique-se de testar em banco de dados de homologação (de teste)

Para executar o teste unitário é necessário acessar a pasta do projeto chamada `api-catalog` e executar o seguinte comando
    
        npm test

A API irá testar a listagem dos produtos e a busca de um único produto pelo código

[Voltar ao início](#sumario)

## 8. <a name="finished">Conclusão

Algumas coisas não foram implementadas, como testes de redes, mas é mais um motivo para dar uma pesquisada de como implementar tal recurso.

No geral fizemos o possível para entregar um produto o mais fiel possível ao que foi solicitado


[Voltar ao início](#sumario)


    
