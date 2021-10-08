import axios from "axios";

interface CoinbaseResponse {
  data: {
    rates: {
      USD: number;
    };
  };
}

const getEthValue = async () => {
  const res = await axios.get<CoinbaseResponse>(
    "https://api.coinbase.com/v2/exchange-rates?currency=ETH"
  );

  return res.data.data.rates.USD;
};

export default getEthValue;
