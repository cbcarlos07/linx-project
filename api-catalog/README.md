# API de Catálogo

## Algumas Instruções Básicas

Antes de executar é necessário executar o comando no terminal da pasta raiz deste projeto

        npm i

        ou

        npm install

É necessário criar o arquivo .env. Ao ao criar o arquivo pode-se copiar o conteúdo do arquivo .env.example

Caso a aplicação seja executada do host da máquina 

        DB_HOST=localhost
        DB_USER=root
        DB_DATABASE=linx
        DB_USER=root
        DB_PWD=password
        DB_PORT=3007
        SERVER_PORT=4000
        SERVER_HOST=0.0.0.0

Caso a aplicação esteja sendo executada dentro de um container a variável `DB_HOST` deverá ser alterada para 

        DB_HOST=db_products

Que é o container da base de dados