# API de Microsserviço

## Algumas Instruções Básicas

Antes de executar é necessário executar o comando no terminal da pasta raiz deste projeto

        npm i

        ou

        npm install

É necessário criar o arquivo .env. Ao ao criar o arquivo pode-se copiar o conteúdo do arquivo .env.example

Caso a aplicação seja executada do host da máquina 

        SERVER_PORT=4001
        SERVER_HOST=0.0.0.0
        SERVER_API=localhost

Caso a aplicação esteja sendo executada dentro de um container a variável `SERVER_API` deverá ser alterada para 

        SERVER_API=api_catalog

Que é o container da API de Catálogo