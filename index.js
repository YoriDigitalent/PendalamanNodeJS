import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const __dirname = path.resolve()

const app = express()

app.set('views', __dirname + '/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// log incoming reques
app.use(morgan('combined'))

//parse request bodey
app.use(bodyParser.urlencoded)

//serve static file
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', (req, res, next) => {
    res.send({success: true})
})

app.get('/product', (req, res, next) => {
    res.render('product')
})

//method get
app.get('/add-product', (req, res, next) => {
    res.send(req.query)
})

//method post
app.post('/add-product', (req, res, next) => {
    console.log('Request', req.body)
    res.send(req.body)
})

app.use((err, req, res, next) => {
    res.send(err, message)
})

app.listen(8010, () => {
    console.log('App listen on port 8010')
})