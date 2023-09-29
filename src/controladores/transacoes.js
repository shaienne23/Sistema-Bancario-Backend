const { contas } = require('../bancoDeDados/bancodedados');
const moment = require('moment');
const verificarConta = require('../intermediarios/verificarConta')
const registrosDeDepositos = [];
const registroDeSaque = [];
const registroDeTransferenciaEnviada = [];
const registroDeTransferenciaRecebida = [];

const depositar = async (req, res) => {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || valor === undefined || valor <= 0) {
        return res.status(404).json({ mensagem: 'O número da conta e o valor são obrigatórios!' });
    }

    const conta = contas.find(conta => conta.numero_conta === numero_conta);
    if (!conta) {
        return res.status(400).json({ mensagem: 'A conta não existe!' });
    }
    conta.saldo = Number(conta.saldo) + Number(valor);

    const registroDeDeposito = {
        data: moment().format('YYYY-MM-DD HH:mm:ss'),
        numero_conta: numero_conta,
        valor: Number(valor)
    };
    registrosDeDepositos.push(registroDeDeposito);

    return res.status(204).send();
}

const sacar = async (req, res) => {
    const { valor, numero_conta } = req.body;
    const { conta } = req;
    if (!valor) {
        return res.status(400).json({ mensagem: 'O  valor é obrigatórios!' });
    }
    if (conta.saldo < valor) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente para realizar o saque!' });
    }
    conta.saldo = Number(conta.saldo) - Number(valor);

    const registroSaque = {
        data: moment().format('YYYY-MM-DD HH:mm:ss'),
        numero_conta: numero_conta,
        valor: Number(valor)
    };
    registroDeSaque.push(registroSaque);

    return res.status(204).send();
}

const transferir = async (req, res) => {

    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    if (!numero_conta_origem || !numero_conta_destino || valor === undefined || senha === undefined) {
        return res.status(400).json({ mensagem: 'O número da conta de origem, de destino, o valor e a senha são obrigatórios!' });
    }

    const contaOrigem = contas.find(conta => conta.numero_conta === numero_conta_origem);
    if (!contaOrigem) {
        return res.status(404).json({ mensagem: 'A conta de origem não existe!' });
    }

    const contaDestino = contas.find(conta => conta.numero_conta === numero_conta_destino);
    if (!contaDestino) {
        return res.status(404).json({ mensagem: 'A conta de destino não existe!' });
    }
    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'Senha inválida!' });
    }
    if (contaOrigem.saldo < valor) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente para realizar transferencia!' });
    }
    contaOrigem.saldo = Number(contaOrigem.saldo) - Number(valor);
    contaDestino.saldo = Number(contaDestino.saldo) + Number(valor);

    const registroTransferenciaEnviada = {
        data: moment().format('YYYY-MM-DD HH:mm:ss'),
        numero_conta_origem: Number(numero_conta_origem),
        numero_conta_destino: Number(numero_conta_destino),
        valor: Number(valor)
    };
    registroDeTransferenciaEnviada.push(registroTransferenciaEnviada);

    const registroTransferenciaRecebida = {
        data: moment().format('YYYY-MM-DD HH:mm:ss'),
        numero_conta_origem: Number(numero_conta_origem),
        numero_conta_destino: Number(numero_conta_destino),
        valor: Number(valor)
    };
    registroDeTransferenciaRecebida.push(registroTransferenciaRecebida);
    return res.status(204).send();
}

const saldo = (req, res) => {
    const { conta } = req;

    return res.status(200).json({
        saldo: Number(conta.saldo)
    });
};

const extrato = async (req, res) => {
    const { numero_conta } = req.query;
    const numeroConta = Number(numero_conta);

    const extratoConta = {
        depositos: registrosDeDepositos.filter(registro => registro.numero_conta === Number(numeroConta)),
        saques: registroDeSaque.filter(registro => registro.numero_conta === Number(numeroConta)),
        transferenciasEnviadas: registroDeTransferenciaEnviada.filter(registro => registro.numero_conta_origem === Number(numeroConta)),
        transferenciasRecebidas: registroDeTransferenciaRecebida.filter(registro => registro.numero_conta_destino === Number(numeroConta))
    };
    return res.status(200).json({ extrato: extratoConta });
};

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
};

