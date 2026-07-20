# language: pt

Funcionalidade: Pesquisa de produtos na home
  Como usuário autenticado
  Quero pesquisar produtos na home
  Para encontrar itens específicos na loja virtual

  Cenário: Pesquisar produto existente por nome completo
    Dado que estou logado como usuário comum
    E estou na página home
    Quando pesquiso pelo produto "Logitech MX Vertical"
    Então devo visualizar 1 produto(s) na listagem
    E o produto exibido deve conter o nome "Logitech MX Vertical"
    E o produto "Samsung 60 polegadas" não deve ser exibido

  Esquema do Cenário: Pesquisar produtos com diferentes termos
    Dado que estou logado como usuário comum
    E estou na página home
    Quando pesquiso pelo produto "<termo>"
    Então devo visualizar <quantidade> produto(s) na listagem
    E o resultado da pesquisa deve ser "<resultado>"

    Exemplos:
      | termo                 | quantidade | resultado            |
      | Samsung               | 1          | Samsung 60 polegadas |
      | ProdutoInexistente123 | 0          | nenhum               |

  Cenário: Pesquisar produto e adicionar ao carrinho
    Dado que estou logado como usuário comum
    E estou na página home
    Quando pesquiso pelo produto "Logitech MX Vertical"
    E adiciono o produto pesquisado ao carrinho
    Então devo ser redirecionado para a lista de compras
