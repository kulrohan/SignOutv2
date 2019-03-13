$(document).ready(function(){

  google.charts.load('current', {packages: ['corechart', 'bar']});

  $.ajax({
    type: "GET",
    url: '/time',
    success:  function(result){
    function drawBasic() {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Date');
          data.addColumn('number', 'Number of Entries');

          data.addRows([
            [{v: '8 am'}, 1],
            [{v: '8 am'}, 1],
            [{v: '8 am'}, 1],
            [{v: '8 am'}, 1],
            [{v: '8 am'}, 1],

          ]);

          var options = {
            title: 'Student Record Adoption By Date',
            width: 500,
            height: 225,
            legend: { position: "none" },
            hAxis: {
              title: 'Date (past five days)',
              format: 'h:mm a', //?
              viewWindow: {
                min: 0,
                max: 5
              }
            },
            vAxis: {
              title: 'Number of Entries',
              viewWindow: {
                min: 0,
                max: 20
              }
            },
            trendlines: {
                0: {
                  type: 'linear',
                  color: 'green',
                  lineWidth: 3,
                  opacity: 0.5,
                }
              }
          };

          var chart = new google.visualization.ColumnChart(document.getElementById('bartime'));
          chart.draw(data, options);
        }

        google.charts.setOnLoadCallback(drawBasic);


      }

  });


});
