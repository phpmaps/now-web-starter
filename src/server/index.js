const express = require('express')

const port = process.env.PORT || 3000
const app = express()

app.get('/api/enrichZips', (req, res) => {
    res.send('<h1><marquee direction=left>Hello from Express path /about on Now 2.0!</marquee></h1>')
    res.end()
})

app.get('/api/find', (req, res) => {
    res.send('<h1>find</h1>')
    res.end()
})

app.use(express.static('public', {
    index: "index.html"
}))


app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
})