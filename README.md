# TorProjectCrawler-Outreachy2019-2020

Crawler in JavaScript created to fetch info from the Tor Project Blog in order to organize a spreadsheet with blog entries information and document the current posts. 

## How To Use it?

To use this crawler you just need NodeJS installed in your system and download this repository. Inside the repository execute through command line (prompt). Run:

```$ npm i```

then

```$ npm start``` or ```$ node index.js ```


This command will run the crawler. That will generate a file that can be opened by any spreadsheet software. Such as:

1. LibreOffice Calc

2. Microsoft Office Excel

3. Any other software that reads cvs files. 

As soon as the code executes you can follow the fetching process through the terminal, where the information shown is the same being recorded in the .csv file. 

The file was initially named "tor.csv". However, you can change it to fit your purpose. 
 
 ## Understanding The Config.js
 
 The file config.js was created to aid the process to change important parameters. 
 
 ```javascript
 module.exports = {
  firstPage: 0,
  finalPage: 60,
  paramPage: '?page=',
  // paramPage: 'page/',
  fileName: 'tor.csv',
  baseURL: 'https://blog.torproject.org/'
  }
  ```
 
 As shown above we have in this file the initial and final page to be fetched, the URL parameter to be used, the name of the .csv file to be created and the base URL where the data will be collected. 
 
 ### Changing the .CSV File Name
 
 To modify the name of the .csv file locate in the code 'fileName':
 
 ```javascript
 fileName = 'tor.csv'
 ```
 
 And modify the atributed name as necessary:
 
 ```javascript
 fileName = 'yourfilenamehere.csv'
 ```

Remember to keep the file extension .csv as to prevent compatibility problems. This can be a special problem if you're using Linux. 

### Modifying The URL From Where You Will Be Fetching Information

To change the source from where the information will be fetched there are two different variables that will need to be mosified. The first one is baseURL. In the code it looks like the snippet below:

```const baseURL = 'https://blog.torproject.org'```

The baseURL is the primary address that you will be working with. In this case, as the crawler was working with the Tor Project Blog website, the address is <https://blog.torproject.org>.

It is important to notice that this address is already a page where all the articles get listed, limited by a certain number of publications per page. If the website that you intend to work with doesn't show the posts on the front page, remember to use the URL of the blog page of said website. Such as:

If your website address is <mywebsite.com>, but you have a different page for blog entries as: <mywebsite.com/blog> then the correct base URL to use is <mywebsite.com/blog>.

## Pay Attention To Pagination

It is important to understand how the crawler works with the pages. It has been develop to work with an specific kind of pagination. If your website works the same way as Tor Project Blog, then you are good to go. Else you will need to work a bit with the code. 

The pagination working by default is: 

<mywebsite.com/page/number/>

Where 'number' can be changed by any number of existing pages. 

## Changing Information Fetched According To Your Blog




