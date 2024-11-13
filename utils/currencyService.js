import currencyapi from "@everapi/currencyapi-js";

export const getCurrencyConversionRate = async (
  amount,
  base_currency,
  convertCurrencies
) => {
  const client = new currencyapi(process.env.CURRENCY_API_KEY);
  const currencies = convertCurrencies;

  try {
    const response = await client.latest({
      value: amount,
      base_currency: base_currency,
      currencies: convertCurrencies.join(","),
    });

    const result = {
      meta: { last_updated_at: response.meta.last_updated_at },
      data: {},
    };

    currencies.forEach((currency) => {
      if (response.data && response.data[currency]) {
        const conversionRate = response.data[currency].value;
        const convertedAmount = amount * conversionRate;

        result.data[currency] = {
          code: currency,
          value: convertedAmount,
        };
      }
    });
    return result;
  } catch (error) {
    console.error("Error fetching conversion rate: ", error.message);
    throw new Error("Error fetching conversion rate.");
  }
};

export const getListOfCurrencies = async () => {
  const client = new currencyapi(process.env.CURRENCY_API_KEY);
  try {
    const response = await client.latest();
    console.log(response);

    const codes = [];
    for (const key in response.data) {
     
      const currencyInfo = response.data[key];
      if (currencyInfo && currencyInfo.code) {
        codes.push(currencyInfo.code);
      }
    }

    return codes; 
  } catch (error) {
    console.error("Error fetching conversion rate: ", error.message);
    throw new Error("Error fetching conversion rate.");
  }
};
