$(document).ready(function() {
//get request
function ajaxGet(){
  $.ajax({
    type: "GET",
    url : window.location + 'ajax',
    success: function(result){
      $("#demo").html(result.elmt2);
    }
  });
}

$("#get-btn").on('click', function(){
  ajaxGet();
});


$('#btn').on('click', function(){
  console.log('running postajax');
  var post_json = {Example:'This is some data being sent to the server'};
  $.ajax({
    type: "POST",
    contentType : "application/json",
    url : window.location + 'ajax-post',
    data : JSON.stringify(post_json),
    dataType : 'json',
    success: $("#demo").html(post_json.Example)
  });
});



});
