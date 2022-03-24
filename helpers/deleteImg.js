const fs = require('fs')

const deleteImg = (img)=> {
    try{
        fs.unlinkSync('./uploads/'+img)
    }catch(err){
        console.log(err)
    }
}
module.exports = {
    deleteImg
}