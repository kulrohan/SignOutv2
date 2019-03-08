$.ajax({
  type: "GET",
  url : window.location + '/ajax-get',
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

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: false, width: '100%', height: '50%'}); //adjust width to size --> 100 is best
      }
    }
});
