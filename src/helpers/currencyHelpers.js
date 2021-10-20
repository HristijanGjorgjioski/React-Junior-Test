export function longCurrencyText(currency) {
  return currencySymbol(currency) + " " + currency;
}

export function shortCurrencyText(currency) {
  if (currency === "AUD") {
    return "A$";
  }

  return currencySymbol(currency);
}

export function calculateCartTotal(cart, currency) {
  let totalAmount = 0;

  cart.forEach((item) => {
    const productPrice = getProductPrice(item.product, currency);
    const totalProductPrice = item.amount * productPrice;
    totalAmount += totalProductPrice;
  });

  return prettifyPrice(totalAmount, currency);
}

export function getProductPrettifiedPrice(product, currency) {
  return prettifyPrice(getProductPrice(product, currency), currency);
}

export function getProductPrice(product, currency) {
  let prices = product.prices;
  prices = prices.filter((item) => item.currency === currency);
  if (prices.length > 0) {
    return prices[0].amount;
  }

  // If the currency is not found, default to dollars.
  prices = product.prices.filter((item) => item.currency === "USD");
  if (prices.length > 0) {
    return prices[0].amount;
  }

  return "";
}

export function prettifyPrice(amount, currency) {
  if (typeof amount === "string" || amount instanceof String) {
    amount = parseFloat(amount);
  }

  const localeOptions = { style: "currency", currency: currency };
  return amount.toLocaleString(getFirstBrowserLanguage(), localeOptions);
}

export function currencySymbol(currency) {
  switch (currency) {
    case "USD":
    case "AUD":
      return "$";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    case "RUB":
      return "₽";
    default:
      return "";
  }
}

function getFirstBrowserLanguage() {
  var nav = window.navigator,
    browserLanguagePropertyKeys = ["language", "browserLanguage", "systemLanguage", "userLanguage"],
    i,
    language,
    len,
    shortLanguage = null;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
      len = language.length;
      if (!shortLanguage && len) {
        shortLanguage = language;
      }
      if (language && len > 2) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    //skip this loop iteration if property is null/undefined.  IE11 fix.
    if (language == null) {
      continue;
    }
    len = language.length;
    if (!shortLanguage && len) {
      shortLanguage = language;
    }
    if (language && len > 2) {
      return language;
    }
  }

  return shortLanguage;
}
