// Load google charts
$(document).ready(function(){

  google.charts.load('current', {'packages':['corechart']});

  $.ajax({
    type: "GET",
    url: '/location-data',
    success: function(result){

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Location', 'Number of Entries'],
          ['Bathroom', result.Bathroom],
          ['Nurse', result.Nurse],
          ['Main Office', result.Main_Office],
          ['Other', result.Other],
        ]);

        // Optional; add a title and set the width and height of the chart
        var options = {'title':'Location and Number of Student Entries', 'width':350, 'height':225,'is3D':true};

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }

      console.log(result);
        google.charts.setOnLoadCallback(drawChart)


      }
  });


});
