var fs=require("fs");
var glob=require("glob");
var letters=JSON.parse(fs.readFileSync("possible_root_letters_sort.json","utf8"));

var indexOfSorted = function (array, obj) { 
    var low = 0,
    high = array.length-1;
    while (low < high) {
      var mid = (low + high) >> 1;
      array[mid] < obj ? low = mid + 1 : high = mid;
    }
    if(array[low] != obj) return -1;
    return low;
 }

var processBampo = function(fn){
	var out=[];
	var bampo = fs.readFileSync(fn,"utf8");
  var pages = bampo.split(/<pb id="(\d.\d+[ab])"\/>/);//[text,pb,text,pb, ...]
  var filename = fn.split("/")[3].substr(0,10);
  
  for(var p=0; p<pages.length; p+=2){
    //get the list of mispelling words
    var sentences=pages[p].replace(/<.+>/g,"").split(/[\u0f0d\u0f0e ]+/);
    for(var s=0;s<sentences.length;s++){
      var words=sentences[s].split(/[\u0f0b]/);
      for(var w=0;w<words.length;w++){
        words[w].replace(/[\u0f20-\u0fbf]+/g,function(m){
          var index = indexOfSorted(letters,m);
          if( index == -1 &&  !(m.substr(m.length-2) == "འི" || m.substr(m.length-2) == "འོ"))
          out.push([pages[p-1],s+1,w+1,m]); 
        });             
      }          
    }
    // var taggedPage = pageContent[i].replace(/[\u0f20-\u0fbf]+/g,function(m){
    //  var index = indexOfSorted(letters,m);
    //  if(index == -1) return "   ' "+m+" '   ";
    //  else return m;
    // }); 
    //out.push([taggedPage])
  }
  fs.writeFileSync("./result/"+filename+".xml",out.join("\n"),"utf8");
}

glob("../jiangkangyur/001/*.xml",function(err,files){
  files.map(processBampo);
});

//processBampo("../jiangkangyur/001/lj0001_001.xml");

//fs.writeFileSync("possibleRootLetters_sort.json",JSON.stringify(letters.sort(),""," "),"utf8");

/*var getAllIndexes=function(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i+1);
    }
    return indexes;
}*/