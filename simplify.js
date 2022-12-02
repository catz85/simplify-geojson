var simplify = require('simplify-js');
var fs = require('fs');
var fileName = 'poland.json';
var simplifylevel = 0.01;
var output = 'file.json';
fs.readFile(fileName, {encoding:'utf8'}, function(err, data) {
  var file = JSON.parse(data);
  var tosimplify = []
  file.features.forEach(function(item, index) {
    tosimplify.push([]);
    item.geometry.coordinates.forEach(function(item, indexlast0) {
      tosimplify[index].push([]);
      item.forEach(function(item, indexlast1) {
        tosimplify[index][indexlast0].push([])
        item.forEach(function(item, indexlast2) {
          tosimplify[index][indexlast0][indexlast1].push({x:item[0],y:item[1]});
        })
      })
    })
  });

  tosimplify=tosimplify.map(function(item, index0) {
    return item.map(function(item, index1){
      return item.map(function(item, index2) {
        return simplify(item, simplifylevel, true);
      })
    })
  });

  file.features.forEach(function(item, index0) {
    item.geometry.coordinates = tosimplify[index0].map(function(item, index1){
      return item.map(function(item, index2){
        return item.map(function(item, index3){
          return [item.x,item.y]
        })
      })
    });
  });


  fs.writeFile('file.json', JSON.stringify(file), function(err){
    if (err) console.log(err);
    console.log('DONE!')
  });
})
