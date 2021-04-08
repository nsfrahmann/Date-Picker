let currentMonth = moment().format('MM');
let currentDay = moment().format('DD');
let currentYear = moment().year();
let month1
let month2
let day1
let day2
let year1
let year2

let dayArray1
let dayArray2
let i
let number

let date1
let date2

let result
let response


window.onload = () => {
    getDayOptions1();
    getDayOptions2();
    getMonth1();
    getMonth2();
    getYear1();
    getYear2();
    getResult();
}

window.onchange = () => {
    getResult();
    persistData();
}

document.getElementById('select-month-1').addEventListener('click', getDayOptions1)
document.getElementById('select-month-2').addEventListener('click', getDayOptions2)

//This is to handle the leap year case
document.getElementById('select-year-1').addEventListener('change', getDayOptions1)
document.getElementById('select-year-2').addEventListener('change', getDayOptions2)


function getMonth1() {
    let monthArray = document.getElementById('select-month-1').children;

    for (let i = 0; i < monthArray.length; i++) {
        if (localStorage.getItem('first-date') != null) {
            let parts = localStorage.getItem('first-date').split('/');

            if (monthArray[i].value == parts[0]) {
                monthArray[i].setAttribute('selected', 'selected');
                month1 = parts[0];
                break;
            }
        }
        else if (monthArray[i].value == currentMonth) {
            monthArray[i].setAttribute('selected', 'selected');
            month1 = currentMonth;
            break;
        }
    }
}

function getMonth2() {
    let monthArray = document.getElementById('select-month-2').children;
    for (let i = 0; i < monthArray.length; i++) {
        if (localStorage.getItem('second-date') != null) {
            let parts = localStorage.getItem('second-date').split('/');

            if (monthArray[i].value == parts[0]) {
                monthArray[i].setAttribute('selected', 'selected');
                month2 = parts[0];
                break;
            }
        }
        else if (monthArray[i].value == currentMonth) {
            monthArray[i].setAttribute('selected', 'selected');
            month2 = currentMonth;
            break;
        }
    }
}

function getYear1() {
    if (localStorage.getItem('first-date') != null) {
        let parts = localStorage.getItem('first-date').split('/');
        document.getElementById('select-year-1').setAttribute('value', parts[2]);
    }
    else {
        document.getElementById('select-year-1').setAttribute('value', currentYear);
    }
}

function getYear2() {
    if (localStorage.getItem('second-date') != null) {
        let parts = localStorage.getItem('second-date').split('/');
        document.getElementById('select-year-2').setAttribute('value', parts[2]);
    }
    else {
        document.getElementById('select-year-2').setAttribute('value', currentYear);
    }
}

function getDayOptions1() {

    let monthInput1 = document.getElementById('select-month-1').value;
    let yearInput1 = document.getElementById('select-year-1').value;

    dayArray1 = Array.from(Array(moment(`${yearInput1}-${monthInput1}`).daysInMonth()), (_, i) => i + 1)

    document.getElementById('select-day-1').innerHTML = '';

    for (let i = 0; i < dayArray1.length; i++) {
        document.getElementById('select-day-1').innerHTML += `<option value="${dayArray1[i]}">${dayArray1[i]}</option>`;
    }

    let dayOptionArray1 = document.getElementById('select-day-1').children;

    for (let i = 0; i < dayOptionArray1.length; i++) {
        if (localStorage.getItem('first-date') != null) {
            let parts = localStorage.getItem('first-date').split('/');

            if (dayOptionArray1[i].value == parseInt(parts[1], 10)) {
                dayOptionArray1[i].setAttribute('selected', 'selected');
                day2 = dayOptionArray1[i].value;
                break;
            }
        }
        else if (dayOptionArray1[i].value == parseInt(currentDay, 10)) {
            dayOptionArray1[i].setAttribute('selected', 'selected');
            day2 = dayOptionArray1[i].value;
            break;
        }
    }
}

function getDayOptions2() {

    let monthInput2 = document.getElementById('select-month-2').value;
    let yearInput2 = document.getElementById('select-year-2').value;

    dayArray2 = Array.from(Array(moment(`${yearInput2}-${monthInput2}`).daysInMonth()), (_, i) => i + 1)

    document.getElementById('select-day-2').innerHTML = '';

    for (let i = 0; i < dayArray2.length; i++) {
        document.getElementById('select-day-2').innerHTML += `<option value="${dayArray2[i]}">${dayArray2[i]}</option>`;
    }

    let dayOptionArray2 = document.getElementById('select-day-2').children

    for (let i = 0; i < dayOptionArray2.length; i++) {
        if (localStorage.getItem('second-date') != null) {
            let parts = localStorage.getItem('second-date').split('/');

            if (dayOptionArray2[i].value == parseInt(parts[1], 10)) {
                dayOptionArray2[i].setAttribute('selected', 'selected');
                day2 = dayOptionArray2[i].value;
                break;
            }
        }
        else if (dayOptionArray2[i].value == parseInt(currentDay, 10)) {
            dayOptionArray2[i].setAttribute('selected', 'selected');
            day2 = dayOptionArray2[i].value;
            break;
        }
    }
}

function getResult() {

    month1 = document.getElementById('select-month-1').value;
    day1 = document.getElementById('select-day-1').value;
    year1 = document.getElementById('select-year-1').value;
    date1 = moment(`${month1}/${day1}/${year1}`);

    month2 = document.getElementById('select-month-2').value;
    day2 = document.getElementById('select-day-2').value;
    year2 = document.getElementById('select-year-2').value;
    date2 = moment(`${month2}/${day2}/${year2}`);

    result = moment(date2).diff(moment(date1), 'days');

    let displayDate1 = moment(date1).format('MM/DD/YYYY')
    let displayDate2 = moment(date2).format('MM/DD/YYYY')

    switch (true) {
        case (result == 0):
            response = `You're living in the here and now, baby!`;
            document.getElementById('result').innerHTML = response;
            break;
        case (result > 0):
            response = `On this lovely date of ${displayDate1},\ <br></br> \ ${displayDate2} is ${result} days from now.`;
            document.getElementById('result').innerHTML = response;
            break;
        case (result < 0):
            response = `On this lovely date of ${displayDate1},\ <br></br> \ ${displayDate2} was ${result * -1} days ago.`;
            document.getElementById('result').innerHTML = response;
    }
}

function persistData() {
    localStorage.clear()
    localStorage.setItem('first-date', moment(date1).format('MM/DD/YYYY'));
    localStorage.setItem('second-date', moment(date2).format('MM/DD/YYYY'));
}
