import fastify from 'fastify'
const app = fastify({
  logger: true
})
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/users', (req, res) => {
  res.send('GET /users')
})

app.post('/users', (req, res) => {
  res.send('POST /users')
})

app.get('/hello', (req, res) => {
  const name = req.query.name
  if(name) {
    res.send(`Hello, ${name}!`)
  }
  else {
    res.send('Hello World!')
  }
})

app.listen( {port}, () => {
    console.log(`Example app listening on port ${port}`)
})

