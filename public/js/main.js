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

ajaxGet();

});
