$(document).ready(function(){
  var $modalBody = $(".modal-body");
  var $modal = $(".modal");
  var $modalImage = $("#modal-img");
  var $images = $(".target");

  $($images).click(function(e){
    $modalImage[0].src = e.target.src;
    $modal[0].style.display = "block";
  });

  $($modal).click(function(){
    $modal[0].style.display = "none";
  });
});