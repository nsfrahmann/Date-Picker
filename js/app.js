
//Current values for page load
let currentMonth = moment().format('MM');
let currentDay = moment().format('DD');
let currentYear = moment().year();

//Input values
let month1;
let month2;
let day1;
let day2;
let year1;
let year2;

//Day option arrays for current month
let dayArray1;
let dayArray2;

//Date in MM/DD/YYYY format
let date1;
let date2;

//Result
let result;
let response;

//Miscellaneous for clean console
let i;
let number;

//Input elements
let monthSelect1 = document.getElementById('select-month-1');
let monthSelect2 = document.getElementById('select-month-2');
let yearSelect1 = document.getElementById('select-year-1');
let yearSelect2 = document.getElementById('select-year-2');
let daySelect1 = document.getElementById('select-day-1');
let daySelect2 = document.getElementById('select-day-2');

//Variable declaration to get and persist time format
if (localStorage.getItem('format') != null) {
    var format = document.querySelector(`#${localStorage.getItem('format')}`);
}
else {
    format = document.getElementById('days');
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

//Day option switching
monthSelect1.addEventListener('click', getDayOptions1)
monthSelect2.addEventListener('click', getDayOptions2)

//This is to handle the leap year case
yearSelect1.addEventListener('change', getDayOptions1)
yearSelect2.addEventListener('change', getDayOptions2)

//Regular expression preventing non-numeric input
yearSelect1.addEventListener('keydown', regEx)
yearSelect2.addEventListener('keydown', regEx)

function regEx (evt) {
    if (evt.which < 48 && evt.which != 8 || evt.which > 57) {
        evt.preventDefault();
    }
}

//Commas to displayed values
function addCommas() {
    
    if (result === null) {
        return;
    }
    else if (result < 0 ) {
        result = ((result * -1).toString().split('')
            .reverse()
            .map((digit, index) => index != 0 && index % 3 === 0 ? `${digit},` : digit)
            .reverse()
            .join(''));
    }
    else {
        result = (result.toString().split('')
            .reverse()
            .map((digit, index) => index != 0 && index % 3 === 0 ? `${digit},` : digit)
            .reverse()
            .join(''));
    }
    

    return result;
}

//Get current month or last selected month on page load
function getMonth1() {
    let monthArray = monthSelect1.children;

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
    let monthArray = monthSelect2.children;
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

//Get current year or last selected month on page load
function getYear1() {
    if (localStorage.getItem('first-date') != null) {
        let parts = localStorage.getItem('first-date').split('/');
        yearSelect1.setAttribute('value', parts[2]);
    }
    else {
        yearSelect1.setAttribute('value', currentYear);
    }
}

function getYear2() {
    if (localStorage.getItem('second-date') != null) {
        let parts = localStorage.getItem('second-date').split('/');
        yearSelect2.setAttribute('value', parts[2]);
    }
    else {
        yearSelect2.setAttribute('value', currentYear);
    }
}

//Get current day or last selected day on page load
function getDayOptions1() {

    let monthInput1 = monthSelect1.value;
    let yearInput1 = yearSelect1.value;

    dayArray1 = Array.from(Array(moment(`${yearInput1}-${monthInput1}`).daysInMonth()), (_, i) => i + 1);

    daySelect1.innerHTML = '';

    for (let i = 0; i < dayArray1.length; i++) {
        daySelect1.innerHTML += `<option value="${dayArray1[i]}">${dayArray1[i]}</option>`;
    }

    let dayOptionArray1 = daySelect1.children;

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

    let monthInput2 = monthSelect2.value;
    let yearInput2 = yearSelect2.value;

    dayArray2 = Array.from(Array(moment(`${yearInput2}-${monthInput2}`).daysInMonth()), (_, i) => i + 1);

    daySelect2.innerHTML = '';

    for (let i = 0; i < dayArray2.length; i++) {
        daySelect2.innerHTML += `<option value="${dayArray2[i]}">${dayArray2[i]}</option>`;
    }

    let dayOptionArray2 = daySelect2.children;

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

//Spit out result and cache
function getResult(format) {

    month1 = monthSelect1.value;
    day1 = daySelect1.value;
    year1 = yearSelect1.value;
    date1 = moment(`${month1}/${day1}/${year1}`);

    month2 = monthSelect2.value;
    day2 = daySelect2.value;
    year2 = yearSelect2.value;
    date2 = moment(`${month2}/${day2}/${year2}`);

    switch (true) {
        case (format.value == 'days'):
            result = moment(date2).diff(moment(date1), 'd');
            break;
        case (format.value == 'hours'):
            result = moment(date2).diff(moment(date1), 'h');
            break
        case (format.value == 'minutes'):
            result = moment(date2).diff(moment(date1), 'm');
            break;
        case (format.value == 'seconds'):
            result = moment(date2).diff(moment(date1), 's');
            break;
    }

    let displayDate1 = moment(date1).format('MM/DD/YYYY');
    let displayDate2 = moment(date2).format('MM/DD/YYYY');

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
            response = `On this lovely date of ${displayDate1},\ <br><br> \ ${displayDate2} was ${result} ${format.value} ago.`;
            document.getElementById('result').innerHTML = response;
    }

    localStorage.setItem('result', result);
    localStorage.setItem('format', format.value);
}

//Cache date for select fields
function persistData() {
    localStorage.clear()
    localStorage.setItem('first-date', moment(date1).format('MM/DD/YYYY'));
    localStorage.setItem('second-date', moment(date2).format('MM/DD/YYYY'));
}

//Optional loader animation
function loading() {

    getResult(format);
    persistData();

    if (document.getElementById('mph').innerHTML.length != 0) {
        return;
    }

    let num = 1;
    for (i = 1; i <= 88; i++) {

        document.getElementById('seconds').setAttribute('disabled', 'disabled');
        document.getElementById('minutes').setAttribute('disabled', 'disabled');
        document.getElementById('hours').setAttribute('disabled', 'disabled');
        document.getElementById('days').setAttribute('disabled', 'disabled');

        document.getElementById('result').outerHTML = '<h2 class="hide" id="result"></h2>';
        document.getElementById('Marty').outerHTML = '<h2 id="Marty"></h2>';
        document.getElementById('Marty').innerHTML = 'Marty, floor it!';
        document.getElementById('mph').outerHTML = '<h3 id="mph"></h3>';

        if (i == 1) {
            let style = document.createElement('style');
            style.type = 'text/css';
            style.setAttribute('id', 'load-gif');
            style.innerHTML = `#mph::after { background-image: url(/img/delorean.gif)\ ; \
                                            transform: rotateY(180deg)\ ; \
                                            margin-top: -55px\ ; \
                                            margin-left: 70px\ ; \
                                            border-radius: 50%\ ; \
                                            width: 115px\ ; \
                                            height: 115px\ ; \
                                            display: inline-block\ ; \
                                            background-size: 115px 115px\ ; \
                                            content: "" }`;
            document.getElementsByTagName('head')[0].appendChild(style);
        }

        (setTimeout(() => {
            document.getElementById('mph').innerHTML = num + ' ' + 'mph';
            num++;
            if (num == 88) {
                document.getElementById('Marty').innerHTML = 'Great Scott!';
                document.getElementById('mph').outerHTML = '<h3 class="hide" id="mph"></h3>';

                document.getElementById('seconds').removeAttribute('disabled', 'disabled');
                document.getElementById('minutes').removeAttribute('disabled', 'disabled');
                document.getElementById('hours').removeAttribute('disabled', 'disabled');
                document.getElementById('days').removeAttribute('disabled', 'disabled');

                setTimeout(() => {
                    document.getElementById('Marty').outerHTML = '<h2 class="hide" id="Marty"></h2>';
                    document.getElementById('result').removeAttribute('class', 'hide');
                    document.getElementById('result').innerHTML = response;
                    document.getElementById('mph').innerHTML = '';
                    document.getElementById('load-gif').remove();
                }, 500)
            }
            
        }, i * (100 - (.6 * i))) )
    }
}
