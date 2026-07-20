# language: pt

Funcionalidade: Produtos via API
  Como consumidor da API ServeRest
  Quero gerenciar produtos
  Para validar as regras de negócio do endpoint de produtos

  Cenário: Cadastrar produto como administrador autenticado
    Dado que possuo um usuário administrador autenticado via API
    E possuo os dados de um produto válido
    Quando envio uma requisição POST para "/produtos" autenticada
    Então a resposta da API deve retornar status 201
    E a mensagem deve ser "Cadastro realizado com sucesso"
    E o corpo da resposta deve conter um identificador "_id"

  Cenário: Tentar cadastrar produto com dados inválidos
    Dado que possuo um usuário administrador autenticado via API
    E possuo os dados de um produto inválido
    Quando envio uma requisição POST para "/produtos" autenticada
    Então a resposta da API deve retornar status 400
    E a resposta deve conter a mensagem "nome não pode ficar em branco"
    E a resposta deve conter a mensagem "preco deve ser um número positivo"
    E a resposta deve conter a mensagem "descricao não pode ficar em branco"
