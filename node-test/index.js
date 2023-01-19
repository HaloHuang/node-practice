/**
 * base64位编码和解码
 */
// const { Buffer } = require('node:buffer')
// const str = 'hi'
// //编码
// const buff = Buffer.from(str, 'utf-8') // <Buffer 68 69>
// const base64 = buff.toString('base64') // aGk=
// // 解码
// const buff2 = Buffer.from(base64, 'base64') // <Buffer 68 69>
// const str2 = buff2.toString('utf-8') // hi

/**
 * 获取项目根路径
 */
// const process = require('process')
// console.log(process.cwd())
// console.log(__dirname)

/**
 * Node处理GET和POST请求
 */
// const http = require("http")
// const querystring = require("querystring")
// const server = http.createServer((req, res) => {
//     // req的信息
//     const url = req.url
//     const method = req.method
//     const path = url.split('?')[0]
//     const headers = req.headers
//     const query = querystring.parse(url.split('?')[1])
//     // GET
//     if(method === "GET"){
//         req.query = query
//         // 设置返回数据格式。注：第一个参数statusCode、第二个参数状态信息statusMessage(可选)、第三个参数响应对象。只能调用一次，优先级比setHeader高
//         res.writeHead(200,{
//             'content-type': "text/html"
//         })
//         // res.write('<head><meta charset="utf-8"/></head>')
//         res.end(JSON.stringify(req.query))
//     }
//     // POST 处理客户端传输的数据
//     if(method === "POST"){
//         let postData = ''
//         console.log('content-type', headers['content-type'])
//         // 传输数据比较大的用stream流,每次传输都会触发data回调
//         req.on('data', chunk => {
//             postData += chunk.toString()
//         })
//         // 请求完毕的回调
//         req.on('end', () => {
//             // 设置返回数据格式（text/html、application/json），只能设置单一属性/值，重复设置会覆盖，设置无效字段会抛出TypeError
//             res.setHeader('Content-Type', 'application/json')
//             // 响应的数据一定是个字符串，只是不同格式的字符串
//             res.end(JSON.stringify(postData))
//         })
//     }
// })
// server.listen(3000)

/**
 * Node实现文件读取操作
 */
// const fs = require("fs")
// const path = require("path")

// const getFileContent = (fileName) => {
//     const promise = new Promise((resolve, reject) => {
//         // 绝对路径
//         const fullName = path.resolve(__dirname, fileName)
//         fs.readFile(fullName, (err, data)=> {
//             if(err){
//                 reject(err)
//                 return
//             }
//             resolve(JSON.parse(data.toString()))
//         })
//     })
//     return promise
// }
// getFileContent('package.json').then(res => {
//     console.log('package.data', res)
// })

/**
 * WebSocket
 */
// 服务端
// const {WebSocketServer} = require('ws')
// const wsServer = new WebSocketServer({
//     port: 3000
// })
// wsServer.on('connection', ws => {
//     console.log('connect done')
//     ws.on('message', msg => {
//         console.info('WebSocket收到了来自客户端信息', msg.toString())
//         // 模拟服务端向客户端发送信息
//         setTimeout(()=>{
//             ws.send('WebSocket发送信息给客户端')
//         },2000)
//     })
// })
// 客户端 html文件
// const ws = new WebSocket('ws://192.168.1.103:3000')
// ws.onopen = function(){
//     console.log('client opened')
//     ws.send('client发送消息给服务端')
// }
// ws.onmessage = function(event) {
//     console.log('client接收来自服务端的消息：', event.data)
// }

// const btn = document.getElementById("sendBtn")
// btn.addEventListener("click", function() {
//     ws.send('client clicked')
// })