# language: pt

Funcionalidade: Login no frontend
  Como usuário cadastrado
  Quero autenticar na plataforma
  Para acessar a área logada da loja virtual

  Cenário: Tentar login com senha incorreta
    Dado que existe um usuário cadastrado via API
    E estou na página de login
    Quando informo as credenciais inválidas do usuário cadastrado
    Então devo visualizar a mensagem de erro "Email e/ou senha inválidos"

  Esquema do Cenário: Tentar login com credenciais inválidas
    Dado que estou na página de login
    Quando informo email "<email>" e senha "<senha>"
    Então devo visualizar a mensagem de erro "<mensagem>"

    Exemplos:
      | email                          | senha           | mensagem                          |
      | usuario.inexistente@teste.com  | senhaErrada123  | Email e/ou senha inválidos        |
      | invalid-email@test             | 123456          | Email deve ser um email válido    |
