var fs=require("fs");
var lst=fs.readdirSync("./data");

var out=[];

var checkTsheg=function(arr){	
	for(var i=2;i<arr.length;i+=2){
		var finalCharacter=arr[i][arr[i].length-1];
		if(finalCharacter!="་") out.push(arr[i-1]);
	}
}

var readFile=function(file){
	var content=fs.readFileSync("./data/"+file,"utf8");
	var pureContent=content.replace(/[\u4e00-\u9fff\u3400-\u4dff\uf900-\ufaff\(\) ]+/g,"").replace(/\r?\n/g,"");
	var pbSplit=pureContent.replace(/<pbid="(\d+\.\d+[ab])"\/>/g,"~~$1~~").split("~~");
	return pbSplit;
}

var texts=lst.map(readFile);
var output=texts.map(checkTsheg);
fs.writeFileSync("./checkTshegResult.xml",out.join("\n"),"utf8");