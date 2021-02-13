const body = document.querySelector('body');
const section = document.querySelector('section');
let li = document.querySelectorAll('.currency-page li');
const currencyPage = document.querySelector('.currency-page');
const calcArea = document.querySelector('.calc-page');
const input = calcArea.querySelector('input');
const swap = calcArea.querySelector('.swap');
const change = calcArea.querySelector('.change');
const currency = [];
const currencyValue = [];
let previousUsed = ["INR", "USD"];
let currency1, currency2;
let temp = 0;

const setCurrency = rates => {
   for(var key in rates)
   {
       currency.push(key);
       currencyValue.push(rates[key]);
   }
};

function checkLi()
{
    li = document.querySelectorAll('.currency-page li');
    li.forEach(e => {
        e.addEventListener('click', el => {
            li.forEach(ell => {
                ell.id = "";
            });
            e.id = "checked";
        });
    });
}
// getting data from api
fetch('https://open.exchangerate-api.com/v6/latest')
.then(res => res.json())
.then(data => setCurrency(data.rates))
.catch(error => console.log(error))
.then(() => {
    section.innerHTML = "<ul> </ul>";
    const ul = section.querySelector('ul');
    currency.forEach(e => {
        ul.innerHTML += `<li>${e}</li>`;
    })
})
.then(() => {
    checkLi(); 
})
.then(() => {
    const loadCurrencyPage = (index, prev) => {
        calcArea.classList.add('hide'), calcArea.classList.remove('active');
        currencyPage.classList.add('active'), currencyPage.classList.remove('hide');
        currencyPage.querySelector('h2').textContent = `Currency ${index}`;
        currencyPage.querySelector('.previousUsed li').innerHTML = `${prev}`;
    };
    const calculateValue = num => {
        let v1 = currencyValue[currency.indexOf(currency1)];
        let v2 = currencyValue[currency.indexOf(currency2)];
        // v1 = 1 / v1;
        // v2 = 1 / v2;
        v3 = v2 / v1;
        return v3 * num;
    };
    const loadCalcPage = () => {
        calcArea.querySelector('.currency-1').textContent = `${input.value} ${currency1} = `;
        let output = calculateValue(input.value).toFixed(3);
        calcArea.querySelector('.currency-2').textContent = `${output} ${currency2}`;
    };
    document.querySelector('.currency-page .submit').addEventListener('click', () => {
        let checked = document.querySelector('#checked');
        if(checked != null && temp == 0)
        {
            checked.id = "";
            // console.log(checked.textContent);
            temp = 1, currency1 = checked.textContent, checked = null;
            loadCurrencyPage(2, previousUsed[1]);
        }
        if(checked != null && temp == 1)
        {
            currencyPage.classList.add('hide');
            checked.id = "";
            temp = 0, currency2 = checked.textContent, checked = null;
            calcArea.classList.add('active');
            calcArea.classList.remove('hide');
            loadCalcPage();
        }
        //    console.log(checked);
    });
    input.addEventListener('change', loadCalcPage);
    swap.addEventListener('click', () => {
        let dummy;
        dummy = currency1;
        currency1 = currency2;
        currency2 = dummy;
        loadCalcPage(); 
    });
    change.addEventListener('click', () => {
        previousUsed = [currency1, currency2];
        input.value = "";
        loadCurrencyPage(1, previousUsed[0]);
    })
});



// toggling dark mode
document.querySelector('i.fa-sun').addEventListener('click', function(){
    // console.log('hi');
    body.classList.toggle('dark-theme');
});


// animation custom currency
document.querySelector('div.custom button').addEventListener('click', function(){
    section.style.transform = 'translateY(0) scaleY(1)';
    // section.style.display = "flex";
    section.style.opacity = "1";
    section.classList.add('check');
});
body.addEventListener('click', e => {
    if(e.target.classList.contains('currency-page') && section.classList.contains('check') && !e.target.classList.contains('check'))
    {
        section.style.transform = 'translateY(150%) scaleY(0)';
        // section.style.display = "none";
        section.style.opacity = "0";
        section.classList.add('check');
    }
});

