const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");

const yearCount = document.getElementById("year-count");
const monthCount = document.getElementById("month-count");
const dayCount = document.getElementById("day-count");

var currentYear = new Date().toJSON().slice(0, 4);
var currentMonth = new Date().toJSON().slice(5, 7);
var currentDay = new Date().toJSON().slice(8, 10);

const value_error1 = document.getElementById("required-error1");
const value_error2 = document.getElementById("required-error2");
const value_error3 = document.getElementById("required-error3");

const date_error = document.getElementById("day-error");
const negativeYear = document.getElementById("yearError");

function checkErrors() {
  if (
    monthInput.value === "" ||
    yearInput.value === "" ||
    dayInput.value === "" ||
    dayInput.value > 31 ||
    dayInput.value < 1 ||
    monthInput.value > 12 ||
    monthInput.value < 1 ||
    yearInput.value > 2022 ||
    yearInput.value < 1 ||
    checkMonthErrors()
  ) {
    return true;
  } else return false;
}

function clearErrors() {
  yearInput.classList.remove("blank-error");
  yearInput.nextElementSibling.style.display = "none";
  monthInput.classList.remove("blank-error");
  monthInput.nextElementSibling.style.display = "none";
  dayInput.classList.remove("blank-error");
  dayInput.nextElementSibling.style.display = "none";
  value_error1.nextElementSibling.style.display = "none";
  value_error2.nextElementSibling.style.display = "none";
  value_error3.nextElementSibling.style.display = "none";
  date_error.nextElementSibling.style.display = "none";
  negativeYear.nextElementSibling.style.display = "none";
}

function calculation() {
  var _years = Number(currentYear) - Number(yearInput.value);
  var _months;
  var _days;

  if (Number(currentDay) == Number(dayInput.value)) _days = 0;
  if (Number(currentMonth) == Number(monthInput.value)) {
    if (Number(currentDay) < Number(dayInput.value)) {
      _years--;
    }
    _months = 12 - Number(monthInput.value) + Number(currentMonth);
    if(Number(currentDay) >= Number(dayInput.value)){
      _months = 0;
    }
  }

  if (Number(currentMonth) < Number(monthInput.value)) {
    _years--;
    _months = 12 - Number(monthInput.value) + Number(currentMonth);
  } else if (Number(currentMonth) > Number(monthInput.value)) {
    _months = Number(currentMonth) - Number(monthInput.value);
  }

  if (Number(currentDay) < Number(dayInput.value)) {
    if (_months != 0) _months--;
    _days = 30 - Number(dayInput.value) + Number(currentDay);
  } else if (Number(currentDay) > Number(dayInput.value)) {
    _days = Number(currentDay) - Number(dayInput.value);
  }

  dayCount.textContent = _days;
  monthCount.textContent = _months;
  yearCount.textContent = _years;
}

function blankError() {
  if (yearInput.value === "") {
    yearInput.classList.add("blank-error");
    yearInput.nextElementSibling.style.display = "block";
  }
  if (monthInput.value === "") {
    monthInput.classList.add("blank-error");
    monthInput.nextElementSibling.style.display = "block";
  }
  if (dayInput.value === "") {
    dayInput.classList.add("blank-error");
    dayInput.nextElementSibling.style.display = "block";
  }
}

function getDaysInFebruary(yearInput) {
  if ((yearInput.value % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return 29;
  } else {
    return 28;
  }
}

function checkMonthErrors() {
  if (
    (monthInput.value == 4 ||
      monthInput.value == 6 ||
      monthInput.value == 9 ||
      monthInput.value == 11) &&
    dayInput.value == 31
  ) {
    return true;
  } else if (
    monthInput.value == 2 &&
    getDaysInFebruary(yearInput.value) < dayInput.value
  ) {
    return true;
  } else return false;
}

function invalidError() {
  if (
    (dayInput.value > 31 || dayInput.value < 1) &&
    dayInput.value != "" &&
    !checkMonthErrors()
  ) {
    dayInput.classList.add("blank-error");
    value_error1.nextElementSibling.style.display = "block";
  }
  if (
    (monthInput.value > 12 || monthInput.value < 1) &&
    monthInput.value != ""
  ) {
    monthInput.classList.add("blank-error");
    value_error2.nextElementSibling.style.display = "block";
  }
  if (
    monthInput.value == 4 ||
    monthInput.value == 6 ||
    monthInput.value == 9 ||
    monthInput.value == 11
  ) {
    if (dayInput.value == 31) {
      dayInput.classList.add("blank-error");
      date_error.nextElementSibling.style.display = "block";
    }
  }
  if (
    monthInput.value == 2 &&
    getDaysInFebruary(yearInput.value) < dayInput.value
  ) {
    dayInput.classList.add("blank-error");
    date_error.nextElementSibling.style.display = "block";
  }
  if (yearInput.value > 2022 && yearInput.value != "") {
    yearInput.classList.add("blank-error");
    value_error3.nextElementSibling.style.display = "block";
  }
  if (yearInput.value < 1 && yearInput.value != "") {
    yearInput.classList.add("blank-error");
    negativeYear.nextElementSibling.style.display = "block";
  }
}

function calculateAge() {
  if (checkErrors()) {
    clearErrors();
    blankError();
    invalidError();
    return;
  } else {
    clearErrors();
    calculation();
  }
}

icon.addEventListener("click", calculateAge);

year.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    calculateAge();
  }
});
month.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    calculateAge();
  }
});
day.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    calculateAge();
  }
});
