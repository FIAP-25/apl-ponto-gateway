# apl-back-fiap

Repositório da aplicação back-end.

## Instalação

Para rodar a aplicação siga as etapas abaixo:

Clone o projeto

```bash
  git clone https://github.com/FIAP-25/apl-back-fiap.git
```

Instale a versão do Node:

```bash
  Node 18.16.0
```

Instale as dependências:

```bash
  npm install
```

Para subir os containers do docker, rode o comando:

```bash
  npm run docker
```

Isso, irá subir dois containers, um com a aplicação Node, mapeada na porta 3000 e o outro container MYSQL mapeado na porta 3306.

O swagger da aplicação pode ser visualizado pelo endereço:

```bash
  http://localhost:3000/
```

As collections de exemplo, podem ser visualizadas pelo postman:

```bash
  https://www.postman.com/crimson-trinity-772896/workspace/fiap/documentation/28408712-7c8d89db-fa3c-4998-86f2-6c49c0fcb2bf
```

O Miro com a linguagem ubíqua + event storming pode ser acessado pelo link:

```bash
  https://miro.com/app/board/uXjVMK9Y4Zw=/
```

## Variáveis de Ambiente

Caso queria rodar o projeto localmente, você vai precisar configurar as váriaveis de ambiente no arquivo .env

`PORT=4000`

`DATABASE_HOST=127.0.0.1`

`DATABASE_PORT=3306`

`DATABASE_USERNAME=`

`DATABASE_PASSWORD=`

`DATABASE_SCHEMA=fiap`

## Diagrama de Entidades e Relacionamentos - MYSQL

![diagrama_mysql](https://github.com/FIAP-25/apl-back-fiap/assets/39955568/993dd91f-cb1b-4168-b0b9-b12ea77bcdea)

## Autores

-   Eduardo Vinicius Rodrigues Lima - RM430119
-   Leonardo Covelo da Paz - RM350311
-   Luik de Castro da Silva - RM348546
-   Ricardo Souza Reis - RM348610
