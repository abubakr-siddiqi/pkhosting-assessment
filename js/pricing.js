(function () {
  "use strict";

  var STORAGE_BILLING = "pkh-vps-billing";
  var STORAGE_CURRENCY = "pkh-vps-currency";

  var USD_RATE = 278.5;
  var GBP_RATE = 355;

  var cards = document.querySelectorAll("[data-monthly-pkr]");
  var billingInputs = document.querySelectorAll('input[name="billing"]');
  var currencySelect = document.getElementById("currency");
  var liveRegion = document.getElementById("price-live");

  if (!cards.length || !billingInputs.length || !currencySelect) {
    return;
  }

  function getBilling() {
    var checked = document.querySelector('input[name="billing"]:checked');
    return checked ? checked.value : "monthly";
  }

  function getCurrency() {
    return currencySelect.value || "PKR";
  }

  function annualPerMonthPkr(monthlyPkr) {
    return (monthlyPkr * 10) / 12;
  }

  function annualTotalPkr(monthlyPkr) {
    return monthlyPkr * 10;
  }

  function savingsPkr(monthlyPkr) {
    return monthlyPkr * 12 - annualTotalPkr(monthlyPkr);
  }

  function convertFromPkr(amountPkr, currency) {
    if (currency === "USD") {
      return amountPkr / USD_RATE;
    }
    if (currency === "GBP") {
      return amountPkr / GBP_RATE;
    }
    return amountPkr;
  }

  function formatMoney(amountPkr, currency) {
    var value = convertFromPkr(amountPkr, currency);

    if (currency === "PKR") {
      var whole = Math.round(value);
      return "Rs\u00a0" + whole.toLocaleString("en-PK");
    }

    var symbol = currency === "USD" ? "$" : "£";
    return symbol + value.toFixed(2);
  }

  function updateCard(card, billing, currency) {
    var monthlyPkr = Number(card.getAttribute("data-monthly-pkr"));
    var amountEl = card.querySelector('[data-role="amount"]');
    var periodEl = card.querySelector('[data-role="period"]');
    var metaEl = card.querySelector('[data-role="meta"]');
    var savingsEl = card.querySelector('[data-role="savings"]');

    if (!amountEl || !periodEl || !metaEl || !savingsEl) {
      return;
    }

    if (billing === "annually") {
      var perMonth = annualPerMonthPkr(monthlyPkr);
      var total = annualTotalPkr(monthlyPkr);
      var save = savingsPkr(monthlyPkr);

      amountEl.textContent = formatMoney(perMonth, currency);
      periodEl.textContent = "/mo";
      metaEl.hidden = false;
      metaEl.textContent =
        "Billed " + formatMoney(total, currency) + " per year";
      savingsEl.hidden = false;
      savingsEl.textContent = "Save " + formatMoney(save, currency);
    } else {
      amountEl.textContent = formatMoney(monthlyPkr, currency);
      periodEl.textContent = "/mo";
      metaEl.hidden = true;
      metaEl.textContent = "";
      savingsEl.hidden = true;
      savingsEl.textContent = "";
    }
  }

  function announce(billing, currency) {
    if (!liveRegion) {
      return;
    }
    var periodLabel = billing === "annually" ? "annually" : "monthly";
    liveRegion.textContent =
      "Prices updated to " + periodLabel + " billing in " + currency + ".";
  }

  function render(options) {
    options = options || {};
    var billing = getBilling();
    var currency = getCurrency();
    var i;

    for (i = 0; i < cards.length; i++) {
      updateCard(cards[i], billing, currency);
    }

    try {
      localStorage.setItem(STORAGE_BILLING, billing);
      localStorage.setItem(STORAGE_CURRENCY, currency);
    } catch (err) {
    }

    if (options.announce) {
      announce(billing, currency);
    }
  }

  function restoreState() {
    var savedBilling = null;
    var savedCurrency = null;
    var i;

    try {
      savedBilling = localStorage.getItem(STORAGE_BILLING);
      savedCurrency = localStorage.getItem(STORAGE_CURRENCY);
    } catch (err) {
      return;
    }

    if (savedBilling === "monthly" || savedBilling === "annually") {
      for (i = 0; i < billingInputs.length; i++) {
        billingInputs[i].checked = billingInputs[i].value === savedBilling;
      }
    }

    if (
      savedCurrency === "PKR" ||
      savedCurrency === "USD" ||
      savedCurrency === "GBP"
    ) {
      currencySelect.value = savedCurrency;
    }
  }

  var b;
  for (b = 0; b < billingInputs.length; b++) {
    billingInputs[b].addEventListener("change", function () {
      render({ announce: true });
    });
  }

  currencySelect.addEventListener("change", function () {
    render({ announce: true });
  });

  restoreState();
  render({ announce: false });
})();