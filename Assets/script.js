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

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').click(function(event) {
    var parent = $(this).parent().attr('id');
    var textArea = $(this).siblings('.description').val();
    localStorage.setItem(parent, textArea);
  });

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Tests and manipulates variables depending on the time of day
  console.log(hourVal, amOrPm);
  // DELETE LATER vvv
  hourVal = 1;

  var valTime = parseInt(hourVal);
  if (amOrPm === 'PM'){
    valTime+=10;
  }
  // Changes the time up
  // DELETE LATER
  $('#upBtn').click(function(event){
    valTime+=1;
    console.log(valTime);
    rightTime()
  });
  $('#date-time').text(valTime);
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
 
  function rightText(){
    // Repeats for each text block
    $('.description').each(function () {
      var parent = $(this).parent().attr('id');
      $(this).text(localStorage.getItem(parent))
    })
  };

  // Adds
  $('#weekDay').text(weekDay);
  $('#currentDay').text(currentDay);
  $('#currentTime').text(theTime);

  rightTime();
  rightText()
});
