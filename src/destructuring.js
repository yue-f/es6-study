/** 变量的结构赋值
 *    - 数组的解构赋值
 *    - 对象的解构赋值
 *    - 字符串的解构赋值
 *    - 数值和布尔值的解构赋值
 *    - 函数参数的解构赋值
 *    - 圆括号问题
 *    - 用途
 */

 /** 1. 数组的解构赋值
  * 
  *   基本用法：
  *     es6 允许按照一定模式，从数组和对象中提取，对变量进行赋值，这被称为解构（Destructuring）
  */
 
  // 以前，为变量赋值，只能直接指定值
  // let a = 1;
  // let b = 2;
  // let c = 3;
  // es6 允许写成下面👇这样
  // let [a, b , c] = [1, 2, 3];

  // 上面👆代码表示，可以从数组中提取值，按照对应位置，对变量赋值
  /** 本质上，
   *    这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。
   */

  //  let [foo, [[bar], baz]] = [1, [[2], 3]];
  //  console.log(foo, bar, baz)

  // let [,, third] = ['foo', 'bar', 'baz']
  // console.log(third);

  // let [x, , y] = [1, 2, 3];
  // console.log(x, y);

  // let [head, ...tail] = [1, 2, 3, 4];
  // console.log(head, tail, typeof tail);
  
  // let [x, y, ...z] = ['a'];
  // console.log(x, y, z); // a  undefined  []

  // 如果解构不成功，变量的值就等于 undefined
//   let [foo] = []; 
//   console.log(foo);// undefined

//   let [bar, foo] = [1] 
// console.log(foo);// undefined
// 以上两种情况都属于解构不成功，foo的值都会等于 undefined

// 另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组，这种情况下，解构依可以成功。
// let [x, y] = [1, 2, 3]
// console.log(x, y);

// let [a, [b], d] = [1, [2, 3], 5]
// console.log(a, b, d);
// 上面👆两个例子，都属于不完全解构，但是可以成功

// 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》），那么将会报错

// 报错 Uncaught TypeError: 1 is not iterable
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};

// 上面👆的语句都会报错，因为等号右边的值，要么转为对象以后不具备Iterator接口（前五个表达式），要么本身就不具备Iterator接口（最后一个表达式）

/** Set
 *    对于 set 结构，也可以使用数组的解构赋值
 */

//  let [x, y, z] = new Set(['a', 'b', 'c']);
//  console.log(x);

// 事实上，只要某种数据结构具备Iterator接口，都可以采用数组形式的解构赋值。
// function* fibs() {
//   let a = 0;
//   let b = 1;
//   while(true) {
//     yield a;
//     [a, b] = [b, a+b];
//   }
// }
// let [first, second, third, fourth, fifth, sixth, seventh] = fibs();
// console.log(first);
// console.log(second);
// console.log(third);
// console.log(fourth);
// console.log(fifth);
// console.log(sixth);
// console.log(seventh);

// 👆上面代码中，fibs是一个Generator函数，原生具有Iterator接口。解构赋值会一次从这个接口获取值。

/** 默认值
 *    解构赋值允许指定默认值
 */
// let [foo = true] = [];
// console.log(foo);

// let [x, y = 'b'] = ['a']
// console.log(x, y);
// let [a, b = 'b'] = ['a', undefined]
// console.log(a, b);

/**  ！！注意
 *        ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
 *      所以，只有当一个数组成员严格等于 undefined，默认值才会生效
 */

//  let [x = 1] = [undefined];
//  console.log(x); // 1
//  let [y = 1] = [null]
// console.log(y); // null
// 👆上面代码中，如果一个数组成员是null，默认值就不会生效, 因为null不严格等于undefined。

// 如果默认值是一个表达式，那么这个表达式是惰性求值，即只有在用到的时候才会求值
// function f() {
//   console.log('aa');
// }
// let [x = f()] = [1]
// console.log(x); // 1
// // 👆上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面👇的代码。
// let x;
// if ([1][0] === undefined){
//   x = f()
// } else {
//   x = [1][0]
// }
// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
// let [x = 1, y = x] = [];
// let [x = 1, y = x] = [2];
// let [x = 1, y = x] = [1, 2];
// 报错 Uncaught ReferenceError: Cannot access 'y' before initialization
// let [x = y, y = 1] = [];

// 👆上面最后一个表达式所以会报错，是因为x用y做默认值时，y还没有声明


/** 对象的解构赋值
 *    简介 : 解构不仅可以用于数组，还可以用于对象
 */

//  let {foo, bar} = {foo: 'a', bar: 'b'}
//  console.log(foo, bar);

// 对象的解构与数组有一个重要的不同，数组的元素时按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能全都正确的值

// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量
// let {Log, sin, cos} = Math;

// const{log} = console;
// log(sin);

// 如果变量名与属性名不一致，必须写成下面这样
// let {foo: baz} = {foo: 'aaa', bar: 'bbb'}
// console.log(baz);
// console.log(foo); // Uncaught ReferenceError: foo is not defined
// 上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

// 这实际上说明，对象的解构赋值是下面形式的简写
// let {foo: foo, bar: bar} = {foo: 'aa', bar: 'bb'};
// 对象的解构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者

// 与数组一样，解构也可以用于嵌套结构的对象
// let obj = {
//   p: [
//     'Hello', 
//     {y: 'World'}
//   ]
// }

// let {p, p:[x, {y}]} = obj;
// console.log(x, y);

// 报错  因为foo这时等于undefined，再取子属性就会报错。
// let {foo: {bar}} = {baz: 'baz'}

// 注意 对象的解构赋值可以取到集成的属性。
// const obj1 = {};
// const obj2 = {foo: 'bar'};
// Object.setPrototypeOf(obj1, obj2);
// const {foo} = obj1;
// console.log(foo); // bar
// 👆上面代码中，对象obj1的原型对象是obj2。 foo 属性不是obj1自身的属性，而是集成自obj2的属性，解构赋值可以取到这个属性


// 注意点
/** 1. 如果讲一个已经声明的变量用于解构赋值，必须非常小心 */
// 错误写法
// let x;
// {x} = {x: 1};
// 👆上面代码的洗发会报错， 因为 JavaScript 引擎会将{x} 理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免JavaScript 将其解释为代码块，才能解决这个问题。

// 正确写法
// let x;
// ({x} = {x : 1})

/** 2. 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式 */
// ({} = [true, false]);
// ({} = 'abc');
// ({} = []);
// 上面的表达式虽然毫无意义，但是语法是合法的可以执行。

/** 3. 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构 */
// let arr = [1, 2, 3];
// let {0: first, [arr.length - 1]: last} = arr;
// console.log(first, last);
// 上面代码对数组进行对象解构，数组arr的0键对应的值是 1， [arr.length - 1]就是2键，对应的值是3。方括号这种写法，属于 “属性名表达式”



/** 字符串的解构赋值
 *    字符串也可以解构赋值。这是因为此时 ，字符串被转成了一个类似数组的对象。
 */
// const [a, b, c, d, e] = 'hello'
// console.log(a, b, c, d, e);

// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值

// let {length: len} = 'hello';
// console.log(len);

/** 数值和布尔值的解构赋值
 *    解构赋值时，如果等号右边是数值和布尔值，否则会先转为对象
 */
// let {toString: s} = 123;
// console.log(s === Number.prototype.toString); // true

// let {toString: s} = true;
// console.log(s === Boolean.prototype.toString); // true

// let sum = [[1, 2], [3, 4]].map(([a, b]) => {console.log(a, b); return a + b})
// console.log("[]", sum)


// 为move函数的参数x，y指定默认值
// function move({x = 0, y = 0} = {}) {
//   return [x, y]
// }

// 为move函数指定的默认值
// function move({x, y} = {x: 0, y: 0}) {
//   return [x, y]
// }

// console.log(move({x: 3, y: 8}))
// console.log(move({x: 3}))
// console.log(move({}))
// console.log(move())

/** 圆括号的问题
 *  解构赋值虽然很方便，但是解析起来并不容易。
 *  对于编辑器来说，一个式子到底是模式，还是表达式，没办法从一开始就知道，必须解析到（或解析不到）等号才知道。
 * 
 *  由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规定是，只要有可能导致解构的歧义，就不得使用圆括号。
 * 
 *   但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。
 *    因此，建议只要有可能，就不要在模式中放置圆括号
 */

 /** 不使用圆括号的情况
  * 
  *   1. 变量声明语句
  */
 // 全部报错 模式不能使用圆括号
//  let [(a)] = [1];
//  let {x:(c)} = {};
//  let ({x: c}) = {};
//  let {(x:c)} = {};
//  let {(x): c} = {};
//  let {o: ({p: p})} = {o: {p: 2}}

/** 2. 函数参数
 *    函数参数也属于变量声明，因此不能带有圆括号
 */
// 全部报错
// function f([(z)]) {return z}
// function ([z, (x)]) {return x }

/** 3. 赋值语句的模式 */
// 报错 Uncaught SyntaxError: Invalid left-hand side in assignment
// ({p: a}) = {p: 42}
// ([a]) = [5]


/** 
 * 可以使用圆括号的情况
 *    只有一种： 赋值语句的非模式部分 
 */
// [(b)] = [3]
// ({p: (d)} = {})
// [(parseInt.prop)] = [3]

/** 用途
 *    变量的解构赋值用途很多
 *    
 *    1. 交换变量的值
 */
// let x = 1;
// let y = 2;
// [x, y] = [y, x]
// console.log(x, y);

/** 2. 从函数返回多个值
 *    函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里面返回。
 *    有了解构赋值，取出这些值就非常方便
 */

// //  返回一个数组
//  function example() {  
//    return [1, 2, 3]
//  }
//  let [a, b, c] = example()

// //  返回一个对象
// function exampleObj() {  
//   return {
//     foo: 1,
//     bar: 2,
//   };
// }
// let {foo, bar} = exampleObj()

/** 3. 函数参数的定义
 *      解构赋值可以方便地将一组参数与变量名对应起来
 *    
 *  数组参数是有次序的
 *  对象参数是无次序的
 */

//  参数是一组有次序的值
// function f([x, y, z]) { ... }
// f([1, 2, 3])

// 参数hi一组无次序的值
// function f({x, y, z}) { ... }
// f({z: 3, y: 2, x: 1});

/**  提取JSON数据
 * 
 *    解构赋值对提取JSON对象中的数据，尤其有用
 */
// let jsonData = {
//   id: 42,
//   status: 'ok',
//   data: [999, 543]
// };

// let {id, status, data: number} = jsonData;
// console.log(id, status, number);

/** 5. 函数参数的默认值
 *    指定参数的默认值，就避免了在函数体内部再写 var foo = config.foo || 'default foo;'这样的语句
 */

//  JQuery.ajax = function (url, {
//    async = true,
//    beforeSend = function () {  },
//    cache = true,
//    complete = function () {  },
//    crossDomain = false,
//    global = true,
//   //  ... more config
//  } = {}) {
//   // ...do stuff
// }

/** 遍历Map 解构
 *    任何部署了Iterator 接口的对象，都可以用for.. of循环遍历。
 *    Map 解构原生支持Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便
 */

//  const map = new Map();
//  map.set('first', 'hello')
//  map.set('second', 'world')

// for(let [key, value] of map) {
//   console.log(key + ' is ' + value);
// }

// 只获取键名
// for(let [key] of map) { ...}

// 只获取键值
// for(let [,value] of map) {...}

/** 输入模块的指定方法
 *    加载模块时，往往需要指定输入哪些方法。
 *    解构赋值使得输入语句非常清晰
 */
// const {SourceMapConsumer, SourceNode} = require('source-map')