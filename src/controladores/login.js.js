const { contas } = require('../bancoDeDados/bancodedados');
let proximoNumero = 1

const todasContas = async (req, res) => {
    const quantidadeContas = contas.length;
    let mensagem = '';
    if (quantidadeContas === 1) {
        mensagem = `${quantidadeContas} conta encontrada`;
    } else { mensagem = `${quantidadeContas} contas encontradas`; }

    return res.status(200).json({
        mensagem: mensagem,
        contas: contas
    });
};

const cadastrarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const validarCamposObrigatorios = (campos) => {
        for (let campo of campos) {
            if (!req.body[campo]) {
                return res.status(400).json({ mensagem: `O campo ${campo} é obrigatório` });
            }
        }
        return null;
    };
    const camposObrigatorios = ['nome', 'cpf', 'data_nascimento', 'telefone', 'email', 'senha'];
    const erro = validarCamposObrigatorios(camposObrigatorios);
    if (erro) {
        return erro;
    }
    const validarCpf = (cpf) => {
        if (!/^\d{11}$/.test(cpf)) {
            return false;
        }
        return true;
    };

    if (!validarCpf(cpf)) {
        return res.status(400).json({ mensagem: 'CPF inválido' });
    }

    const verificarExistencia = (cpf, email) => {
        const cpfExistente = contas.some((conta) => conta.usuario.cpf === cpf);
        const emailExistente = contas.some((conta) => conta.usuario.email === email);
        return { cpfExistente, emailExistente };
    };
    const { cpfExistente, emailExistente } = verificarExistencia(cpf, email);
    if (cpfExistente) {
        return res.status(400).json({ mensagem: 'Este CPF já está em uso' });
    }
    if (emailExistente) {
        return res.status(400).json({ mensagem: 'Este email já está em uso' });
    }
    const novaConta = {
        numero_conta: proximoNumero,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };
    contas.push(novaConta);
    proximoNumero++;

    return res.status(201).json(novaConta);
};

const alterarConta = async (req, res) => {
    const { nome, data_nascimento, telefone, senha, cpf, email } = req.body;
    const validarCamposObrigatorios = (campos) => {
        for (let campo of campos) {
            if (!req.body[campo]) {
                return res.status(400).json({ mensagem: `O campo ${campo} é obrigatório` });
            }
        }
        return null;
    };
    const camposObrigatorios = ['nome', 'data_nascimento', 'telefone', 'senha'];
    if (cpf) {

        if (!/^\d{11}$/.test(cpf)) {
            return res.status(400).json({ mensagem: 'CPF deve conter exatamente 11 dígitos' });
        }
        camposObrigatorios.push('cpf');
    }

    const erro = validarCamposObrigatorios(camposObrigatorios);
    if (erro) {
        return erro;
    }

    const verificarExistencia = (cpf, email) => {
        const cpfExistente = contas.some((conta) => conta.usuario.cpf === cpf);
        const emailExistente = contas.some((conta) => conta.usuario.email === email);
        return { cpfExistente, emailExistente };
    };
    const { cpfExistente, emailExistente } = verificarExistencia(cpf, email);
    if (cpfExistente) {
        return res.status(400).json({ mensagem: 'Este CPF já está em uso' });
    }
    if (emailExistente) {
        return res.status(400).json({ mensagem: 'Este email já está em uso' });
    }
    const contaExistente = contas.find(conta => conta.numero_conta === Number(req.params.numero_conta));
    if (!contaExistente) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!' });
    }
    contaExistente.usuario.nome = nome;
    contaExistente.usuario.data_nascimento = data_nascimento;
    contaExistente.usuario.telefone = telefone;
    contaExistente.usuario.senha = senha;
    if (cpf) {
        contaExistente.usuario.cpf = cpf;
    }

    return res.status(204).send();
}

const deletarConta = async (req, res) => {
    const indiceConta = contas.findIndex(conta => conta.numero_conta === Number(req.params.numero_conta));
    if (indiceConta < 0) {
        return res.status(404).json({ mensagem: 'Não existe conta a ser excluida para o numero informado!' });
    }
    const conta = contas[indiceConta];

    if (conta.saldo !== 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }
    contas.splice(indiceConta, 1);
    return res.status(204).send();
}

module.exports = {
    todasContas,
    cadastrarConta,
    alterarConta,
    deletarConta
}