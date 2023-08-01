# Empreendimentos

![empreendimentos](/public/assets/home-screenshot.png)

A aplicação tem o objetivo de exibir uma lista de empreendimentos onde também é possível criar, atualizar e deletar os itens da lista.

Os dados são servidos pelo [json-server](https://github.com/typicode/json-server), por isso é necessário rodar localmente para visualizar os dados e realizar as operações.

A aplicação conta também com consulta à API [ViaCep](https://viacep.com.br/), para checagem de endereço via CEP.

## Tecnologias

- NextJS + Typescript
- Styled Components

## Como Rodar

Instale as dependências

```bash
npm install
```

com o arquivo `enterprises-server.json` na raiz do projeto, é só rodar o comando pra iniciar o servidor:

```bash
npm run server
```

o servidor estará rodando em http://localhost:3001

Após isso:

```bash
npm run dev
```

Pronto, a aplicação deve estar funcionando.
