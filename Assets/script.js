// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs();
  var weekDay = now.format('dddd');
  var currentDay = now.format('MMMM D, YYYY');
  var theTime = now.format('hh:mm a');
  var hourVal = now.format('h');
  var amOrPm = now.format('A');

  // Adds text content to local storage when save button is clicked
  $('.saveBtn').click(function(event) {
    var parent = $(this).parent().attr('id');
    var textArea = $(this).siblings('.description').val();
    localStorage.setItem(parent, textArea);
  });

  // Tests and manipulates variables depending on the time of day
  var valTime = parseInt(hourVal);
  if (amOrPm === 'PM'){
    valTime+=10;
  }
  
  // Changes color of boxes to represent past, current, and future with class name changes
  function rightTime(){
    // Repeats for each hr block
    $('.time-block').each(function () {
      var timeID = parseInt($(this).attr('id').split('hour-')[1]);
      
      // Changes class to present if the actual time matches the timeID
      if (timeID === valTime){
        $(this).addClass('present')
        $(this).removeClass('past');
        $(this).removeClass('future');
      }

      // Changes class to future if the actual time is higher than the timeID
      if (timeID > valTime){
        $(this).addClass('future')
        $(this).removeClass('present');
        $(this).removeClass('past');
      }

      // Changes class to past if the actual time is less than the timeID
      if (timeID < valTime){
        $(this).addClass('past')
        $(this).removeClass('future');
        $(this).removeClass('present');
      }

   })
   
  };
 
  // Ties the local storage to the time block textareas
  function rightText(){
    // Repeats for each text block
    $('.description').each(function () {
      var parent = $(this).parent().attr('id');
      $(this).text(localStorage.getItem(parent))
    })
  };

  // Adds the time to the top of the page
  $('#weekDay').text(weekDay);
  $('#currentDay').text(currentDay);
  $('#currentTime').text(theTime);

  rightTime();
  rightText();
});
