const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

function ImageLibrary(uploadsFolder, subFolder){
	this.usersFolder = path.join(uploadsFolder + '/' + subFolder);
	this.subFolder = subFolder;
}

ImageLibrary.prototype.addImage = function(file, callback){

	/************************************
		return: object
	*************************************/

	let obj = {};

	const fileName = file.name;
	let usersFolder = this.usersFolder;

	if(!fs.existsSync(usersFolder)){
		fs.mkdirSync(usersFolder);
	}

	if(!fs.existsSync(usersFolder + '/' + fileName)){
		file.mv(usersFolder + '/' + fileName, function(err) {
		    if(err){
	      		obj.error = err;
				return callback(obj);
		    }
		    obj.filename = fileName;
			return callback(obj);
		});
	}else{

		let fileNameExists = true;
		let fName = fileName;
		let count = 0;

		while(fileNameExists){

			if(fs.existsSync(usersFolder + '/' + fName)){

				var name = fName.split('.')[0];
				// var name = fName.split(lastIndexOf('.'))[0];
				var extention = fName.split('.')[1];
				var last2 = name.substr(name.length - 2);
		
				if(/\d/.test(last2) && last2.charAt(1) == ')'){
					count = 2;
					fName = name + '(' + count + ').' + extention;
				}else{
					count++;
					fName = name + name.substring(0, name.lastIndexOf('(')) + '(' + count + ').' + extention;
				}

			}else{
				fileNameExists = false;
			}

		}

		file.mv(usersFolder + '/' + fName, function(err) {

		    if(err){
		    	fileNameExists = false;
	      		obj.error = err;
				return callback(obj);
		    }

		    obj.filename = fileName;
			return callback(obj);

		});

	}

};

ImageLibrary.prototype.getImages = function(){
	if(fs.existsSync(this.usersFolder)){
		var images = [];
		var returnedFiles = fs.readdirSync(this.usersFolder);
		for(i=0; i<returnedFiles.length; i++){
			images.push(this.subFolder + '/' + returnedFiles[i]);
		}
		return images;
	}
	return [];
};

ImageLibrary.prototype.removeImage = function(fileName){

	if(fs.existsSync(this.usersFolder + '/' + fileName)){
		fs.unlinkSync(this.usersFolder + '/' + fileName);
		return true;
	}

	return false;

};

module.exports = ImageLibrary;