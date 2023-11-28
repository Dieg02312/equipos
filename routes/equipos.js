const {Router} = require ('express')
const{listEquipos,listEquiposbyID, addEquipos, updateTEam, deleteTeam}=require('../controllers/equipos');


const router =Router();

//http://localhost:3000/api/v1/Disney/
//http://localhost:3000/api/v1/Disney/1
//http://localhost:3000/api/v1/Disney/3
router.get('/', listEquipos);
router.get('/:id', listEquiposbyID);
//router.post('/', sigIn);
router.put('/', addEquipos);
router.patch('/:id', updateTEam);
router.delete('/:id', deleteTeam);
module.exports =router;