const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const [PAGINA_INICIAL, PAGINA_FINAL] = [0, 60]

if(!PAGINA_INICIAL) fs.appendFile('tor.csv', 'TimeStamp;Date;Title;Uri;Author;Tags\n', () => {})

const baseUri = 'https://blog.torproject.org'

for(let i = PAGINA_INICIAL; i < PAGINA_FINAL; i++) {
  const mainUri = `${baseUri}/?page=${i}`

  request(mainUri, function(err, res, body) {
    if(err) console.log(`Erro: ${err}`)
  
    const $ =  cheerio.load(body)
    const qs = '.main-content-container .main-content .main-content-inner .inner-inner .region-content .views-element-container .views-row article'
  
    $(qs).each(function() {
      const articleUri = `${baseUri}${$(this).find('.title a').attr('href')}`
      request(articleUri, function(err, res, body) {
        if(err) console.log(`Erro: ${err}`)
  
        const $ = cheerio.load(body)
        const qs = '.main-content-container .main-content .main-content-inner .inner-inner .region-content article'
        const article = $(qs).first()
        
        const articleTimeStamp = article.find('.author span').attr('content').split('+')[0]
        const articleDate = article.find('.author span').text().trim()
        const articleTitle = article.find('.title span').text().trim()
        const articleAuthor = article.find('.author a').text().trim()
        const articleTags = []
        article.find('.field--name-field-tags .field--items .field--item a').each(function(i, el) {
          articleTags[i] = $(this).text()
        })
        
	const content = `${articleTimeStamp};${articleDate};${articleTitle};${articleUri};${articleAuthor};${articleTags.join(';')}\n`
        console.log(content)
        fs.appendFile('tor.csv', content, () => {})

      })
  
    })
  })
}
