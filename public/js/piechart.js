// Load google charts
$(document).ready(function(){

  google.charts.load('current', {'packages':['corechart']});

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['yeet', 8],
      ['Friends', 2],
      ['Eat', 2],
      ['TV', 2],
      ['Gym', 2],
      ['Sleep', 8]
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {'title':'Location Records by Students', 'width':350, 'height':225};

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }


  $.ajax({
    type: "GET",
    url: '/location-data',
    success:
        // Draw the chart and set the chart values
        google.charts.setOnLoadCallback(drawChart)

  });


});
