const express = require('express');
const rotas = express();
const { todasContas, cadastrarConta, alterarConta, deletarConta } = require('./controladores/login.js')
const { autenticacao } = require('./intermediarios/autenticacao.js');
const { depositar, sacar, transferir, saldo, extrato } = require('./controladores/transacoes.js');
const { verificarConta, verificarContaBody } = require('./intermediarios/verificarConta.js');


rotas.get('/contas', autenticacao, todasContas);
rotas.post('/contas', cadastrarConta);
rotas.put('/contas/:numero_conta/usuario', alterarConta);
rotas.delete('/contas/:numero_conta', deletarConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', verificarContaBody, sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', verificarConta, saldo);
rotas.get('/contas/extrato', verificarConta, extrato);

module.exports = rotas;

