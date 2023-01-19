const http = require("http")

class LikeExpress {
    constructor(){
        this.routes = {
            all: [], //收集use的中间件
            get: [], //收集get的中间件
            post: [] //收集post的中间件
        }
    }
    // 注册中间件方法
    register(path){
        const info = {}
        if(typeof path === "string"){
            info.path = path
            info.stack = Array.prototype.slice.call(arguments, 1)
        }else {
            info.path = '/'
            info.stack = Array.prototype.slice.call(arguments, 0)
        }
    }
    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }
    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }
    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }
    match(method, url) {
        let stack = []
        if(url === '/favicon.ico'){
            return stack
        }
        // 获取所有的routes
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all)
        curRoutes = curRoutes.concat(this.routes[method])
        curRoutes.forEach(routeInfo => {
            if(url.indexOf(routeInfo.path) === 0){
                stack.concat(routeInfo.stack)
            }
        })
        // 返回匹配路由的队列
        return stack
    }
    // 核心 next方法实现机制
    handle(req, res, stack) {   
        const next = () => {
            // 拿到第一个中间件
            const middleware = stack.shift()
            if(middleware){
                // 执行中间件函数
                middleware(req, res, next)
            }
        }
        next()
    }
    callback(){
        return (req, res) => {
            res.json = data => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }
            const url = req.url
            const method = req.method.toUpperCase()
            const resultList = this.match(method ,url)
            this.handle(req, res, resultList)
        }
    }
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = function(){
    return new LikeExpress()
}