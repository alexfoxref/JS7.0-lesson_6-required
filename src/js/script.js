'use strict'

const start = document.getElementById('start'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    expensesInputs = document.getElementsByClassName('expenses-item'),
    btnExpenses = document.getElementsByTagName('button')[0],
    btnOptExpenses = document.getElementsByTagName('button')[1],
    btnCalc = document.getElementsByTagName('button')[2],
    optionalExpensesInputs = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money,
    time;

let strButAct = 'linear-gradient(336deg,#ffbd75,#ff964b),linear-gradient(#fff,#fff)',
    strButNA = 'linear-gradient(336deg,#acacac,#797979),linear-gradient(#fff,#fff)';

btnExpenses.classList.add('non-active');
btnOptExpenses.classList.add('non-active');
btnCalc.classList.add('non-active');

btnExpenses.style.backgroundImage = strButNA;
btnOptExpenses.style.backgroundImage = strButNA;
btnCalc.style.backgroundImage = strButNA;


function toStartGray(item) {
    item.readOnly = true;
    item.disabled = 'disabled';
    item.classList.add('non-active');
    // item.style.backgroundColor = '#acacac';
}

function toStartWhite(item) {
    item.readOnly = false;
    item.disabled = '';
    item.classList.remove('non-active');
    item.style.backgroundColor = '#fff';
}

toStartGray(expensesInputs[0]);
toGray(expensesInputs, 1);
toStartGray(optionalExpensesInputs[0]);
toGray(optionalExpensesInputs, 1);
toStartGray(chooseIncome);
toStartGray(chooseSum);
toStartGray(choosePercent);
toStartGray(yearValue);
toStartGray(monthValue);
toStartGray(dayValue);
toStartGray(checkSavings);

start.addEventListener('click', function() {
    
    btnCalc.classList.remove('non-active');
    btnCalc.style.backgroundImage = strButAct;
    
    toStartWhite(expensesInputs[0]);
    toStartWhite(optionalExpensesInputs[0]);
    toStartWhite(chooseIncome);
    toStartWhite(checkSavings);
    toStartWhite(yearValue);
    toStartWhite(monthValue);
    toStartWhite(dayValue);


    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }

    appData.budget = money;
    if (typeof(time) === 'number' && time.length <= 10 && time.length >= 8) {
        appData.timeData = time;
    } else {
        time = new Date();
    }
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();
});

function toGray(inputs, k) {
    for (let j = k; j < inputs.length; j++) {
        if (inputs[j - 1].value.trim() == '') {
            inputs[j - 1].value = inputs[j - 1].value.trim();
            for (let i = j; i < inputs.length; i++) {
                inputs[i].value = '';
            }
            toStartGray(inputs[j]);
        };
    }
}


btnExpenses.addEventListener('click', function() {
    if (btnExpenses.classList.contains('non-active')) {
        return;
    } else {
        let sum = 0;

        for (let i = 0; i < expensesInputs.length - 1; i++) {
            let answerExpenses,
                answerTotal;
            
            if (expensesInputs[i].value != '') {
                answerExpenses = expensesInputs[i].value;
            
                if (expensesInputs[i + 1].value != '') {
                    answerTotal = expensesInputs[++i].value;
                
                    if ( (typeof(answerExpenses)) === 'string' && (typeof(answerExpenses)) != null && (typeof(answerTotal)) != null 
                        && answerExpenses != '' && answerTotal != '' && answerExpenses.length < 50 ) {
                        console.log('done');
                        appData.expenses[answerExpenses] = +answerTotal;
                        sum += +answerTotal;
                    }
                } else {
                    continue;
                }
            } else {
                continue;
            }
        }
        expensesValue.textContent = sum;
    }
});

function changeActiveInput(expensesinputs) {
    for (let i = 1; i < expensesinputs.length; i++) {
        expensesinputs[i - 1].addEventListener('change', function() {
            toStartWhite(expensesinputs[i]);
            if (expensesinputs[i - 1].value.trim() == '') {
                toGray(expensesinputs, i);
            }
        });
        
        if (expensesinputs[i - 1].value == '') {
            expensesinputs[i - 1].value = expensesinputs[i - 1].value.trim();
            for (let j = i; j < expensesinputs.length; j++) {
                toStartGray(expensesinputs[j]);
            }      
        }
    }
}
changeActiveInput(expensesInputs);
changeActiveInput(optionalExpensesInputs);


function changeActiveButton(expensesinputs, btnexpenses) {
    for (let i = 0; i < expensesinputs.length; i++) {
        expensesinputs[i].addEventListener('change', function () {
            btnexpenses.classList.remove('non-active');
            btnexpenses.style.background = strButAct;    
            
            let counter = 0;
            for (let j = 0; j < expensesinputs.length; j++) {
                if (expensesinputs[j].value.trim() == '') {
                    counter++;
                    expensesinputs[j].value = expensesinputs[j].value.trim();
                }
            }
            if (counter == expensesinputs.length) {
                btnexpenses.classList.add('non-active');
                btnexpenses.style.background = strButNA;                   
            }
        });
    };
}

changeActiveButton(expensesInputs, btnExpenses);
changeActiveButton(optionalExpensesInputs, btnOptExpenses);

btnOptExpenses.addEventListener('click', function() {
    if (btnExpenses.classList.contains('non-active')) {
        return;
    } else {
        for (let i = 1, n = (optionalExpensesInputs.length + 1); i < n; i++) {
            let answerOptExpenses = optionalExpensesInputs[i-1].value;
            
            appData.optionalExpenses[i] = answerOptExpenses;

            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
    }
});

btnCalc.addEventListener('click', function() {

    if (btnCalc.classList.contains('non-active')) {
        return;
    } else {
        if (appData.budget != undefined) {
            appData.moneyPerDay = +((appData.budget - +expensesValue.textContent) / 30).toFixed();
        
            dayBudgetValue.textContent = appData.moneyPerDay;
    
            if (appData.moneyPerDay < 100) {
                levelValue.textContent = 'Минимальный уровень достатка';
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний уровень достатка";
            } else if (appData.moneyPerDay > 2000) {
                levelValue.textContent = "Высокий уровень достатка";
            } else {
                levelValue.textContent = "Произошла ошибка";
            };
        } else {
            dayBudgetValue.textContent = 'Произошла ошибка';
        };
    }
    
});

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
    if (checkSavings.checked) {
        toStartWhite(chooseSum);
        toStartWhite(choosePercent);
    } else {
        toStartGray(chooseSum);
        toStartGray(choosePercent); 
    }
});

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        for (let i = 0; i < chooseSum.value.length; i++) {
            if (chooseSum.value[i] == ',') {
                chooseSum.value = chooseSum.value.slice(0, chooseSum.value.indexOf(',')) + '.';
            };
        };
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    };
});

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        for (let i = 0; i < choosePercent.value.length; i++) {
            if (choosePercent.value[i] == ',') {
                choosePercent.value = choosePercent.value.slice(0, choosePercent.value.indexOf(',')) + '.';
            };
        };
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    };   
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,

    toShowObject: function() {
        console.log("Наша программа включает в себя данные: ");
        for (let key in appData) {
            if ( typeof(appData[key]) === "object" ) {
                console.log(key + ": {");
                for (let item in appData[key]) {
                    console.log( item + ": " + appData[key][item] );
                };
                console.log("}");
            } else {
            console.log( key + ": " + appData[key] );
            };
        };        
    }
};