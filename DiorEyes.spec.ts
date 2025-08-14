import { test, expect, eyes } from '@applitools/eyes-playwright/fixture';
import { lazy } from 'react';

const DIOR_HOME_PAGE = 'https://www.dior.com/en_gb/beauty';


test.describe('Dior Watch PDP Elements', () => {

  test('PDP page + Basket', async ({ page, eyes}) => {
    await page.goto(DIOR_HOME_PAGE);
    try {
        await page.click('button.js-confirm-current-country');
      } catch (error) {
        console.log("Staying in the uk site button wasn't needed.");
      }
    try {
        await page.click('#onetrust-accept-btn-handler');
      } catch (error) {
        console.log("Closing Cookies button wasn't needed.");
      }
    
      // click on the menu button to open the navigation
      await page.click('button[aria-label="Menu"]');
      // click on the "Fragrance" link in the navigation
      await page.click('button[data-id="FRAGRANCE"]');
      // click on the "Dior Homme" link in the navigation
      await page.click('[data-content-id="nav-menu-iconic-push-Y0840550"]');
      
      // click on the first product in the list
      await page.click('[data-gtm-content="gtm-content-data-f78a26a622b701a6e91355dc23"]');
    
    
      await eyes.check('Product Page', {
          fully: true,
          target: 'window',
          lazyLoad: { scrollLength: 500, waitingTime: 1000 , maxAmountToScroll: 5000 }
        });

        // click on the "Add to Bag" button
      await page.click('button[data-gtm-event="add_to_cart"]');
        
      await eyes.check('Basekt Page', {
          fully: false,
          target: 'region',
          selector: 'body > div.modal.offcanvas.offcanvas--end.fade.side-panel.js-side-panel.show > div > div.modal-content.side-panel__general',
          
        });
      
  });


});
