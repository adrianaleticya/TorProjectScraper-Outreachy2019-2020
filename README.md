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
 
 The file ```config.js``` was created to aid the process to change important parameters. 
 
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

### Changing The baseURL 

The variable ```baseURL``` is the one pointing to the address where the desired data is. In the code it looks like the snippet below:

```javascript
baseURL = 'https://blog.torproject.org'
```

The ```baseURL``` is the primary address that you will be working with. In this case, as the crawler was working with the Tor Project Blog website, the address is <https://blog.torproject.org>.

It is important to notice that this address is already a page where all the articles get listed, limited by a certain number of publications per page. If the website that you intend to work with doesn't show the posts on the front page, remember to use the URL of the blog page of said website.

For example, if your website address is <http://mywebsite.com>, but you have a different page for blog entries such as: <http://mywebsite.com/blog> then the correct base URL to use is <http://mywebsite.com/blog>.

### Understanding Pagination

There are two different URL Params, one is a Path Params and the other is a Querry Params. 
URLs that are Path Params look like that:

 **http://mywebsite.com/page/2** 

URLs that are Querry Params look like that:

**http://mywebsite.com/?page=2** 

This crawler was designed for a Querry Params URL as we can see bellow: 

```javascript
paramPage: '?page='
```
It is important to understand how the crawler works with the pages. If your website works the same way as Tor Project Blog, then you are good to go. Else it is necessary to comment the ```paramPage: '?page='``` and uncomment ```paramPage: 'page/'```.

#### Understanding The Number Of Pages Fetched

Inside the file ```config.js``` there are two variables that define the number of pages analysed every time you run the ```index.js```. 

```javascript
  firstPage: 0
  finalPage: 60
  ```
  As shown above those variables are analysing from the page 0 to the page 60. Where the ```firstPage``` received the first page cointaining the blog posts and ```finalPage``` received the last one. The Tor Project Blog has much more than 60 pages, however after running some stress tests 60 seems to be the limit of pages analysed at the same time without crashing the application.
  
To overcome this problem a simple solution is running ```index.js``` as many times as necessary to cover all the available pages. Only need to change the pages according to the execution. On the second time running, ```firstPage``` receives 61 and  ```finalPage``` receives 120. Always keeping the limit of 60 pages per run. 







