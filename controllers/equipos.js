const {request, response} = require('express');
const Equimodels = require('../models/equipos');
const pool=require('../db');

////////////////////////////////////////////////////////////////////////////////////////////////////
const listEquipos = async (req = request, res = response) => {
    let conn; 

    try{
        conn = await pool.getConnection();

    const fifaTEAM = await conn.query (Equimodels.getAll, (err)=>{
        if(err){
            throw err
        }
    });

    res.json(fifaTEAM);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const listEquiposbyID = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).json({msg: 'Invalid ID'});
        return;
    }

    let conn; 
    try{
        conn = await pool.getConnection();

    const [equipos] = await conn.query (Equimodels.getByID, [id], (err)=>{
        if(err){
            throw err
        }
    });

    if (!equipos) {
        res.status(404).json({msg: 'Team not foud'});
        return;
    }
    
    
    res.json(equipos);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


const addEquipos =async(req = request, res= response)=>{
    let conn;
    const {
        Club,
        Competition,
        Age,
        Squad_size,
        Market_value,
        Market_value_of_players,
        MV_Top_18_players,
        Share_of_MV
    } = req.body;

    if (!Club|| !Competition|| !Age|| !Squad_size||!Market_value|| !Market_value_of_players||!MV_Top_18_players||!Share_of_MV){
res.status(400).json({msg:'Missing informarion'});
return;
        }

        const equipos= [Club, Competition, Age, Squad_size, Market_value, Market_value_of_players,MV_Top_18_players,Share_of_MV]


    
    try {

        conn = await pool.getConnection();
        
        const [PelinameUser] = await conn.query(
            Equimodels.getByEquipoName,
            [Club],
            (err) => {if (err) throw err;}
        );
        if (PelinameUser){
            res.status(409).json({msg:`User with username ${Club} already exists`});
            return;
        }

                
        const userAdded = await conn.query(Equimodels.addRow,[...equipos],(err)=>{

        })
        
        if (userAdded.affecteRows === 0) throw new Error ({msg:'Failed to add team'});
        res.json({msg:'Team add succesfully'});
    }catch(error){
console.log(error);
res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
}


//Update del profe Julio ///////////////////////////////////////////////////////////////////////////

const updateTEam=async(req, res)=>{
const {
    Club,
    Competition,
    Age,
    Squad_size,
    Market_value,
    Market_value_of_players,
    MV_Top_18_players,
    Share_of_MV,
} = req.body;

const {id} = req.params;
let newTeamData=[
    Club,
    Competition,
    Age,
    Squad_size,
    Market_value,
    Market_value_of_players,
    MV_Top_18_players,
    Share_of_MV,
];
let conn;
try{
conn = await pool.getConnection();
const [userExists]=await conn.query(
    Equimodels.getByID,
[id],
(err) => {if (err) throw err;}
);
if (!userExists || userExists.total_gross === 0){
res.status(404).json({msg:'Team not found'});
return;
}

const [usernameTeam] = await conn.query(
    Equimodels.getByEquipoName,
[Club],
(err) => {if (err) throw err;}
);
if (usernameTeam){
res.status(409).json({msg:`User with username ${Club} already exists`});
return;
}


const oldpeliData = [
userExists.Club,
userExists.Competition,
userExists.Age,
userExists.Squad_size,
userExists.Market_value,
userExists.Market_value_of_players,
userExists.MV_Top_18_players,
userExists.Share_of_MV,
];

newTeamData.forEach((userData, index)=> {
if (!userData){
    newTeamData[index] = oldpeliData[index];
}
})

const userUpdate = await conn.query(
    Equimodels.updateTeam,
[...newTeamData, id],
(err) => {if (err) throw err;}
);
if(userUpdate.affecteRows === 0){
throw new Error ('Team not updated');
}
res.json({msg:'Team updated successfully'})
}catch (error){
console.log(error);
res.status(500).json(error);
} finally{
if (conn) conn.end();
}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
const deleteTeam = async (req, res)=>{
    let conn;

    try{
        conn = await pool.getConnection();
        const {id} =req.params;
        const [userExists] =await conn.query(
            Equimodels.getByID,
            [id],
            (err) => {if (err) throw err;}
        );
        if(!userExists || userExists.total_gross === 0){
            res.status(404).json({msg:'Team not Found'});
            return;
        }

        const TeamDelete = await conn.query(
            Equimodels.deleteRow,
            [id],
            (err) => {if(err)throw err;}
        );
        if (TeamDelete.affecteRows===0){
            throw new Error({msg:'failed to delete Team'})
        };
        res.json({msg:'Team deleted succesfully'});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }finally{
    if(conn) conn.end(); 
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports={listEquipos,listEquiposbyID, addEquipos, updateTEam, deleteTeam};