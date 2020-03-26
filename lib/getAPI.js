const fetch = require("node-fetch"); 
require("dotenv").config();

const getType = async(id) =>{
    const url = `https://pokeapi.co/api/v2/type/${id}`
    let data = await fetch(url);
    return await data.json(); 
}

module.exports = {
    getType
}