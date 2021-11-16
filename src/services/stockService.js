import axios from "axios";
import { serviceStorage } from "../services/storageService";

export const stockService = {
  getStocksData,
};
const KEY_DB = "stockData";

async function getStocksData(filterBy) {
  if (!filterBy.length) {
    return serviceStorage.loadFromStorage(KEY_DB);
  }
  try {
    const rawStockData = await axios.get(
      `https://trautocomplete.azurewebsites.net/api/Autocomplete/GetAutocomplete?name=${filterBy}`
    );
    const stocksData = _loadStockData(rawStockData);
    serviceStorage.storeToStorage(KEY_DB, stocksData);
    return stocksData;
  } catch (err) {
    console.log("error in data from server");
  }
}

function _loadStockData(rawStockData) {
  let stockData = rawStockData.data.filter(
    (stock) => stock.category === "ticker"
  );
  if (stockData.length > 9) stockData.slice(0, 8);
  return stockData.sort((firstStock, secondStock) => {
    return firstStock.label.toLowerCase() < secondStock.label.toLowerCase()
      ? -1
      : 1;
  });
}
