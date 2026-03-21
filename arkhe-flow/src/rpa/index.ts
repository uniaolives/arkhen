
import puppeteer from 'puppeteer';

export async function runRpaScript(script: any) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const step of script.steps) {
    switch (step.action) {
      case 'goto':
        await page.goto(step.url);
        break;
      case 'click':
        await page.click(step.selector);
        break;
      case 'type':
        await page.type(step.selector, step.text);
        break;
      case 'wait':
        await page.waitForTimeout(step.ms);
        break;
    }
  }

  await browser.close();
}
