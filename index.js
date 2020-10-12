import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import {getProduct, initDatabase, initTable, insertProduct} from './database.js'
import { get } from 'http'

const __dirname = path.resolve()

const app = express()
const db = initDatabase()
initTable(db)

app.set('views', __dirname + '/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// log incoming reques
app.use(morgan('combined'))

//parse request bodey
app.use(bodyParser.urlencoded({extended: false}))

//serve static file
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', (req, res, next) => {
    res.send({success: true})
})

//get product list
app.get('/product', async(req, res, next) => {
  //  getProduct(db).then(product => {
  //      console.log('Product results')
  //      res.render('product')
        
  //  }).catch(error => {
  //      console.error(error)
  //  })

  let products
  try {
      products = await getProduct(db)
  } catch (error) {
      return next(error)
  }

  console.log('Product Results', products)
  res.render('product', {products})

})

//method get
app.get('/add-product', (req, res, next) => {
    res.send(req.query)
})

//method post
app.post('/add-product', (req, res, next) => {
    console.log('Request', req.body)
    //insert product
    insertProduct(db, req.body.name, parseInt(req.body.price), '-')

    //redirect
    res.redirect('/product')
})

app.use((err, req, res, next) => {
    res.send(err, message)
})

app.listen(8010, () => {
    console.log('App listen on port 8010')
})