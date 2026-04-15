import fastify from 'fastify'
import view from '@fastify/view'
import pug from 'pug'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = fastify({
  logger: true
})
const port = 3000

await app.register(view, { 
  engine: { pug },
  root: path.join(__dirname, 'views'),
  viewExt: 'pug'
})

const state = {
  courses: [
    {
      id: 1,
      title: 'JS: Массивы',
      description: 'Курс про массивы в JavaScript',
    },
    {
      id: 2,
      title: 'JS: Функции',
      description: 'Курс про функции в JavaScript',
    },
  ],
}

app.get('/courses', (req, res) => {
  const data = {
    courses: state.courses,
  }
  res.view('courses/index', data)
})

app.get('/courses/:id', (req, res) => {
  const { id } = req.params
  const course = state.courses.find(({ id: courseId }) => courseId === parseInt(id))
  
  if (!course) {
    res.code(404).send({ message: 'Course not found' })
    return
  }
  
  const data = { course }
  res.view('courses/show', data)
})

app.get('/', (req, res) => {
  res.view('index')
})

app.get('/users', (req, res) => {
  res.send('GET /users')
})

app.post('/users', (req, res) => {
  res.send('POST /users')
})

app.get('/hello', (req, res) => {
  const name = req.query.name
  if (name) {
    res.send(`Hello, ${name}!`)
  } else {
    res.send('Hello World!')
  }
})

app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`)
})