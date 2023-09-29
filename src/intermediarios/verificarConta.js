const { contas } = require('../bancoDeDados/bancodedados');

const verificarConta = (req, res, next) => {
    const { senha, numero_conta } = req.query;
    if (!senha || !numero_conta) {
        return res.status(401).json({ mensagem: "Número da conta e senha são obrigatórios." });
    }
    const numeroConta = Number(numero_conta);

    const conta = contas.find(conta => conta.numero_conta === numeroConta);
    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }
    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha inválida!' });
    }
    req.conta = conta;
    next();
};

const verificarContaBody = (req, res, next) => {
    const { senha, numero_conta } = req.body;
    if (!senha || !numero_conta) {
        return res.status(401).json({ mensagem: "Número da conta e senha são obrigatórios." });
    }
    const numeroConta = Number(numero_conta);

    const conta = contas.find(conta => conta.numero_conta === numeroConta);
    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }
    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha inválida!' });
    }
    req.conta = conta;
    next();
};


module.exports = { verificarConta, verificarContaBody }

