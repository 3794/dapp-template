import puppeteer from 'puppeteer';
import dappeteer from '@chainsafe/dappeteer';

async function main() {
  const [metamask, page] = await dappeteer.bootstrap(puppeteer, { metamaskVersion: 'v10.15.0' });

  await page.goto('http://127.0.0.1:5173/');

  // metamask.addNetwork({
  //   networkName: 'Localhost 8545',
  //   rpc: 'http://localhost:8545',
  //   chainId: 1337,
  //   symbol: 'ETH'
  // });

  await metamask.switchNetwork('Localhost 8545');

  await metamask.importPK('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e')

  await page.bringToFront();
  const payButton = await page.$('#connectButton');
  await payButton.click();

  await metamask.approve();
}

main();
