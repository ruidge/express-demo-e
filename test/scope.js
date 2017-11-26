//作用域
console.log("hello");

var foo = 1;
function bar() {
    if (!foo) {
        var foo = 10;
    }
    console.log(foo);
}
bar();
console.log(foo);
console.log("-------");

var foo1 = 1;
if (true) {
    let foo1 = 10;
    console.log(foo1);
}
console.log(foo1);
console.log("-------");

var a = 1;
function b() {
    a = 10;
    return;

    function a() {
    }
}
b();
console.log("-------");

var foo2 = 1;
function bar2() {
    console.log(foo2);
}
bar2();