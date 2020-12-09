
//function to get the sum of the hours and minutes when passed in an array of formatted objects and the type of hour ("All","Day","Night") 
export function getTotal(courseHours, hourType) {
    var total = 0;
    for (var i = 0; i < courseHours.length; i++) {
      if (courseHours[i].isDay == hourType || hourType == "All") {
        total += parseInt(courseHours[i].value) + parseInt(courseHours[i].minutes) / 60;
      }
    }
    return total;
  }

