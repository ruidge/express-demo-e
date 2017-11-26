//闭包
var a = 1;

function f() {
    var b = 2;
    var index = 1;
    return function (a) {
        return a + b + "index : " + (index++);
    }
}

// console.log(a + b);
console.log(f()(a));
console.log(f()(a));
console.log(f()(a));
var ff = f();
console.log(ff(a));
console.log(ff(a));
console.log(ff(a));
console.log("-------");

var db = (function() {
    var data = {};
    return function(key, val) {
        if (val === undefined) { return data[key] } // get
        else { return data[key] = val } // set
    }
})();
console.log(db('x'));    // 返回 undefined
console.log(db('x', 2)); // 设置data['x']为1
console.log(db('x'));