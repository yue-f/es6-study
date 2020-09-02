'use strict';

{
  var _a = 10;
  var b = 1;
}
console.log(a); // Uncaught ReferenceError: a is not defined
console.log(b);

/** 
 * let 是块级作用域，
 *    只在所在代码块内有效
 * 
 */

/** i 是全局变量，所有console i指向的都是同一个 也就是10 */
// var a = [];
// for (var i = 0; i < 10; i++) {
//   a[i] = function() {
//     console.log('i -> ', i);
//   };
// }
// a[6](); // 10

var a = [];

var _loop = function _loop(_i) {
  a[_i] = function () {
    console.log('i -> ', _i);
  };
};

for (var _i = 0; _i < 10; _i++) {
  _loop(_i);
}
a[6](); // 6

/** 
 * for
 *  循环有一个特别之处，设置循环变量的那部分是一个父作用域，
 *  循环体内是一个单独的子作用域
 *  表明函数内部的变量j 与循环变量就不在同一个作用域，有各自单独的作用域
 */
for (var j = 0; j < 3; j++) {
  var j = 'abc';
  console.log('j -> ', j); // abc *3
}

/** 
 * var
 *    会发生`变量提升`现象，即变量可以在声明之前使用，值为 undefined
 * let
 *    不存在变量提升，所声明变量一定要在声明后使用，否则报错
 */
//  var 情况
/**
 console.log('var foo -> ', foo) // undefined
 var foo = 2;

//  let 情况
console.log('let bar -> ', bar) // Uncaught ReferenceError: Cannot access 'bar' before initialization
let bar = 2;
 */

/** 
 * 暂时性死区(temporal dead zone，简称 TDZ)
 *    只要是块级作用域内存在let命令，它所声明的变量就“绑定”(binding) 这个区域，不再受外部的影响
 *    es6声明，如果区块中存在let 和 const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域
 *    凡是在声明之前就是用这些变量就会报错。
 *  总之，在代码块内，是用let命令声明变量之前，该变量都是不可用的。
 *       这在语法上，成为`暂时性死区`
 * 
 * 
 */

/**
var tmp = 123;
if(true) {
 tmp = 'abc'; // Uncaught ReferenceError: Cannot access 'tmp' before initialization
 let tmp;
}
*/

if (true) {
  //  TDZ开始
  /**
   tmp = 'abc';
   console.log('TDZ start tmp ->', tmp) // Uncaught ReferenceError: Cannot access 'tmp' before initialization
    */
  //  TDZ 结束
  var _tmp = void 0;
  console.log('TDZ end tmp', _tmp); // undefined

  _tmp = 123;
  console.log('tmp -> ', _tmp); // 123
}

/** 暂时性死区
 *   也就意味着 typeof 不再是一个百分之百安全的操作
 * 
 */
/**
typeof x // Uncaught ReferenceError: Cannot access 'x' before initialization
let x
*/

/**
 function bar1(x = y, y = 2) {
   return [x, y]
 }
 bar1() // Uncaught ReferenceError: Cannot access 'y' before initialization
  */

/** let
 *   不允许在相同作用域内，重复声明同一个变量
 */
// 报错 Uncaught SyntaxError: Identifier 'a' has already been declared
// function fn() {
//   let a = 10;
//   var a = 1;
// }
// 报错 Uncaught SyntaxError: Identifier 'a' has already been declared
// function fn() {
//   let a = 10;
//   let a = 1;
// }

/** 
 *  块级作用域
 *    为什么需要块级作用域？？
 *      es5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景
 */
/** 场景1
 *    内层变量可能会覆盖外层变量
 * 
 *      if代码块的外部使用外层tmp变量，内部使用内层的tmp变量，
 *      但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量
 * 
 */
var tmp = new Date();
function f() {
  console.log('f -> ', tmp);
  if (false) {
    var tmp = 'hello world';
  }
}
f(); // undefined

/** 场景2
 *    用来计数的循环变量泄露为全局变量  
 *    
 *     i只是用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量
 */
var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(i, ' -> ', s[i]);
}
console.log(' i -> ', i);

// es6的块级作用域
/** let
 *    实际上为了JavaScript新增了块级作用域
 */
function f1() {
  var n = 5;
  if (true) {
    var _n = 10;
  }
  console.log('n -> ', n);
}
f1();

/** 
 * 允许块级作用域的任意嵌套
 * 
 */
{
  {
    {
      {
        {
          {
            var insane = 'hello';
          }
          // console.log('insane -> ', insane) // Uncaught ReferenceError: insane is not defined
        }
      }
    }
  }
}

/** 内层作用域可以定义外层作用域的同名变量 */
{
  {
    {
      var instane = 'hello11';
      {
        var _insane = 'hello';
      }
    }
  }
}

/** 
 * 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名IIFE）不再必要了 
 */
// IIFE 写法
(function () {
  var tmp = 'hello';
})();

// 块级作用域
{
  var _tmp2 = 'hello';
}

/** 
 * 块级作用域 与 函数声明
 *   函数能不能在块级作用域之中声明？ 
 *    es5 规定，函数只能在顶层作用域和 函数作用域之中声明，不能在块级作用域声明
 * 
 *      下面两种情况声明，根据es5 的规定都是!!非法的
 *        但是， 浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数
 *        因此， 下面两种情况实际都能运行，不会报错
 * 
 */
// 情况一
if (true) {
  var f2 = function f2() {};
}
// 情况二
try {
  var f3 = function f3() {};
} catch (e) {}

/** 
 * es6 引入了块级作用域，明确允许在块级作用域之中声明函数。
 * es6 规定， 块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用
 */
function f4() {
  console.log('I am outside!');
}
(function () {
  if (false) {
    // 重复声明一次函数f4
    var _f = function _f() {
      console.log('I am inside!');
    };
  }
  f4();
})();
