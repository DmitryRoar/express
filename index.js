const path = require('path')
const express = require('express')
const exphandl = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3000

const homeRouter = require('./routes/home')
const coursesRouter = require('./routes/courses')
const addRouter = require('./routes/add')
const cardRouter = require('./routes/card')

const hbs = exphandl.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))


app.use('/', homeRouter)
app.use('/courses', coursesRouter)
app.use('/add', addRouter)
app.use('/card', cardRouter)

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`)
})