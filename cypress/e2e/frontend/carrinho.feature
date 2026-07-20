# language: pt

Funcionalidade: Carrinho de compras no frontend
  Como usuário autenticado
  Quero adicionar produtos à lista de compras
  Para montar meu carrinho na loja virtual

  Cenário: Adicionar produto disponível ao carrinho
    Dado que estou logado como usuário comum
    E estou na página home
    Quando adiciono o primeiro produto da lista ao carrinho
    Então devo ser redirecionado para a lista de compras
