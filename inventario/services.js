import fetch from 'node-fetch'
const token = 'access_token_75d53ea9b04b185ca2ecbaae643419994ce9dc19'
let URL = 'https://erp.pintaipesa.com/api/'

//funciones auxiliares
//ordena los json por fcha
function custom_sort(a, b) {
    return new Date(b.__last_update).getTime() - new Date(a.__last_update).getTime();
}
//obtiene almacenes 

async function getAlmacenes (){
    const model = 'stock.warehouse'
    const options = {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'access-token': token,
        }
    };
    const params = new URLSearchParams({
        fields: ['id,name,code']
    })
    URL += model + '?' + params.toString()
    return fetch(URL, options)
    .then((resp) => resp.json())
        .then(function(data) {  
            return data.data.sort(custom_sort)
    })
    .catch((error)=>{
        console.log(error)
    })
}
console.log(await getAlmacenes())

//obtiene todos los inventarios
async function getInventarios(){
    const model = 'stock.inventory'
    const options = {
        'method': 'GET',
        'headers': {
          'Content-Type': 'multipart/form-data',
          'access-token': token
        }
    };
    const params = new URLSearchParams({
        fields: ['id,name,location_ids,create_uid,create_date,__last_update']
    })
    URL += model + '?' + params.toString()
    return fetch(URL, options)
    .then((resp) => resp.json())
        .then(function(data) {  
            return data.data.sort(custom_sort)
    })
    .catch((error)=>{
        console.log(error)
    })
}
console.log(await getInventarios())

//obtiene inventarios hechos por el usuario dado
async function getInventariosFrom(user){
    const model = 'stock.inventory'
    const ubicacion = 'create_uid:=:'+user
    const options = {
        'method': 'GET',
        'headers': {
          'Content-Type': 'multipart/form-data',
          'access-token': token
        }
    };
    const params = new URLSearchParams({
        fields: ['id,name,location_ids,create_date,__last_update'],
        domain: [ubicacion]
    })
    URL += model + '?' + params.toString()
    return fetch(URL, options)
    .then((resp) => resp.json())
        .then(function(data) {  
            return data.data
    })
    .catch((error)=>{
        console.log(error)
    })
}
//console.log(await getInventariosFrom('Franco santiago'))

//obtiene la informacion del usuario
async function getInfo(user){
    const model = 'hr.employee'
    const options = {
        'method': 'GET',
        'headers': {
          'Content-Type': 'multipart/form-data',
          'access-token': token
        }
    };
    const params = new URLSearchParams({
        domain: ['name:=:'+user]
    })
    URL += model + '?' + params.toString()
    return fetch(URL, options)
    .then((resp) => resp.json())
        .then(function(data) {  
            return data.data
    })
    .catch((error)=>{
        console.log(error)
    })
}

//console.log(await getInfo('Jorge Alberto Leonor Gonzalez'))