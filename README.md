# Tor Project Scraper - Outreachy 2019-2020

Scraper in JavaScript created to fetch info from the Tor Project Blog to organize a spreadsheet with blog entries information and document the current posts. 

## How To Use it?

To use this scraper you just need NodeJS installed in your system and download or clone this repository. Inside the repository execute through the command line (prompt). Run the command below to install the libs used in the code.

```$ npm install``` 

then:

```$ npm start``` or ```$ node index.js ```


This command will run the crawler. That will generate a file that can be opened by any spreadsheet software. Such as:

1. LibreOffice Calc

2. Microsoft Office Excel

3. Any other software that reads .csv files. 

As soon as the code executes you can follow the process through the terminal, where the information shown is the same being recorded in the .csv file. 

![Printscreen of the recording process during code execution](https://github.com/adrianaleticya/TorProjectCrawler-Outreachy2019-2020/blob/master/image.png 'Printscreen of the recording process during code execution')

The file was initially named "tor.csv". However, you can change it to fit your purpose. 
 
 ## Understanding The Config.js
 
 The file ```config.js``` was created to aid the process to change important parameters. 
 
 ```javascript
 module.exports = {
  firstPage: 0,
  finalPage: 60,
  paramPage: '/?page=',
  // paramPage: '/page/',
  fileName: 'tor.csv',
  baseURL: 'https://blog.torproject.org'
  }
  ```
 
 As shown above, we have in this file the initial and final page to be fetched, the URL parameter to be used, the name of the .csv file to be created, and the base URL where the data will be collected. 
 
 ### Changing the .CSV File Name
 
 To modify the name of the .csv file locate in the code ```'fileName'```:
 
 ```javascript
 fileName: 'tor.csv'
 ```
 
 And modify the atributed name as necessary:
 
 ```javascript
 fileName: 'yourfilenamehere.csv'
 ```

Remember to keep the file extension .csv as to prevent compatibility problems. 

### Changing The baseURL 

The variable ```baseURL``` is the one pointing to the address where the desired data is. In the code it looks like the snippet below:

```javascript
baseURL: 'https://blog.torproject.org'
```

The ```baseURL``` is the primary address that you will be working with. In this case, as the scraper was working with the Tor Project Blog website, the address is <https://blog.torproject.org>.

It is important to notice that this address is already a page where all the articles get listed, limited by a certain number of publications per page. If the website that you intend to work with doesn't show the posts on the front page, remember to use the URL of the blog page of said website.

For example, if your website address is <http://mywebsite.com>, but you have a different page for blog entries such as <http://mywebsite.com/blog> then the correct base URL to use is <http://mywebsite.com/blog>.

### Understanding Pagination

There are two different URL Params, one is a Path Params and the other is a Querry Params. 
URLs that are Path Params look like that:

 **http://mywebsite.com/page/2** 

URLs that are Querry Params look like that:

**http://mywebsite.com/?page=2** 

This crawler was designed for a Querry Params URL as we can see below: 

```javascript
paramPage: '/?page='
```
It is important to understand how the scraper works with the pages. If your website works the same way as Tor Project Blog, then you are good to go. Else it is necessary to comment the ```paramPage: '/?page='``` and uncomment ```paramPage: '/page/'```.

#### Understanding The Number Of Pages Fetched

Inside the file ```config.js``` there are two variables that define the number of pages analyzed every time you run the application.

```javascript
  firstPage: 0,
  finalPage: 60,
  ```
  As shown above, those variables are analysing from page 0 to page 60. Where the ```firstPage``` received the first page containing the blog posts and ```finalPage``` received the last one. The Tor Project Blog has much more than 60 pages. However, after running some stress tests, 60 seems to be the limit of pages analyzed at the same execution without crashing the application.
  
To overcome this problem a simple solution is running the application as many times as necessary to cover all the available pages. We only need to change the pages according to the execution. On the second time running, ```firstPage``` receives 61 and  ```finalPage``` receives 120. Always keeping the limit of 60 pages per run. 

## Understanding How The Scraper Collects Data

This scraper was developed to organize and document all the posts published in the Tor Blog. To do that the Html of the blog was inspected, making it possible to obtain specific information from each article. Those pieces of information are timestamp, date posted, title, author, and tags. This structure was thought through to fit the organizational process that The Tor Project needed at the time. 

If you are intending to use it elsewhere it is necessary to understand which data is important to you and how to change the fetching selectors inside the code. 

### Inspecting The Elements

On the first page of the Tor Blog and using the elements inspection of the browser it was possible to identify which selectors (tags, classes) were necessary to locate each article from each page. Once the correct path was identified it was inserted in the code. 

```javascript
const querrySelector = '.main-content-container .main-content .main-content-inner .inner-inner .region-content .views-element-container .views-row article'
 ```
Above is the first time that the constant ```querrySelector``` appears. This constant is used to receive the selector containing the paths to the articles. This selector will do it for each article on each of the 60 pages. 

You need to inspect the elements in the desired page to find the correct path and set it inside the ```querrySelector```. The objective here is fiding the html element that contains the body of all the posts and consequently the URLs at the blog page. This is a process that may take some time as each website is different. 

After you indicated the selector inside the ```querrySelector``` then it's time to create the addresses of each article that will be inspected. The snippet below is what makes the selector piece together the ´´´baseURL´´´ and the complement that makes each articles' address. 

```javascript
$(querrySelector).each(function() {
      const articleURL = `${baseURL}${$(this).find('.title a').attr('href')}`
      request(articleURL, function(err, res, body) {
        if(err) console.log(`Error: ${err}`)
  ```
        
In this case to make it possible were used ``` .title a``` selector and ```href``` attribute. For each post, the ```baseURL``` was linked to the attribute making it possible to find a specific post. 

Example:

At the Tor Blog one of the ```href``` attributes available is ```<href="/new-release-tor-browser-95">```. It means that for this post the ```baseURL``` + ```href``` will result in an address like this: <https://blog.torproject.org/new-release-tor-browser-95>. That's what you want your addresses to look like.

### Inspecting The Elements Inside The Posts

After you set the correct path to each post it's time to select inside each article all the informations that you want to display in the .csv file. The snipet bellow shows how this is possible:

```javascript
 const $ = cheerio.load(body)
 const querrySelector = '.main-content-container .main-content .main-content-inner .inner-inner .region-content article'
 const article = $(querrySelector).first()
```
Chose one of your articles and inspect the elements of that page. Above, the ```querrySelector``` received another selector to find the information contained in the article. Inside the class ```.region-content``` is a Html tag called ```article```. This tag contains the data that was collected about the post. 

### Choosing Which Data To Collect

The purpose of the scraper was to assemble a spreadsheet to document the posts, as mentioned above. Being so, it was defined that the data to be collected would be timestamps, date published, title, author, and the tags for each post. This information was found in the Html tag ```article```. To achieve this new consts were created to receive the data.

```javascript
const articleTimeStamp = article.find('.author span').attr('content').split('+')[0]
const articleDate = article.find('.author span').text().trim()
const articleTitle = article.find('.title span').text().trim()
const articleAuthor = article.find('.author a').text().trim()
const articleTags = []
```

Each const received the corresponding information from the post. When the method ```article.find(selector).text().trim()``` is executed it searches specific data using the selector. For example ```.author a``` is where the name of the author is at the Tor Blog, so that's the selector that must be passed as a parameter to that method. The result is stored in ```const articleAuthor```. That interaction will happen to all of the data being searched. 

### Tags

The variable ```articleTags``` is different. One of the purposes of this scraper was to identify all the tags of each article. Therefore, this was vital for Tor Blog, but may be useless to other websites. Especially if you don't work with tags. It first declares an array and then fills it in with the retrieved data.

```javascript
article.find('.field--name-field-tags .field--items .field--item a').each(function(i, el) {
          articleTags[i] = $(this).text()
```

Using ```i``` to control the index of the array each tag will be inserted in a position of the array ```articleTags```. 

## The Expected Result

When the process is done, as the function ```apend``` was used, all the data collected will be stored one after another at each iteration. Making the final ```.svg``` file ready to be read as a normal spreadhseet with all the information collected. 
