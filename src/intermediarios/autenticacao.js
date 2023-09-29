const autenticacao = (req, res, next) => {

    const { senha_banco } = req.query;
    if (senha_banco !== 'Cubos123Bank') {
        return res.status(401).json({ mensagem: "Senha incorreta." });
    }
    next();
}
module.exports = {
    autenticacao,

};