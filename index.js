//100% -> 85%
// 75% -> 85%
// 50% -> 85%

let btn = document.getElementById("btn");
let quater = document.getElementById("inputName");
let percentage = document.getElementById("inputEmail");
let totalDaysFinal = 0;

let result = document.getElementById("result");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (quater.value != "" && percentage.value != "") {
    let firstValue = getFirstValue(quater.value);
    totalDaysFinal = quaterCall(firstValue);
    let totalWFO = targeDays(totalDaysFinal, percentage.value);
    debugger;
    addResultText(totalWFO, totalDaysFinal);
  } else {
    addResultText();
  }
});

function addResultText(totalWFO) {
  if (totalWFO > 0) {
    let parentContainer = document.getElementById("parentContainer");
    // Add content to the new div (e.g., a heading and some text)
    
    result.innerText = `Result : You can do ${
      totalDaysFinal - totalWFO
    } WFH in this Quater`;
  }
  else{
    result.classList.add("text-center")
    result.innerText = `Please Enter Quater and Target Percentage`;
  }
}

function targeDays(totalDays, targetPercentage) {
  targetPercentage = targetPercentage / 100;
  let requiredDays = Math.ceil(totalDays * targetPercentage);
  return requiredDays;
}

function quaterCall(firstValue) {
  let totalDays = 0;
  for (let index = 0; index < 3; index++) {
    totalDays = totalDays + getWorkingDaysInMonth(2024, firstValue);
    firstValue++;
  }
  return totalDays;
}

function getFirstValue(inputString) {
  // Split the string by the delimiter (dash)
  let parts = inputString.split("-");
  let partNum = Number(parts[0]);
  // Return the first part, converted to a number (if needed)
  return partNum;
}

function getWorkingDaysInMonth(year, month) {
  // month is zero-based (0 for January, 1 for February, etc.)
  let startDate = new Date(year, month, 1);
  let endDate = new Date(year, month + 1, 0); // Last day of the month

  let workingDays = 0;

  // Iterate over each day in the month
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    let dayOfWeek = date.getDay();
    // Count weekdays (Monday=1, Tuesday=2, ..., Friday=5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      workingDays++;
    }
  }

  return workingDays;
}
