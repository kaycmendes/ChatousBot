// to execute use "node botus username"


const puppeteer = require("puppeteer");


async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page
    .goto("https://www.chatous.com/#", { waitUntil: "networkidle2" })
    .then(async () => {
      await page.waitFor(4000);
      const [button] = await page.$x("//a[contains(., 'Start chatting now!')]");
      await button.click();
    });
  await page.waitFor(2900).then(async () => {
    const [search] = await page.$x('//*[@id="global_search"]');
    const nickname = process.argv[2].toString();
    await search.click()
    await page.waitFor(2000);
    await page.keyboard.type(nickname, { delay: 1000 }).then(async () => {
      await page.waitFor(2000);
      const [add] = await page.$x('//*[@id="search-add-by-username"]');
      await add.click();
      await page.waitFor(2500);
      const [like] = await page.$x('//*[@id="send-like-button"]');
      await like.click();
      await page.waitFor(2100);
      const [remove] = await page.$x('//*[@id="new-button"]');
      await remove.click();
      await remove.click();
      await page.waitFor(1000);
      await browser.close();
    });
  }).catch(async () => {
    await browser.close();
  });
}
nickname = process.argv[2];
bots = process.argv[3];

for (let i = 0; i < bots; i++) {
  run()
  .then(() => {
    console.log("no problems");
  })
  .catch(err => {
    console.log(err.message)
  });
}



  // for i in {1..30};  do  echo "$i Like"; node chatous2.0;  done
