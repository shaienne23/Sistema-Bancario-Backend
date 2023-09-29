# Sistema Bancario - Back-end
# :bank:API Bancária

Esta é uma API Bancária de alto desempenho, desenvolvida por mim, projetada para simplificar e tornar seguras as operações financeiras dos usuários. Com esta API, você pode gerenciar suas contas bancárias e realizar transações financeiras com facilidade e confiança.

## :closed_book:Recursos Principais

- **Criar Conta Bancária:** Crie facilmente uma nova conta bancária.

- **Listar Contas Bancárias:** Consulte uma lista completa de todas as contas bancárias cadastradas.

- **Atualizar Dados do Usuário:** Atualize informações do titular da conta, como nome, data de nascimento e telefone.

- **Excluir Conta Bancária:** Encerre uma conta bancária existente.

- **Depositar:** Faça depósitos em sua conta bancária para aumentar o saldo.

- **Sacar:** Realize saques de sua conta para retirar dinheiro.

- **Transferir Valores:** Transfira fundos entre diferentes contas bancárias.

- **Consultar Saldo:** Verifique o saldo atual de sua conta.

- **Emitir Extrato Bancário:** Obtenha um extrato detalhado das transações em sua conta.

## :mag_right:Como Usar

Para começar a usar esta API, siga a documentação fornecida nas rotas e endpoints disponíveis. Você encontrará instruções  sobre como fazer solicitações para cada recurso.

## :hammer_and_pick:Tecnologias Utilizadas

- Node.js
- Express.js
- Javascript
- Moment.js

## :pushpin:Contribuições

Fique à vontade para contribuir com melhorias, correções de bugs ou novos recursos para esta API. Basta fazer um fork do repositório, criar sua branch, e enviar um pull request. Sua ajuda é bem-vinda!

## :pushpin:Exemplos de uso da API utilizando o insomnia

**Este endpoint cria uma nova conta bancária, gerando um número exclusivo para identificação.** As verificações incluem campos únicos para CPF e e-mail, garantindo que todos os campos obrigatórios estejam preenchidos e definindo um saldo inicial de 0.
![Criar Insomnia](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Criar%20contas%20Bancarias.PNG)

**Este endpoint tem a finalidade de listar todas as contas bancárias existentes.** Para isso, é obrigatório verificar se a senha do banco foi informada como parâmetro de consulta na URL e validar se a senha do banco está correta. A requisição deve incluir o seguinte parâmetro de consulta:  "senha_banco";A resposta esperada é uma listagem de todas as contas bancárias existentes.
![Listar Insomnia](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Listar%20contas%20bancarias%20Existentes.PNG)

**Este endpoint atualiza os dados do usuário de uma conta bancária**, garantindo que todos os campos obrigatórios sejam fornecidos no corpo da requisição. Também verifica a validade do número da conta na URL, a unicidade do CPF e do e-mail, se fornecidos, e realiza a atualização dos dados do usuário.
![Atualizar Insomnia](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Alterar%20conta%20Bancaria.PNG)

**Apos a alteração da conta bancaria é retornado a conta de forma atualizada, por meio do listar contas.**
![apos atualizaçao Insomnia](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Aualiza%C3%A7%C3%A3o%20apos%20altera%C3%A7%C3%A3o.PNG)

**Este endpoint permite somar o valor de um depósito ao saldo de uma conta válida e registra essa transação**. É obrigatório fornecer o número da conta e o valor do depósito no corpo da requisição, verificar se a conta bancária existe, não permitir depósitos com valores negativos ou zerados, e somar o valor do depósito ao saldo da conta correspondente. A resposta pode ser vazia em caso de sucesso, e em caso de falha na validação, incluirá um status code apropriado e uma mensagem explicando o motivo da falha
![depositar Insomnia](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Depositar%20Valores%20nas%20contas.PNG)

**Este endpoint permite realizar saques em contas bancárias**. É necessário fornecer o número da conta, valor do saque e senha. Ele verifica se a conta existe, se a senha é válida, se há saldo disponível e registra a transação. Em caso de sucesso, a resposta é vazia; em falhas, há um status code e mensagem explicativa.
![Sacar Insomnia](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Sacar%20Valor%20na%20conta%20bancaria%20abatendo%20o%20valor%20do%20saldo.PNG)

**Este endpoint permite transferir recursos entre contas bancárias**. É necessário fornecer número da conta de origem, número da conta de destino, senha da conta de origem e valor da transferência. Ele verifica se ambas as contas existem,se a senha é válida, se há saldo disponível na conta de origem e registra a transação. Em caso de falhas, há um status code e mensagem explicativa.
![Transferir Insomnia]([ ](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Tranferencia%20entre%20contas%20Bancarias.PNG))

**Este endpoint retorna o saldo de uma conta bancária**. Para isso, você deve fornecer o número da conta e a senha como query params na URL. O endpoint verifica se a conta existe, se a senha é válida e exibe o saldo da conta em questão como resposta.
![Saldo Insomnia]([ ](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Saldo%20com%20autentica%C3%A7%C3%A3o%20por%20senha.PNG))

**Este endpoint lista as transações realizadas em uma conta específica em formato de extrato**. Para isso, você deve fornecer o número da conta e a senha como query params na URL. O endpoint verifica se a conta existe, se a senha é válida e retorna um relatório com as transferências, depósitos e saques realizados na conta em questão
![Extrato Insomnia](https://github.com/shaienne23/Sistema-Bancario-Backend/blob/main/Extrato%20completo%20por%20autentica%C3%A7%C3%A3o%20de%20senha.PNG)

<h2>✒️ Autora</h2>
<strong>Shaienne Oliveira</strong>



