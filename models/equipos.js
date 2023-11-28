const Equimodels = {
    getAll: `
    SELECT 
    * 
    FROM 
    equipos`,
    getByID: `
    SELECT
    *
    FROM
    equipos
    WHERE
    id= ?
    `,
    addRow:`
    INSERT INTO
    equipos(
        Club,
        Competition,
        Age,
        Squad_size,
        Market_value,
        Market_value_of_players,
        MV_Top_18_players,
        Share_of_MV
    )
    VALUES (
        ?,?,?,?,?,?,?,?
    )`,
    getByEquipoName:`
    SELECT 
    * 
    FROM 
    equipos
    WHERE Club =?
    `,

    updateTeam:`
    UPDATE
    equipos
    SET
    Club=?,
        Competition=?,
        Age=?,
        Squad_size=?,
        Market_value=?,
        Market_value_of_players=?,
        MV_Top_18_players=?,
        Share_of_MV=?
        WHERE 
        id =?
    `,

    deleteRow:`
    DELETE FROM 
    equipos
    WHERE 
    id=?
    `,
    
}

module.exports=Equimodels;