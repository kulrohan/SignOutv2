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
          console.log(result.values); //how to access data

          var days = {d1: null, d2: null, d3: null, d4: null, d5: null};
          var num_dates = []
          var counts = {c1: 0, c2: 0, c3: 0, c4: 0, c5: 0};

          days.d1 = result.values[0][1] + ' ' + result.values[0][2] + ' ' + result.values[0][3] //month day year
          counts.c1 = 1; //establishes count for day1 at 1 (first value)
          num_dates[0] = result.values[0][2];

          for (x = 1; x < result.values.length; x++){ //start from the second, we know what day 1 is
            if (result.values[x][2] == result.values[0][2]){ //if given day is same as first day
              counts.c1 = counts.c1 + 1;
            }
            else{ //if not same day
              num_dates[1] = result.values[x][2]; //day 2
              days.d2 = result.values[x][1] + ' ' + result.values[x][2] + ' ' + result.values[x][3] //the given day is the second day
              console.log(num_dates);
              break;
             }
          }

          for (y=1; y < result.values.length; y++){
            if (result.values[y][2] == num_dates[1]){ //if given day is same as second day
              counts.c2 = counts.c2 + 1;
            }
            else if (result.values[y][2] != num_dates[1] && result.values[y][2] != num_dates[0]){ //if not first or second day day
              num_dates[2] = result.values[y][2]; //day 3
              days.d3 = result.values[y][1] + ' ' + result.values[y][2] + ' ' + result.values[y][3] //the given day is the third day
              break;
             }
          }

          for (y=1; y < result.values.length; y++){
            if (result.values[y][2] == num_dates[2]){ //if given day is same as third day
              counts.c3 = counts.c3 + 1;
            }
            else if (result.values[y][2] != num_dates[1] && result.values[y][2] != num_dates[0] && result.values[y][2] != num_dates[2]){ //if not first or second or third day day
              num_dates[3] = result.values[y][2]; //day 4
              days.d4 = result.values[y][1] + ' ' + result.values[y][2] + ' ' + result.values[y][3] //the given day is the fourth day
              break;
             }
          }

          for (y=1; y < result.values.length; y++){
            if (result.values[y][2] == num_dates[3]){ //if given day is same as fourth day
              counts.c4 = counts.c4 + 1;
            }
            else if (result.values[y][2] != num_dates[1] && result.values[y][2] != num_dates[0] && result.values[y][2] != num_dates[2] && result.values[y][2] != num_dates[3]){ //if not first or second or third or fourth day
              num_dates[4] = result.values[y][2]; //day 5
              days.d5 = result.values[y][1] + ' ' + result.values[y][2] + ' ' + result.values[y][3] //the given day is the fifth day, and all other days are part of day 5 (as you can only have five days)

              for (y=1; y < result.values.length; y++){
                if (result.values[y][2] == num_dates[4]){ //if given day is same as fifth day
                  counts.c5 = counts.c5 + 1;
                }
              }
              break;
             }
          }

          console.log(days);
          console.log(counts);

          data.addRows([
            [days.d1, counts.c1],
            [days.d2, counts.c2],
            [days.d3, counts.c3],
            [days.d4, counts.c4],
            [days.d5, counts.c5],

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
            colors: ['#42c2f4'],
            vAxis: {
              title: 'Number of Entries',
              viewWindow: {
                min: 0,
                max: 12
              },
              gridlines: {'count':10}
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
