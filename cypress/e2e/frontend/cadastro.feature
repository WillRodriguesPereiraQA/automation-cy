# language: pt

Funcionalidade: Cadastro de usuário no frontend
  Como visitante da loja virtual
  Quero me cadastrar na plataforma
  Para acessar a área logada e utilizar os recursos da aplicação

  Cenário: Cadastrar usuário com dados válidos
    Dado que estou na página de cadastro de usuários
    Quando preencho o formulário com um usuário válido
    Então devo visualizar a mensagem "Cadastro realizado com sucesso"
    E devo ser redirecionado para a home logado
