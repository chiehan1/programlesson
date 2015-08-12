//算出lst所有檔案的句子的平均
var fs=require("fs");
var lst=fs.readFileSync("data/data.lst","utf8").split(/\r?\n/);

var totalcontents=0;
var totallines=0;
var contentlines=function(fn,idx){
	var content=fs.readFileSync("data/"+fn,"utf8");
	var lines=content.split(/\r?\n/);
	totalcontents+=content.length;
	totallines+=lines.length;
	var totalmeans=totalcontents/totallines;
	return totalmeans
}
console.log(lst.map(contentlines)[lst.length-1]);