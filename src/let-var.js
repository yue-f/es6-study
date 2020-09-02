// {
//   let a = 10;
//   var b = 1;
// }
// console.log(a)  // Uncaught ReferenceError: a is not defined
// console.log(b)

// /** 
//  * let 是块级作用域，
//  *    只在所在代码块内有效
//  * 
//  */

//  /** i 是全局变量，所有console i指向的都是同一个 也就是10 */
// // var a = [];
// // for (var i = 0; i < 10; i++) {
// //   a[i] = function() {
// //     console.log('i -> ', i);
// //   };
// // }
// // a[6](); // 10

// var a = [];
// for (let i = 0; i < 10; i++) {
//   a[i] = function() {
//     console.log('i -> ', i);
//   };
// }
// a[6](); // 6

/** 
 * for
 *  循环有一个特别之处，设置循环变量的那部分是一个父作用域，
 *  循环体内是一个单独的子作用域
 *  表明函数内部的变量j 与循环变量就不在同一个作用域，有各自单独的作用域
 */
// for (let j = 0; j < 3; j++) {
//   let j = 'abc'
//   console.log('j -> ', j) // abc *3
// }

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

//  if(true) {
//   //  TDZ开始
//   /**
//    tmp = 'abc';
//    console.log('TDZ start tmp ->', tmp) // Uncaught ReferenceError: Cannot access 'tmp' before initialization
//     */
//   //  TDZ 结束
//    let tmp;
//    console.log('TDZ end tmp', tmp) // undefined

//    tmp = 123;
//    console.log('tmp -> ', tmp) // 123
//  }

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
  // var tmp = new Date()
  // function f() {
  //   console.log('f -> ', tmp)
  //   if(false) {
  //     var tmp = 'hello world'
  //   }
  // }
  // f() // undefined

  /** 场景2
   *    用来计数的循环变量泄露为全局变量  
   *    
   *     i只是用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量
   */
  // var s = 'hello'
  // for (var i = 0; i < s.length; i++) {
  //   console.log(i , ' -> ' , s[i])
  // }
  // console.log(' i -> ', i)


  // es6的块级作用域
  /** let
   *    实际上为了JavaScript新增了块级作用域
   */
  // function f1() {
  //   let n = 5
  //   if(true) {
  //     let n = 10
  //   }
  //   console.log('n -> ', n)
  // }
  // f1()

  /** 
   * 允许块级作用域的任意嵌套
   * 
   */
  // {{{{{
  //   {let insane = 'hello'}
  //   // console.log('insane -> ', insane) // Uncaught ReferenceError: insane is not defined
  // }}}}}

  /** 内层作用域可以定义外层作用域的同名变量 */
  // {{{
  //   let instane = 'hello11'
  //   {let insane = 'hello'}
  // }}}

  /** 
   * 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名IIFE）不再必要了 
   */
  // IIFE 写法
  // (function () {
  //   var tmp = 'hello';
  // }());

  // // 块级作用域
  // {
  //   let tmp = 'hello'
  // }

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
// // 情况一
// if(true) {
//   function f2() {  }
// }
// // 情况二
// try {
//   function f3() {  }
// } catch(e) {}

/** 
 * es6 引入了块级作用域，明确允许在块级作用域之中声明函数。
 * es6 规定， 块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用
 * 
 *  下面代码：  
 *     es5 中运行，会得到‘I am inside!’, 
 *         因为在if内声明的函数f4会被提升到函数头部
 * 
 *     es6 中运行，会得到 Uncaught TypeError: f4 is not a function
 *         因为块级作用域内声明的函数类似于let，对作用域之外没有影响。但是如果真在es6浏览器中国运行代码就会报错
 *         原因：如果改变了块级作用域内生命的好桉树的处理规则，显然会对老代码产生很大的影响。为了减轻因此产生的不兼容问题，es6里面规定，浏览器实现可以不遵守上面的规定，又自己的行为方式
 *      -  允许在块级级作用域内声明函数
 *      -  函数声明类似于 var， 即会提升到全局作用域或函数作用域的头部
 *      -  同时，函数声明还会提升到所在的块级作用域的头部
 *  
 *     ！！注意：
 *         上面👆三条规则只对es6的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当做let处理
 *         
 * 
 */
// function f4() {  
//   console.log('I am outside!')
// }
// (function () {  
//   if(false) {
//     // 重复声明一次函数f4
//     function f4() { console.log('I am inside!')  }
//   }
//   f4()
// }())

/** 
 * 根据这三条规则，浏览器的es6环境中，
 * 块级作用域内声明的函数，行为类似于var 声明的变量，
 * 上面代码例子实际运行的代码如下
 */

//  浏览器的 es6环境
// Uncaught TypeError: f4 is not a function
// function f4() { console.log('I am outside!!');  }
// (function () {  
//   var f4 = undefined;
//   if(false) {
//     function f4() { console.log('I am  inside!!');  }
//   }
//   f4();
// }())
/** 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。
 *  如果确实需要，也应该写成函数表达式！！， 而不是函数声明语句。
 */

// //  块级作用域内部的函数声明语句，建议不要使用
//  {
//    let a = 'secret';
//    function f4() {
//      return a;
//    }
//  }
// // 块级作用域内部，优先使用函数表达式
//  {
//    let a = 'secret';
//    let f = function() {
//      return a;
//    }
//  }
 /** 
  * ！！！另外还需要注意的地方，  
  *         es6的块级作用域必须有大括号，如果没有大括号，JavaScript引擎就认为不存在块级作用域
  * 
  */
//  第一种写法，报错
// Uncaught SyntaxError: Lexical declaration cannot appear in a single-statement context
// if(true) let x = 1;

// 第二种写法，不报错
// if(true) {
//   let x = 1;
// }
/**
 *  上面代码中，
 *     第一种写法没有大括号，所以不存在跨级作用域，而let只能出现在当前作用域的顶层，所以会报错。
 *     第二种写法有大括号，所以块级作用域成立。
 * 
 *  函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层
 * 
 */

//  不报错
//  'use strict';
//  if(true) {
//    function f4() {}
//  }

// 报错
// Uncaught SyntaxError: In strict mode code, functions can only be declared at top level or inside a block.
// 'use strict';
// if (true)
//   function f4() {  }

// ********************************************************************


/** 
 *  const 命令
 *    基本用法：
 *      const 声明一个只读的常量。一旦声明，常量的值就不能改变
 */
// const PI = 3.1415;
// console.log(PI)

// 报错
// Uncaught TypeError: Assignment to constant variable.
// PI = 3;
// 上面👆代码表明改变常量的值会报错
// const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到最后赋值

// 报错
// Uncaught SyntaxError: Missing initializer in const declaration
// const foo;

/** 
 *  const的作用域与let命令的相同：只在声明所在的块级作用域内有效。
 * 
 */
// if(true) {
//   const MAX = 5;
// }

// // 报错
// // Uncaught ReferenceError: MAX is not defined
// console.log(MAX)

/** 
 * const 命令声明的常量也是不提升，同样存在暂时性死区 
 *       只能在声明的位置后面使用  
 *   const 声明的变量， 也与let一样不可重复声明
*/
// var message = 'hello';
// let age = 25;

// // 报错 Uncaught SyntaxError: Identifier 'message' has already been declared
// const message = 'byebye!';
// const age = 30;

/**
 *  本质
 *    const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。 
 *    对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
 *    但对于复合类型的数据（主要是对象和数组）， 变量指向的内存地址，保存的是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此将一个对象声明为常量必须非常小心。
 * 
 */
// const foo ={};

// // 为 foo 添加一个属性，可以成功
// foo.prop = 123;
// console.log(foo.prop)

// 报错  Uncaught TypeError: Assignment to constant variable.
// foo = {};
// 上面👆代码中，常量 foo 存储的是一个地址，这个地址指向一个对象。 不可变的只是这个地址，即不能把foo指向另一个底子，但对象本身是可变的，所以依然可以为其添加新属性。

// const a = [];
// a.push('hello');
// a.length = 0;
// a = ['bye']
// 上面👆代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。

// 如果真的想将对象冻结，应该使用Object.freeze方法

// 'use strict';
// const foo = Object.freeze({});
// // 常规模式时，下面👇一行不起作用
// // 严格模式时，该行会报错  Uncaught TypeError: Cannot add property prop, object is not extensible
// foo.prop = 123;
// console.log(foo)

// 彻底冻结对象的函数
// var constantize = (obj) => {
//   Object.freeze(obj);
//   Object.keys(obj).forEach((key, i) => {
//     if(typeof obj[key] === 'object') {
//       constantize(obj[key]);
//     }
//   })
// }

/** 
 *  es6声明变量的六种方式
 *      es5 只有两种声明变量的方式：var 命令和 function命令。
 *      es6 除了添加 let 和 const 命令，还有另外两种声明的变量的方法： import 命令 和 class 命令
 */


 /** 顶层对象的属性
  *     顶层对象，在浏览器环境指的是window对象，在Node指的是global 对象。
  *     es5 之中，顶层对象的属性与全局变量是等价的。
  * 
  */
 window.a = 1;
 console.log(a)
 a = 3;
 console.log(window.a);
//  上面👆代码中，顶灯对象的属性赋值与全局变量的赋值，是同一件事

/** globalThis 对象
 *    JavaScript语言存在一个顶层对象，它提供全局环境（即全局作用域），所以代码都是在这个环境中运行。
 *     但是，顶层对象在各种实现里面是不统一的。
 *      - 浏览器里面，顶层对象是 window， 但是 Node 和 Web Worker 没有 window。
 *      - 浏览器和 Web Worker 里面，self 也指向顶层对象，但是Node 没有 self。
 *      - Node 里面，顶层对象是global，但是其他环境都不支持。
 *    
 *    同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。
 * 
 *      - 全局环境中，this 会返回顶层对象。 但是Node.js 模块中this 返回的是当前模块，es6 模块中this 返回的是undefined。
 *      - 函数里面的 this，如果函数不作为对象的方法运行，而是单纯的作为函数运行，this 会指向顶层对象。但是严格模式下，这时 this 会返回undefined。
 *      - 不管是严格模式，还是普通模式，new Function('return this')(), 总是会返回全局对象。但是，如果浏览器用了CSP（Content Security Policy，内容安全策略）， 那么eval、new Function这些方法都可能无法使用。
 */

//  综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。
// 方法一
(typeof window !== 'undefined') 
    ? window 
    : (typeof process === 'undefined' &&
       typeof require === 'function' && 
       typeof global === 'object') 
       ? global 
       : this;

// 方法二
var getGlobal = function() {
  if(typeof self !== 'undefined') {return self;}
  if(typeof window !== 'undefined') {return window;}
  if(typeof global !== 'undefined') {return global;}
  throw new Error('unable to locate global object');
}

// es2020在语言标准的层面，引入globalThis作为顶层对象，也就是说，任何环节下，globalThis都存在的，都可以从它拿到顶层对象，指向全局环节下的this。
// 垫片库 global-this 模拟了这个提案，可以在所有环境拿到globalThis。 