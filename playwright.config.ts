import { defineConfig, devices } from '@playwright/test';


export default defineConfig({

  testDir: './tests',
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,   
  },
  
  workers: 4,               
  fullyParallel: false,  
  retries: 0,   

  reporter: [
    ['list'],                // Console output
    ['html', { open: 'never' }],// HTML report
    ['allure-playwright']
  ],
  
  use: {                    
    baseURL: 'https://www.google.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    headless: false,
    launchOptions: {
      args: ['--single-process'] // Force single process
    },
    browserName: 'chromium',
    viewport: { width: 1920 ,height: 1080 },
  
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        
      },
    },
  ],

  outputDir: 'test-results/',

});
