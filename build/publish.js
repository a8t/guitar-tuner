const ghpages = require('gh-pages')
const path = require('path')

ghpages.publish(path.join(__dirname, '../dist'), err => {
  console.log('Error publishing to gh-pages branch...')
  console.log(path.join(__dirname, '../dist'))
  console.log(err)
})
