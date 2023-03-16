$('.sideBar').click(function(){
    $('.sideBar_Content').show(1000)
        $(".sideBar").animate({left:"+=14%"},1000)
        $(".content").animate({left:"+=10%"},1000)


})

$('.fa-xmark').click(function(){
    $('.sideBar_Content').hide(1000)
    $(".sideBar").animate({left:"-=14%"},1000)
    $(".content").animate({left:"-=10%"},1000)
})
$("h3").click(function(){       
  $(this).next().slideToggle(1000)

})
function getCounter(){

  let countDown = new Date("Jul 12, 2022 20:00:00").getTime();
  let current = new Date().getTime();
  let timeLeft = countDown - current;
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
 
  $("#days").html( days+ "<span>D</span>").css("fontSize","20px") ;
  $("#hours").html(hours + "<span>h</span>").css("fontSize","20px");
  $("#minutes").html(minutes + "<span>m</span>") .css("fontSize","20px");
  $("#seconds").html(seconds + "<span>Sec</span>").css("fontSize","20px") ;	
}

setInterval(function(){getCounter();},1000)
  
    
$('textarea').keyup(function() {
  let max = 100;
  let current = $(this).val().length;
  if (current >= max) {
    $('#char').text(' your available character finished ');
  } else {
    let char = max - current;
    $('#char').text(char);
  }
});