const express = require('express')
// 本次http请求的实例
const app = express()
const port = 3000

app.use((req, res, next) => {
    console.log('请求开始', req.method, req.url)
    next()
})

app.use((req, res, next) => {
    // 假设在处理cookie
    req.cookie = {
        userId: 'abc123'
    }
    next()
})

app.use((req, res, next) => {
    // 处理postdata，异步
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })
    next()
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))