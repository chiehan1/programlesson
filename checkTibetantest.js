//[[index,abc.length],[index,bcd.length]]

var fs=require("fs");
var str="vabcghbcdhjabcghbcdhjabcjkhglcdhjkh";
var arr=["abc","cdh"]

var finding=function(item){	
  var wordsindex=[];
  var indexstart=0;
  var x=new RegExp(item,"g");
  str.replace(x,function(m){
  	var wordindex=str.indexOf(m,indexstart);
	wordsindex.push([wordindex,m.length]);
	indexstart=wordindex+m.length;
  });
  console.log(wordsindex);
}
arr.map(finding);

//var getAllIndexes=function(arr, val) {
//    var indexes = [], i = -1;
//    while ((i = arr.indexOf(val, i+1)) != -1){
//        indexes.push(i+1);
//    }
//    return indexes;
//}
