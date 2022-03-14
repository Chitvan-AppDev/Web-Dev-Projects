const fs = require("fs")
const path = require("path")


function treeFn(dirpath) {
    if (dirpath == undefined) {
        console.log('please enter a valid command')

    }
    else {
        let doesExist = fs.existsSync(dirpath)
        if (doesExist == true) {
            treeHelper(dirpath, " ")//this space is provided as indent for the hirarchical order for reference see vs explorer
        }

    }
}

function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile()// checking for the folder 

    if (isFile) {
        let fileName = path.basename(targetPath)
        console.log(indent + "├──" + fileName)
        //  this will diaplay the files 
    }
    else {
        let dirName = path.basename(targetPath);
        console.log(indent + "└──" + dirName)


        let children = fs.readdirSync(targetPath)
        //  console.log(children)
        //here we took out all the children of test folder


        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(targetPath, children[i])
            // console.log(childPath)
            treeHelper(childPath, indent + '\t')//recursion to deal with folder inside folder 

        }
    }

}

module.exports={
    treeKey:treeFn
}