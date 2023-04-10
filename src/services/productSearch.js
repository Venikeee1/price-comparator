
import puppeteer from 'puppeteer';

const ROZETKA_SEARCH_URL = 'https://rozetka.com.ua/search/?text=';
const ALLO_SEARCH_URL = 'https://allo.ua/ua/catalogsearch/result/?q=';
const HOTLINE_SEARCH_URL = '';


const getRozetkaData = async (search) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${ROZETKA_SEARCH_URL}${search}`);
  await page.waitForSelector('.content_type_catalog');

  const searchedItems = await page.$$('.goods-tile')
  const items = searchedItems.map(item => page.evaluate(el => {

    return {
      price: el.querySelector('.goods-tile__price-value')?.textContent,
      title: el.querySelector('.goods-tile__title')?.textContent
    }
  }, item))
  return await Promise.all(items);
}

const getAlloData = async (search) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${ALLO_SEARCH_URL}${search}`);
  await page.waitForSelector('.products-layout__container ');

  const searchedItems = await page.$$('.products-layout__item')

  const items = searchedItems.map(item => page.evaluate(el => {
    const priceRef = el.querySelector('.v-pb__cur .sum');

    if (!priceRef) return null;

    return {
      price: priceRef.textContent,
      title: el.querySelector('.product-card__title')?.textContent
    }
  }, item))
  return await Promise.all(items.filter(Boolean));
}

export const getStoresPrices = async (search) => {
  const [rozetka, allo] = await Promise.all([getRozetkaData(search), getAlloData(search)]);
  return { rozetka, allo }
}

// await browser.close();
