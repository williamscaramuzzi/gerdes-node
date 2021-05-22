var express = require('express');
var router = express.Router();
var Equipe = require("../models/Equipe");
var Ocorrencia = require('../models/Ocorrencia');
/* o get da home */
router.get('/', function (req, res, next) {    
  let estrutura = {disponiveis: undefined, ocupadas: undefined, ocorrenciaspendentes: undefined, ematendimento: undefined};
  async function findEverything(){
    estrutura.disponiveis = await Equipe.findAll({where: {status: "disponivel"}});
    estrutura.ocupadas = await Equipe.findAll({where: {status: "ocupada"}});
    estrutura.ocorrenciaspendentes = await Ocorrencia.findAll({where: {status: "pendente"}});
    estrutura.ematendimento = await Ocorrencia.findAll({where: {status: "em atendimento"}});
    res.render('home', estrutura);
  }
  findEverything();  
});
router.post('/', function (req, res, next) {
    res.render('home');
  });
router.post('/criarocorrencia', (req, res, next)=>{
  let ocorrencia = {};
  let {solicitanteInput, vitimaInput, fatoSelect, enderecoInput, descricaoInput} = req.body;
  ocorrencia.fato = fatoSelect;
  ocorrencia.despachante_responsavel = "William";
  ocorrencia.equipe = null;
  ocorrencia.endereco = enderecoInput;
  ocorrencia.solicitante = solicitanteInput;
  ocorrencia.vitima = vitimaInput;
  ocorrencia.descricao = descricaoInput;
  ocorrencia.status = "pendente";
  Ocorrencia.create(ocorrencia).then(ocorrenciacriada=>{
    res.redirect('/home');
  });
  
});

router.get('/readocorrencia', (req, res, next)=>{
  let idOcorrencia = req.query.id;
  let ocorrencia = {};
  async function readOcorrencia(){
    ocorrencia = await Ocorrencia.findOne({where: {despacho: idOcorrencia}});
    res.send(ocorrencia);
  }
  readOcorrencia();
});
router.post('/updateocorrencia', (req, res, next)=>{
  let ocorrencia = req.body.ocorrencia;
  console.log(ocorrencia);
  if(ocorrencia.equipe==='null') {
    ocorrencia.status="pendente";
    ocorrencia.equipe = null;
  }
  else {
    ocorrencia.status = "em atendimento";
    Equipe.update({status: "ocupada"}, {where: {viatura: ocorrencia.equipe}});
  }
  Ocorrencia.update(ocorrencia, {where: {despacho: ocorrencia.despacho}}).then(o =>{
    res.send(o);
  });
});



module.exports = router;