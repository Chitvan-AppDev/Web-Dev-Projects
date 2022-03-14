// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

//js mein input Array ke from mein jaata hai and that is array is process.argv Array

const help=require('./commands/help')
const organize=require('./commands/organize')
const tree=require('./commands/tree')
const fs = require("fs")
const path = require("path")

//  //input through command line in js

let input = process.argv[2]//  in this we are accepting input an index 2--> 0- node,1- fo.js, 2- hey
// argv is argument vector

let inputArr = process.argv.slice(2)// it discard 0 and 1 index an get all other indices in an array
// node fo.js tree folderpath

// let input3= process.argv
// console.log(input)
// console.log(input2)
// console.log(input3)

let command = inputArr[0]

//we implement tree, organize, help for this project

switch (command) {
    case 'tree':
        tree.treeKey(inputArr[1])
        break;
    case 'organize':
        organize.organizeKey(inputArr[1])
        break;
    case 'help':
        help.helpKey()
        break;
    default:
        console.log('invalid input nothing implemented')
}









