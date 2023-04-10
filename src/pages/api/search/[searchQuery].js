
import { getStoresPrices } from "@/services/productSearch";


export default async function handler(req, res) {
  console.log(req.query)
  const { searchQuery = 'iphone 13' } = req.query;
  const searchedItems = await getStoresPrices(searchQuery);
  res.status(200).json(searchedItems)
}
