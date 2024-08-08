const countryList = {
  AUD: 1.5355702686,
  BGN: 1.8040402323,
  BRL: 5.7289909352,
  CAD: 1.3868501902,
  CHF: 0.8578001509,
  CNY: 7.1595511672,
  CZK: 23.2118244395,
  DKK: 6.8386713328,
  EUR: 0.9165601012,
  GBP: 0.781090125,
  HKD: 7.8036708933,
  HRK: 6.6122707351,
  HUF: 364.4005222479,
  IDR: 16218.065296557,
  ILS: 3.8041004027,
  INR: 83.7745335325,
  ISK: 137.8935840465,
  JPY: 146.5448967255,
  KRW: 1355.4330080973,
  MXN: 19.1746322976,
  MYR: 4.4973606407,
  NOK: 10.9401919979,
  NZD: 1.6775802524,
  PHP: 57.9350502974,
  PLN: 3.9299905064,
  RON: 4.5599407059,
  RUB: 85.4632343735,
  SEK: 10.5769917619,
  SGD: 1.3250801725,
  THB: 35.2461662806,
  TRY: 33.176445516,
  USD: 1,
  ZAR: 18.244352271,
};

const url = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zQWZUi7ysnghjGRo1REFoNBNNjeCzVCk84JfahOa&currencies`;

const allcountriesSelect = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#button-convert");
const displayValue = document.querySelector("#amount-input");

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const toCurrency1 = document.querySelector(".to select option");
const mssg = document.querySelector("#mssg");
// SETP 1:- To enter the numeric value in the input field, we have to use this code below:

displayValue.addEventListener("input", function (e) {
  const onlynumberRegex = /^[0-9]*\.?[0-9]*$/;
  if (!onlynumberRegex.test(e.target.value)) {
    e.target.value = e.target.value.slice(0, -1);
  }
});

// This loop will show options of country codes
for (let select of allcountriesSelect) {
  for (code in countryList) {
    const countryOptions = document.createElement("option");
    countryOptions.value = code;
    countryOptions.innerText = code;
    select.append(countryOptions);

    // FOR setting the default value of the country code
    if (select.name === "from" && code === "USD") {
      countryOptions.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      countryOptions.selected = "selected";
    }
  }

  // this is basically an event of changing from one flag to another flag, very simple. here target means what will change.
  // After clicking on the country codes, that country code will be selected by default. the rest of the work will be done inside of the countryFlag arrow function.

  // this event listener is added inside the loop just because to change from one option to another option

  // very simple, just try to understand and define in simple language, nothing complicated here.
  select.addEventListener("change", (Evt) => {
    countryFlag(Evt.target);
  });
}

// STEP 2:- this function will show a list of country flag along with the country code.
// here element.value means, what value is provided inside of the element.
const countryFlag = (element) => {
  console.log(element.value);
  let code = element.value;
  let countryCode = countryList[code];
  let flagimg = `https://flagsapi.com/${countryCode}/flat/64.png`;

  document.querySelector("#from").src = flagimg;
  document.querySelector("#to").src = flagimg;
};

// STEP 3 :- when the button will be clicked, the action will happen


btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = displayValue.value;
  console.log(amount);
  console.log("Button is clicked!");

  // just to confirm whether it is working or not
  console.log(fromCurrency.value, toCurrency.value);

  const exchangeAction = await fetch(url, { method: "GET" });
  let response = await exchangeAction.json();

  const currencyCodes = Object.keys(response.data); // converted the object into array throght this technique
  console.log(currencyCodes[1]);
  // let rate = data[fromCurrency.value];

  // New information parsefloat converts a string to a floating point number.
  let exchangeRate = parseFloat(response.data[toCurrency.value]);
  console.log(`So, the exchange rate is ${exchangeRate}`);
  let finalAmount = displayValue.value * exchangeRate;

  mssg.innerText = `${amount} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
  amount = mssg.innerText;
  console.log(mssg.innerText);

  // console.log("Rate is", rate);
});
