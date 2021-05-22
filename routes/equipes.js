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
  Equipe.findAll().then((rows)=>{
    if(!rows){
      res.send("<h1>Nenhuma equipe encontrada na tabela</h1>");
    } else {
      estrutura.dados = rows;
      res.render("equipes", estrutura);
    }
  }).catch((erro)=>{
    estrutura.erros.push(erro);
    res.json({ lista_de_erros: estrutura.erros});
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
  }).then(retorno=>res.redirect("equipes"));
  

});
router.post("/descompor", (req, res, next)=>{
  const id  = req.body.id;
  console.log(req.body);
  Equipe.destroy({where: {viatura: id}});
  res.send("sucesso");
});

router.get('/getDispo', (req, res, next)=>{
  let clausulaWhere = {where: {status: "disponivel"}};
  Equipe.findAll(clausulaWhere).then(rows=>{
    if(!rows){
      res.send("<h1>Nenhuma equipe encontrada na tabela</h1>");
    } else {
      res.json(rows);
    }
  }).catch((err=>{
    res.json({erro: err});
  }));

});
module.exports = router;