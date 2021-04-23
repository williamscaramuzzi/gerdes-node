var express = require('express');
var router = express.Router();
var Equipe = require("../models/Equipe");

/* o get de /equipes */
router.get('/', function (req, res, next) {
  var estrutura = {
    cabecalho: {nome:  "a ser implementado",
                unidade: "a ser implementado",
                perfil: "a ser implementado"},
    erros: [],
    dados: undefined
  }
  Equipe.findAll().then((array_de_registros)=>{
    if(!array_de_registros){
      res.send("<h1>Nenhuma equipe encontrada na tabela</h1>");
    } else {
      estrutura.dados = array_de_registros;
      res.render("/", estrutura);
    }
  }).catch((erro)=>{
    estrutura.erros.push(erro);
    res.json({ lista_de_erros: estrutura.erros.toString});
  });
  
});


router.post('/', (req, res, next)=>{
  const {
    viaturaInputText, 
    comandanteInputText, 
    motoristaInputText,
    patrulheiro1InputText, 
    patrulheiro2InputText, 
  } = req.body;
  Equipe.create({
    viatura: viaturaInputText,
    comandante: comandanteInputText,
    motorista: motoristaInputText,
    patrulheiro1: patrulheiro1InputText,
    patrulheiro2: patrulheiro2InputText,
    status: "disponivel"
  });
  res.send("<h1>Inseriu a equipe no banco de dados</h1>");

});
module.exports = router;