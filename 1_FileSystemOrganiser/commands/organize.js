const fs = require("fs")
const path = require("path")








let types = {
    media: ["mp4", "mkv", "mp3", "jpeg", "png", "jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};



function organizefn(dirpath) {
    //input of directory path in above fn


    let destPath
    if (dirpath == undefined) {
        // not passed any or invalid directory Path
        console.log('please enter a valid directory path')
        return;
    }
    else {
        let doesExist = fs.existsSync(dirpath)
        // this will tell whether the dirpath exists or not
        // console.log(doesExist)

        if (doesExist) {
            destPath = path.join(dirpath, 'organized_files')

            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath)// will create folder if it doesnt exits already
            } else {
                console.log('this folder already exists')
            }
        }
        else {
            console.log('please enter a valid path')
        }
    }
    organinizeHelper(dirpath, destPath)

}
// below function will be used to categorize our files 
function organinizeHelper(src, dest) {
    let childNames = fs.readdirSync(src)// get all the files and folders inside ur src
    //  console.log(childNames)


    // below loop is to remove folders from childnames
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i])// path identified for the files
        let isFile = fs.lstatSync(childAddress).isFile()// check if the add contains file or not 
        // console.log(childAddress+" => "+ isFile)

        if (isFile) {
            let fileCategory = getCategory(childNames[i])
            console.log(childNames[i] + " belongs to => " + fileCategory)
            // we took out all the categories type of different files 

            sendFiles(childAddress, dest, fileCategory)
        }


    }
}


function getCategory(name) {
    let ext = path.extname(name)
    ext = ext.slice(1)//removing . from extentions
    //  console.log(ext)


    // for in loop 
    for (let type in types) {
        let cTypeArr = types[type]
        // console.log(cTypeArr)


        // in this below we check all the extentions present in particular key of the object
        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i]) {
                // matched the extentions with the values present in cTypeArr
                return type
            }
        }
    }

    return 'others'
}



// int the below fn we are sending files into folder
function sendFiles(srcFilePath, dest, fileCategory) {
    //making path
    let catPath = path.join(dest, fileCategory)//making file categories path


    if (!fs.existsSync(catPath)) {//checking for category folder path
        fs.mkdirSync(catPath)
    }


    let fileName = path.basename(srcFilePath)//took out the names of the files
    let destFilePath = path.join(catPath, fileName)//here we created a path for the files in category folders

    fs.copyFileSync(srcFilePath, destFilePath)//copied files from src to dest
    fs.unlinkSync(srcFilePath)//deleted files from src
    console.log(fileName + " is copied to " + fileCategory)

}

module.exports={
    organizeKey:organizefn
}