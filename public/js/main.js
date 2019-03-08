$(document).ready(function() {

  $("#get-btn").on('click', function(){
    //get request
    function ajaxGet(){
      $.ajax({
        type: "GET",
        url : window.location + '/ajax-get',
        success: function(result){
          console.log('success');
          console.log(result);
          // console.log(result[0].id);
          // $("#demo").html(result[4].location)
        }
      });
    }
    ajaxGet();
  });


  $('#btn').on('click', function(){
    console.log('running postajax');
    //the following JSON file has to have input which is stored by reading HTML file input

  });

  $('#submit-post').on('click', function(){

    $.ajax({
      type: "GET",
      url : '/max-entry',
      success: function(result){
        console.log('success');
        console.log(result.max);
        var next_entry = result.max + 1;
        var identification = document.getElementById("id").value;
        var location = document.getElementById("loc").value;
        var post_json = {Entry: next_entry, id: identification, location: location, time: null}; //time is null, to be added in server
        console.log(post_json);
        window.location = '/ajax-post?entry=' + next_entry + '&id=' + identification + '&loc=' + location
        alert('Recorded successfully!')


      }
    });


  });

  $('#randomid').on('click', function(){
    var location = document.getElementById("stud-loc").value;
    $.ajax({
      type: "POST",
      url: "/student_record?loc=" + location,
      success: alert('Recorded successfully!')
    });
    // $.ajax({
    //   type: "GET",
    //   url : '/max-entry',
    //   success: function(result){
    //     console.log('success');
    //     console.log(result.max);
    //     var next_entry = result.max + 1;
    //     var location = document.getElementById("stud-loc").value;
    //     var post_json = {Entry: next_entry, id: identification, location: location, time: null}; //time is null, to be added in server
    //     console.log(post_json);
    //     window.location = '/student_record?entry=' + next_entry + '&loc=' + location
    //     alert('Recorded successfully!')
    //
    //   }
    // });
    // $.ajax({
    //   type: "GET",
    //   url : '/max-entry',
    //   success: function(result){
    //     console.log('success');
    //     console.log(result.max);
    //     var next_entry = result.max + 1;
    //     var location = document.getElementById("stud-loc").value;
    //     var post_json = {Entry: next_entry, id: identification, location: location, time: null}; //time is null, to be added in server
    //     console.log(post_json);
    //     window.location = '/ajax-post?entry=' + next_entry + '&id=' + identification + '&loc=' + location
    //     alert('Recorded successfully!')
    //
    //
    //   }
    // });
    // window.location = '/student_record?test=val';
        // $.ajax({
        //   type: "GET",
        //   url: "/student_record?test=" + result.max,
        //   success: function(){
        //   }
        // })
      // }
    // });

  });


  $('.logout').on('click', function(){

    window.location = '/login';

  });

  $('#login-button').on('click', function(){
    var user = document.getElementById('uname').value;
    var password = document.getElementById('passwd').value;
    $.ajax({
      type: 'GET',
      url: window.location.href + '/authenticate?username=' + user + '&pwd=' + password,
      success: function(result){
        if (result.id == 'ic'){ //incorrect case
          alert('The username or password is incorrect.');
          window.location = '/login';
        }
        else{ //CASE: student id
          console.log(result.id);
          if (result.id == 'admin'){
            //admin code
            window.location = '/admin'
          }
          else{
            window.location = '/student'; //redirect to admin page or student page
          }
        }
      }
    });
  });


  $('#admin-log').on('click', function(){
    window.location = '/log';
  });
  $('#admin-record').on('click', function(){
    window.location = '/record';
  });
  $('#admin-analytics').on('click', function(){
    window.location = '/analytics'; //change to analytics page
  });


});
