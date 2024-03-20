const currentDay = moment().format('MMMM Do YYYY, h:mm:ss a');
document.getElementById("currentDay").textContent = currentDay;

const localSettings = {};
dayjs.locale(localSettings);

$(function () {
const currentHour = dayjs().format('H');
function hourlyColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }

function textEntry() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

function refreshColor() {
    $('.time-block').each(function() {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
});

hourlyColor();
textEntry();
refreshColor();

});
