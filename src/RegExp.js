/** RegExp 构造函数
 *    在ES5中， RegExp 构造函数的参数有两种情况。
 */
// 第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）
// var regex = new RegExp('xyz', 'i')
// // 等价于
// var regex = /xyz/i;

// 第二种情况是，参数是一个正则表达式，这时会返回一个原有正则表达式的拷贝
// var regex = new RegExp(/xyz/i);
// // 等价于
// var regex = /xyz/i;

// 但是，ES5 不允许此时使用第二个参数添加修饰符，否则会报错
// var regex = new RegExp(/xyz/, 'i')
// Uncaught TypeError: Cannot supply flags when constructing one RegExp from another

// ES6改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
// console.log(new RegExp(/abc/ig, 'i').flags) // i
// 上面代码中，原有正则对象的修饰符是ig，它会被第二个参数i覆盖。

/** 字符串的正则方法
 *    字符串对象共有4个方法，可以使用正则表达式: 
 *        - match()
 *        - replace()
 *        - search()
 *        - split()
 * 
 *  ES6 将这4个方法，在语言内部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象是。
 *    - String.prototype.match 调用 RegExp.prototype[Symbol.match]
 *    - String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
 *    - String.prototype.search 调用 RegExp.prototype[Symbol.search]
 *    - String.prototype.split 调用 RegExp.prototype[Symbol.split]
 */


 /** u 修饰符
  *   ES6 对正则表达式添加了 u 修饰符，含义为 ‘Unicode模式’， 用来正确处理大于\uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码 
  * 
 */
// console.log(/^\uD83D/u.test('\uD83D\uDC2A')); // false
// console.log(/^\uD83D/.test('\uD83D\uDC2A')) // true

// 上面代码中，\uD83D\uDC2A 是一个四个字节的UTF-16 编码，代码一个字符。但是ES5 不支持四个字节的UTF-16编码，会将其识别为两个字符，导致第二行代码结果为true。加了u 修饰符以后，ES6就会识别其为一个字符，所以第一行代码结果为false。

// 一旦加上u 修饰符号，就会修改下面这些正则表达式的行为。

/** （1）点字符
 *    点（.） 字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的Unicode 字符，点字符不能识别，必须加上u 修饰符。
 */
// var s = '𠮷';
// console.log(/^.$/.test(s)) // false
// console.log(/^.$/u.test(s))
// 上面代码表示，如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。

/** （２）Unicode 字符表示法
 *    ES6 新增了使用大括号表示Unicode 字符，这种表示法在正则表达式中必须加上u 修饰符，才能识别当中的大括号，否则会被解读为量词。
 */
// console.log(/\u{61}/.test('a'))
// console.log(/\u{61}/u.test('a'))
// console.log(/\u{20BB7}/u.test('𠮷'))
// 上面代码表示，如果不加u 修饰符，正则表达式无法识别\u{61} 这种表示法，只会认为这匹配61 个连续的 u。

/**　（３）量词
 *    　使用 u 修饰符后，所有量词都会正确识别码点大于 0xFFFF的 Unicode 字符
 */
// console.log(/a{2}/.test('aa')) // true
// console.log(/a{2}/u.test('aa')); // true
// console.log(/𠮷{2}/.test('𠮷𠮷')); // false
// console.log(/𠮷{2}/u.test('𠮷𠮷')) // true

/** (4) 预定义模式
 *      u 修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF 的Unicode 字符。
 */
// console.log(/^\S$/.test('𠮷')) // false
// console.log(/^\S$/u.test('𠮷')) // true
// 上面代码的 \S 是预定义模式，匹配所有非空白字符串。只有加了 u 修饰符，它才能正确匹配码点大于0xFFFF的Unicode 字符。
// 利用这一点，可以写出一个正确返回字符串的长度的函数
// function codePointLength(text) {  
//   var result = text.match(/[\s\S]/gu);
//   return result ? result.length : 0;
// }
// var s = '𠮷𠮷';
// console.log(s.length) // 4
// console.log(codePointLength(s)) // 2

/** (5) i 修饰符
 *    有些Unicode 字符的编码不同，但是字型很相近，如果, \u004B 与 \u212A都是大写的K
 */
// console.log(/[a-z]/i.test('\u212A')) // false
// console.log(/[a-z]/iu.test('\u212A')) // true
// 上面代码中，不加u修饰符，就无法识别非规范的K字符

/** (6) 转义
 *    没有u 修饰符的情况下，正则中没有定义的转义（如逗号的转义\, ）无效，而在 u 模式会报错
 */
// console.log(/\,/) // /\,/
// console.log(/\,/u) // Uncaught SyntaxError: Invalid regular expression: /\,/
// 上面代码中，没有 u 修饰符时，逗号前面的反斜杠是无效的，加了 u 修饰符就报错。


/** RegExp.prototype.unicode 属性
 *    正则实例对象新增 unicode 属性，表示是否设置了 u 修饰符
 */

//  const r1 = /hello/;
//  const r2 = /hello/u;
//  console.log(r1.unicode) // false
//  console.log(r2.unicode) // true
// 上面代码中，正则表达式是否设置了 u 修饰符，可以从unicode 属性看出来。

/** y 修饰符
 *    除了 u 修饰符，ES6 还为正则表达式添加了 y 修饰符，叫做“粘连”（sticky）修饰符
 *    y 修饰符的作用与 g 修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一位置开始。不同之处在于，g 修饰符只要剩余位置中存在匹配就可，而 y 修饰符 确保匹配必须从剩余的第一位置开始，这也就是“粘连”的涵义
 */
// var s = 'aaa_aa_a';
// var r1 = /a+/g;
// var r2 = /a+/y;
// console.log(r1.exec(s))  // ['aaa']
// console.log(r2.exec(s))  // ['aaa']

// console.log(r1.exec(s))  // ['aa']
// console.log(r2.exec(s))   // null
// 上面代码有两个正则表达式，一个使用 g 修饰符，另一个使用 y 修饰符。这两个正则表达式各执行了两次，第一次执行的时候，两者行为相同，剩余字符串都是_aa_a。 由于g 修饰没有位置要求，所以第二次执行会返回结果，而y 修饰符要求匹配必须从头开始，所以返回null

// 如果改一下正则表达式，保证每次都能头部匹配，y 修饰符就会返回结果了
// var s = 'aaa_aa_a';
// var r = /a+_/y;
// console.log(r.exec(s)) // aaa_
// console.log(r.exec(s)); // aa_
// 上面代码每次匹配，都是从剩余字符串的头部开始。
// 使用lastIndex属性，可以更好地说明 y 修饰符。

// const REGEX = /a/g;

// // 指定从2号位置（y）开始匹配
// REGEX.lastIndex = 2;

// // 匹配成功
// const match = REGEX.exec('xaya');

// // 在3号位置匹配成功
// console.log(match.index) // 3

// // 下一次匹配从4号位开始

// REGEX.lastIndex; // 4

// // 4号位开始匹配失败
// console.log(REGEX.exec('xaya')) // null
// 上面代码中，lastIndex 属性指定每次搜索的开始位置，g 修饰符从这个位置开始向后搜索，直到发现匹配为止。

// y修饰符同样遵守lastIndex 属性，但是要求必须在 lastIndex 指定的位置发现匹配。
// const REGEX = /a/y;

// // 指定从2号位置开始匹配
// REGEX.lastIndex = 2;

// // 不是粘连，匹配失败
// console.log(REGEX.exec('xaya')) // null

// // 指定从3号位置开始匹配
// REGEX.lastIndex = 3;

// // 3 号位置是粘连，匹配成功
// const match = REGEX.exec('xaya');
// console.log(match.index) // ３
// console.log(REGEX.lastIndex)　// 4

// 实际上，y 修饰符号隐含了头部匹配的标志 ^
// console.log(/b/y.exec('aba')) // null
// 上面代码由于不能保证头部匹配，所以返回null。y 修饰符的设计本意，就是让头部匹配的表示 ^ 在全局匹配中都有效。

// 下面是字符串对象的replace方法的例子
// const REGEX = /a/gy;
// console.log('aaxa'.replace(REGEX, '-')) // --xa

// 上面代码中，最后一个a因为不是出现在下一次匹配的头部，所以不会被替换。
// 单单一个 y 修饰符对match方法，只能返回第一匹配，必须与 g 修饰符联用，才能返回所有匹配。
// console.log('a1a2a3'.match(/a\d/y)) // ['a1]
// console.log('a1a2a3'.match(/a\d/gy)) // ['a1', 'a2', 'a3']

// // y 修饰符的一个应用，是从字符串提取token（词元），y 修饰符确保了匹配之间不会漏掉的字符
// const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
// const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

// // tokenize(TOKEN_Y, '3 + 4')
// // // [ '3', '+', '4' ]
// // tokenize(TOKEN_G, '3 + 4')
// // // [ '3', '+', '4' ]

// console.log(tokenize(TOKEN_Y, '3 + 4'))  // [ '3', '+', '4' ]
// console.log(tokenize(TOKEN_G, '3 + 4'))  // [ '3', '+', '4' ]

// function tokenize(TOKEN_REGEX, str) {
//   let result = [];
//   let match;
//   while (match = TOKEN_REGEX.exec(str)) {
//     result.push(match[1]);
//   }
//   return result;
// }
// // 上面代码中，如果字符串里面没有非法字符，y 修饰符与 g 修饰符的提取结果是一样的。但是，一旦出现非法字符，两者的行为就不一样了
// console.log(tokenize(TOKEN_Y, '3x + 4'))  // [ '3']
// console.log(tokenize(TOKEN_G, '3x + 4'))  // [ '3', '+', '4' ]
// 上面代码中，g 修饰符会忽略非法字符，而y修饰符不会，这样就很容易发现错误

/**　RegExp.prototype.sticky  属性
 *    与 y 修饰符相匹配，ES6 的正则实例对象对了 sticky 属性，表示是否设置了y 修饰符
 */
// var r = /hello\d/y;
// console.log(r.sticky) // true

/** RegExp.prototype.flags 属性
 *    ES6 为正则表达式新增了 flags 属性，会返回正则表达式的修饰符
 */
// ES5 的source 属性
// 返回正则表达式的正文
// console.log(/abc/ig.source) // abc

// // ES6 的 flags属性
// // 返回正则表达式的修饰符
// console.log(/abc/ig.flags) // gi

/** s 修饰符： dotAll 模式
 *    正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的UTF-16 字符，这个可以用 u 修饰符解决；另一个是行终止符（line terminator character）
 * 
 *    所谓行终止符，就是该字符表示一行的终结，以下四个字符属于”行终止符“
 *    
 *      - U + 000A 换行符(\n)
 *      - U + 000D 回车符(\r)
 *      - U + 2028 行分隔符(line separator)
 *      - U + 2019 段分隔符(paragraph separator)
 */
// console.log(/foo.bar/.test('foo\nbar')) // fase
// 上面代码中，因为. 不匹配\n, 所以正则表达式返回false

// 这种解决方案毕竟不太符合直觉，ES2018 引入了 s 修饰符，使得 . 可以匹配任意单个字符。
// console.log(/foo.bar/s.test('foo\nbar')); // true

// 这被称为 dotAll 模式，即点(dot) 代表一切字符，正则表达式还引入了一个dotAll 属性，返回一个布尔值，表示该正则表示式是否处在dotAll 模式。
// const re = /foo.bar/s;
// 另一种写法
// const re = new RegExp('foo.bar', 's')

// console.log(re.test('foo\nbar')) // true;
// console.log(re.dotAll) // true
// console.log(re.flags) // s
// /s 修饰符和多行修饰符/m 不冲突，两者一起使用的情况下，. 匹配所有字符，而 ^ 和 $ 匹配每一行的行首和行尾

/** 后行断言
 *    JavaScript语言的正则表达式，只支持先行断言(lookahead) 和 先行否定断言(negative lookahead)， 不支持后行断言(lookbehind) 和 后行否定断言(negative lookbehind).
 *    ES2018 引入后行断言，V8 引擎4.9版（Chrome 62）已经支持。
 * 
 *  “先行断言”指的是，x 只有在 y 前面才匹配，必须写成/x(?=y)/。 比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。
 *  “先行否定断言” 指的是，x只有不在y前面才匹配，必须写成/x(?!y)/。比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。
 */
// console.log(/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')) // ['100']
// console.log(/(?<!\$)\d+/.exec('it’s is worth about €90')) ['90']

// 上面的例子中，“后行断言”的括号之中的部分(?<=\$)，也是不计入返回结果

// 下面的例子是使用后行断言进行字符串替换
// const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
// console.log('$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar')) // $bar %foo foo