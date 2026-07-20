# language: pt

Funcionalidade: Cadastro de usuários via API
  Como consumidor da API ServeRest
  Quero gerenciar usuários
  Para validar as regras de negócio do endpoint de usuários

  Esquema do Cenário: Validar cadastro de usuários com diferentes combinações de dados
    Dado que possuo os dados do usuário "<nome>" com email "<email>"
    Quando envio uma requisição POST para "/usuarios"
    Então a resposta da API deve retornar status <status>
    E a resposta deve conter a mensagem "<mensagem>"

    Exemplos:
      | nome       | email                    | status | mensagem                          |
      | Usuario QA | usuario.valido@teste.com | 201    | Cadastro realizado com sucesso    |
      |            | email-invalido           | 400    | nome não pode ficar em branco     |
