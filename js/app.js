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
let comresult
let response

if (localStorage.getItem('format') != null) {
    var format = document.querySelector(`#${localStorage.getItem('format')}`)
}
else {
    format = document.getElementById('days')
}


window.onload = () => {
    getDayOptions1();
    getDayOptions2();
    getMonth1();
    getMonth2();
    getYear1();
    getYear2();
    getResult(format);
}

window.onchange = () => {
    loading();

    //Uncomment if loading is annoying
    //getResult(format);
    //persistData();
}

document.getElementById('select-month-1').addEventListener('click', getDayOptions1)
document.getElementById('select-month-2').addEventListener('click', getDayOptions2)

//This is to handle the leap year case
document.getElementById('select-year-1').addEventListener('change', getDayOptions1)
document.getElementById('select-year-2').addEventListener('change', getDayOptions2)

//regular expression preventing non-numeric input
document.getElementById('select-year-1').addEventListener('keydown', regEx)
document.getElementById('select-year-2').addEventListener('keydown', regEx)

function regEx (evt) {
    if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
    }
}

function addCommas() {
    
    if (result === null) return;
    result = (result.toString().split('')
        .reverse()
        .map((digit, index) => index != 0 && index % 3 === 0 ? `${digit},` : digit)
        .reverse()
        .join(''));

    return result;
}

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

function getResult(format) {

    month1 = document.getElementById('select-month-1').value;
    day1 = document.getElementById('select-day-1').value;
    year1 = document.getElementById('select-year-1').value;
    date1 = moment(`${month1}/${day1}/${year1}`);

    month2 = document.getElementById('select-month-2').value;
    day2 = document.getElementById('select-day-2').value;
    year2 = document.getElementById('select-year-2').value;
    date2 = moment(`${month2}/${day2}/${year2}`);

    if (localStorage.getItem('response') != null) {
        result = localStorage.getItem('response');
    }
    else if (format.value == 'days') {
        format.value = 'days';
        result = moment(date2).diff(moment(date1), 'd');
    }
    else if (format.value == 'seconds') {
        result = moment(date2).diff(moment(date1), 's');
    }
    else if (format.value == 'minutes') {
        result = moment(date2).diff(moment(date1), 'm');
    }
    else if (format.value == 'hours') {
        result = moment(date2).diff(moment(date1), 'h');
    }

    let displayDate1 = moment(date1).format('MM/DD/YYYY')
    let displayDate2 = moment(date2).format('MM/DD/YYYY')

    switch (true) {
        case (result == 0):
            response = `You're living in the here and now, baby!`;
            document.getElementById('result').innerHTML = response;
            break;
        case (result > 0):
            addCommas();
            response = `On this lovely date of ${displayDate1},\ <br><br> \ ${displayDate2} is ${result} ${format.value} from now.`;
            document.getElementById('result').innerHTML = response;
            break;
        case (result < 0):
            addCommas();
            response = `On this lovely date of ${displayDate1},\ <br><br> \ ${displayDate2} was ${result * -1} ${format.value} ago.`;
            document.getElementById('result').innerHTML = response;
    }

    localStorage.setItem('result', result);
    localStorage.setItem('format', format.value);
}

function persistData() {
    localStorage.clear()
    localStorage.setItem('first-date', moment(date1).format('MM/DD/YYYY'));
    localStorage.setItem('second-date', moment(date2).format('MM/DD/YYYY'));
}

function loading() {
    var num = 1;
    for (i = 1; i <= 88; i++) {
        document.getElementById('result').outerHTML = '<h2 class="hide" id="result"></h2>';
        document.getElementById('Marty').outerHTML = '<h2 id="Marty"></h2>';
        document.getElementById('Marty').innerHTML = 'Marty, floor it!';
        document.getElementById('mph').outerHTML = '<h3 id="mph"></h3>';

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `#mph::after { background-image: url(/img/delorean2.gif)\ ; \
                                            transform: rotateY(180deg)\ ; \
                                            margin-top: -55px\ ; \
                                            margin-left: 70px\ ; \
                                            border-radius: 50%\ ; \
                                            width: 100px\ ; \
                                            height: 100px\ ; \
                                            display: inline-block\ ; \
                                            background-size: 100px 100px\ ; \
                                            content: "" }`;
        document.getElementsByTagName('head')[0].appendChild(style);

        setTimeout(() => {
            document.getElementById('mph').innerHTML = num + ' ' + 'mph';
            num++;
            if (num == 88) {
                document.getElementById('Marty').innerHTML = 'Great Scott!';
                document.getElementById('mph').outerHTML = '<h3 class="hide" id="mph"></h3>';
                setTimeout(function () {
                    getResult(format);
                    persistData();
                }, 500)
            }
            
        }, i * (100 - (.6 * i)));
        
        setTimeout(function () {
            document.getElementById('Marty').outerHTML = '<h2 class="hide" id="Marty"></h2>';
        }, 4500)
    };
    console.log(i * (100 - (.6 * i)))
    document.getElementById('result').removeAttribute('class', 'hide');

}
