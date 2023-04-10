// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getStoresPrices } from "@/services/productSearch";


export default async function handler(req, res) {
  console.log(req)
  const { searchQuery = 'iphone 13' } = req.query;
  const searchedItems = await getStoresPrices(searchQuery);
  res.status(200).json(searchedItems)
}
