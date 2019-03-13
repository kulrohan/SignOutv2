// $('#fbtn').on('click', function(){
//   console.log('test');
// });
function fbtn(){
  var filter = document.getElementById("filter").value;
  var type = document.getElementById("filter-type").value;
  if (type == "ID"){
    type = 'id';
  }
  else if (type == "Location"){
    type = 'location';
  }
  else if (type == "Time"){
    type = 'time';
  }
  $.ajax({
    type: "GET",
    url: window.location + '/filter-log?filter=' + filter + '&type=' + type,
    success: function(result){
      google.charts.load('current', {'packages':['table']});
        google.charts.setOnLoadCallback(drawTable);

        function drawTable() {
          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Entry Number'); //sorted in numerical order
          data.addColumn('number', 'Student ID');
          data.addColumn('string', 'Location');  //sorted all true, all false
          data.addColumn('string', 'Time');  // string is sorted in alphabetical order, time works in order

          console.log(result.length);

          var i;
          for (i=0; i < result.length; i++) {
            data.addRows([[
              result[i].entry, {v:result[i].id, f:result[i].id.toString()}, result[i].location, result[i].time
            ]]);

          }

          var table = new google.visualization.Table(document.getElementById('filter-table'));

          table.draw(data, {showRowNumber: false, width: '100%', height: '50%'}); //adjust width to size --> 100 is best
        }
    }
  });
}
// $('#filter-btn').on('click', function(){

    // $.ajax({
    //   type: 'GET',
    //   url: window.location + '/filter-log?filter=' + filter + '&type=' + type,
    //   success: function(){

    //   }
    // })
// });
