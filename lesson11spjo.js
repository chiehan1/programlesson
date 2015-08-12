var fs=require("fs");
var lst=fs.readFileSync("./lesson11spjo.lst","utf8").split(/\r?\n/);

var tomain=function(fn){
	var text=fs.readFileSync("./"+fn+".txt","utf8").replace(/\n~1~/g,function(s){
		return "~split~"+fn+"\n"+s;
	}).split("~split~");
	return text[0];
}

var toref=function(fn){
	var text=fs.readFileSync("./"+fn+".txt","utf8").replace(/\n~1~/g,function(s){
		return "~split~"+fn+"\n"+s;
	}).split("~split~");
	return text[1];
}


var rejoinedmain=lst.map(tomain).join("\n");
var rejoinedref=lst.map(toref).join("\n");

var group=0;
var numreplace=function(text){
	return text.replace(/~(\d+)~/g,function(m,m1){
		if (m1==="1") group++;
		return "~"+group+"-"+m1+"~";
	});
};

//fs.writeFileSync("./maintext.txt",numreplace(rejoinedmain),"utf8");
fs.writeFileSync("./reftext.txt",numreplace(rejoinedref),"utf8");

/*
var out=[rejoinedmain,rejoinedref];
var output=out.map(numreplace);
var outputfile=function(file,idx){
	fs.writeFile("./lesson11spjo"+idx+".txt",file,"utf8");
}
output.map(outputfile);
*/