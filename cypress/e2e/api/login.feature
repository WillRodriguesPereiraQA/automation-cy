# language: pt

Funcionalidade: Autenticação via API
  Como consumidor da API ServeRest
  Quero autenticar usuários
  Para validar as regras do endpoint de login

  Cenário: Realizar login com credenciais válidas
    Dado que possuo um usuário cadastrado via API
    Quando envio uma requisição POST para "/login" com as credenciais do usuário
    Então a resposta da API deve retornar status 200
    E a mensagem deve ser "Login realizado com sucesso"
    E o corpo da resposta deve conter um token "authorization"

  Cenário: Tentar login com senha incorreta
    Dado que possuo um usuário cadastrado via API
    Quando envio uma requisição POST para "/login" com senha incorreta
    Então a resposta da API deve retornar status 401
    E a mensagem deve ser "Email e/ou senha inválidos"

  Esquema do Cenário: Tentar login com credenciais inválidas
    Quando envio uma requisição POST para "/login" com email "<email>" e senha "<senha>"
    Então a resposta da API deve retornar status <status>
    E a resposta deve conter a mensagem "<mensagem>"

    Exemplos:
      | email                          | senha           | status | mensagem                          |
      | usuario.inexistente@teste.com  | senhaErrada123  | 401    | Email e/ou senha inválidos        |
      | invalid-email@test             | 123456          | 400    | Email deve ser um email válido    |
