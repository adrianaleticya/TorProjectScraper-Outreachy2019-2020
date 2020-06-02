const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const [firstPage, finalPage] = [0, 60]

const fileName = 'tor.csv'

if(!firstPage) fs.appendFile(fileName, 'TimeStamp;Date;Title;Uri;Author;Tags\n', () => {})

const baseURL = 'https://blog.torproject.org'

for(let page = firstPage; page < finalPage; page++) {
  const mainURL = `${baseURL}/?page=${page}`

  request(mainURL, function(err, res, body) {
    if(err) console.log(`Error: ${err}`)
  
    const $ =  cheerio.load(body)
    const querrySelector = '.main-content-container .main-content .main-content-inner .inner-inner .region-content .views-element-container .views-row article'
  
    $(querrySelector).each(function() {
      const articleURL = `${baseURL}${$(this).find('.title a').attr('href')}`
      request(articleURL, function(err, res, body) {
        if(err) console.log(`Error: ${err}`)
  
        const $ = cheerio.load(body)
        const querrySelector = '.main-content-container .main-content .main-content-inner .inner-inner .region-content article'
        const article = $(querrySelector).first()
        
        const articleTimeStamp = article.find('.author span').attr('content').split('+')[0]
        const articleDate = article.find('.author span').text().trim()
        const articleTitle = article.find('.title span').text().trim()
        const articleAuthor = article.find('.author a').text().trim()
        const articleTags = []

        article.find('.field--name-field-tags .field--items .field--item a').each(function(i, el) {
          articleTags[i] = $(this).text()
        })
        
        const content = `${articleTimeStamp};${articleDate};${articleTitle};${articleURL};${articleAuthor};${articleTags.join(';')}\n`
        
        console.log(content)
        
        fs.appendFile(fileName, content, () => {})
      })  
    })

  })

}
