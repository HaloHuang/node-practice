/*
 * @Author: Huangyifei 
 * @Date: 2022-07-20 17:22:48 
 * @Last Modified by: Huangyifei
 * @Last Modified time: 2022-07-28 23:11:07
 */

// 手写深拷贝,考虑Object、Array、Map、Set、循环引用
// WeakMap弱引用类型，引用完就会垃圾回收，避免了循环引用
// function deepClone2(obj = {}, map = new WeakMap()) {
//     // obj == null 就相当于object === null || object === undefined
//     if(typeof obj !== 'object' || obj == null){
//         return obj
//     }
//     // 避免循环引用
//     const objFromMap = map.get(obj)
//     if(objFromMap) return objFromMap
    
//     let result = {}
//     map.set(obj, result)

//     if(obj instanceof Map){
//         result = new Map()
//         obj.forEach((val, key) => {
//             const v = deepClone2(val, map)
//             const k = deepClone2(key, map)
//             result.set(k, v)
//         })
//     }
    
//     if(obj instanceof Set){
//         result = new Set()
//         obj.forEach(val => {
//             const v = deepClone2(val, map)
//             result.add(v)
//         })
//     }
//     if(obj instanceof Array){
//         result = obj.map(item => {
//             deepClone2(item, map)
//         })
//     }
    
//     for(let key in obj){
//         const val = obj[key]
//         const val1 = deepClone2(val, map)
//         result[key] = val1
//     }
    
//     return result
// }
// const data2 = {
//     setKey: new Set(['js', 'html', 'css', 'node']),
//     mapKey: new Map([['x', 10], ['y', 20]])
// } 
// const copyData2 = deepClone2(data2)
// console.log('copyData2', copyData2)

// // 数组、对象 简单深拷贝
// function deepClone1(obj = {}){
// 	// obj == null 就相当于object === null || object === undefined
// 	if(typeof obj !== 'object' || obj == null) {
// 		return obj
// 	}
// 	let result 
// 	if(obj instanceof Array){
// 		result = []
// 	}else if(obj instanceof Object){
// 		result = {}
// 	}
// 	for(let key in obj){
// 		// 保证key不是原型上的属性
// 		if(obj.hasOwnProperty(key)){
// 			result[key] = deepClone1(obj[key]) // 递归
// 		}
// 	}
// 	return result
// }
// const data1 = {
//     name: '黄贻飞',
//     skills: ['js', 'html', 'css', 'node'],
//     plan: {
//         next: 'study'
//     }
// } 
// const copyData1 = deepClone1(data1)
// console.log('copyData1', copyData1)

// 手写数组转树
function arrayToTree(arr){
    let root = null
    let idToNode = new Map()
    arr.forEach(item => {
        const {id, name, parentId} = item
        let treeNode = {
            id,
            name
        }
        idToNode.set(id, treeNode)
        
        parentNode = idToNode.get(parentId)
        if(parentId){
            if(parentNode.children == null) parentNode.children = []
            parentNode.children.push(treeNode)
        }
        console.log(treeNode, parentNode, parentId, idToNode, 'parentNode后')
        if(parentId === 0) root = treeNode
        console.log(root, 'root')
    })
    // console.log(root)
    return root
}

const arr = [
    {name: '一级部门A', id: 1, parentId: 0},
    {name: '二级部门B', id: 2, parentId: 1},
    {name: '二级部门C', id: 3, parentId: 1},
    {name: '三级部门D', id: 4, parentId: 2},
    {name: '三级部门E', id: 5, parentId: 3},
    {name: '三级部门F', id: 6, parentId: 3}
]
console.log(arrayToTree(arr))

// 手写call、bind、apply
// 区别apply参数是个数组，bind返回一个新的函数
// Function.prototype.myBind = function() {
//     const args = Array.prototype.slice.call(arguments) // 将传入的参数变成数组
//     const _this = args.shift() // 获取数组第一项作为this
//     const self = this
//     // 返回一个函数
//     return function() {
//         self.apply(_this, args) 
//     }
// }

// function fn1(x, y) {
//     console.log(this, 'this', x, y)
//     return 'this is fn1'
// }
// const fn2 = fn1.myBind({x: 100}, 1, 2)
// console.log(fn2())