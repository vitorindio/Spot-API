# Spot-API

## Siga estes 3 passos para rodar o projeto localmente:

1. Instale as dependências do projeto:
   ```sh
   npm install
   ```

1. Utilize o arquivo [`.env.example`](/.env.example) para criar seu próprio [`.env`](/.env) e defina as variáveis de **MYSQL** e de **SMTP**.

1. Crie o banco de dados e as tabelas:
   ```sh
   node ace migration:run
   ```

1. Insira os dois primeiros usuários:
   ```sh
   node ace db:seed
   ```

1. Execute o projeto:
   ```sh
   node ace serve --watch
   ```
