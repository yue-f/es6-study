/** String.fromCodePoint()
 *    ES5 提供了String.sromCharCode()方法，用于从Unicode码点返回对应字符，但是这个方法不能识别码点大于OxFFFF的字符
 */
// console.log(String.fromCharCode(0x20BB7)) //ஷ
/*
  上面代码中，String.fromCharCode()不能识别大于0xFFFF的码点，所以0x20BB7就发生了溢出，最高位2被舍弃了，最后返回码点U+0BB7 对应的字符，而不是码点U+20BB7对应的字符。

  ES6 提供了String.formcodePoint()方法，可以识别大于0xFFFF的字符弥补了String.sromCharcode()方法的不足。在作用上正好与下面的codePointAt()相反
**/
// console.log(String.fromCodePoint(0x20BB7))
// console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y')
/*
  上面代码中，如果String.fromCodePonit方法有多个参数，则他们会被合并成一个字符串返回。

  注意：
    formCodepoint 方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上
**/


/** String.raw()
 *    ES6 还为原生的String 对象，提供了一个raw() 方法。
 *    该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法
 */
// console.log(String.raw`Hi\n${2+3}!`)
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

//如果原字符串的斜杠已经转义，那么String.raw()会进行再次转义
// 每一个\都需要转义一次，2*2
// console.log(String.raw`Hi\\n`) // 实际返回 "Hi\\\\n"  // "Hi\\n"
// console.log(String.raw`Hi\\n` === "Hi\\\\n") // true

// String.raw() 方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。
// String.raw() 本质上是一个正常的函数，只是专用于模板字符串的标签函数。如果写成正常的函数的形式，它的第一个参数，应该是一个具有raw属性的对象，且raw 属性的值应该是一个数组，对应模板字符串解析后的值。
// `foo${1 + 2}bat`
// 等同于
// console.log(String.raw({raw: ['foo', 'bar']}, 1+2))
// 上面代码中，String.raw() 方法的第一个参数是一个对象，它的raw属性等同于原始的模板字符串解析后得到的数组。

// 作为函数，String.raw() 的代码实现基本如下。
// String.raw = function (strings, ...values) {  
//   let output = '';
//   let index;
//   for(index = 0; index < values.length; index++) {
//     output += strings.raw[index] + values[index];
//   }
//   output += strings.raw[index];
//   return output;
// }

/** codePointAt()
 *    JavaScript 内部，字符以UTF-16的格式存储，每个字符固定为2个字符。对于那些需要4个字节存储的字符（Unicode 码点大于0xFFFF 的字符），JavaScript 会认为它们是两个字符。
 * 
 */
// var s = "𠮷";
// console.log(s.length) // 2
// console.log(s.charAt(0)) // �
// console.log(s.charAt(1)) // �
// console.log(s.charCodeAt(0)) // 55362
// console.log(s.charCodeAt(1)) // 57271
// 上面代码中，汉字"𠮷"，的码点是0x20BB7，UTF-16编码为0xD842 0xDFB7（十进制为 55362 57271），需要4个字节存储。对于这种4个字节的字符，JavaScript不能正确处理，字符串长度会误判为2，而且charAt()方法无法读取整个字符，charCodeAt() 方法只能分别返回前两个字节和后两个字节的值。

// ES6提供了 codePointAt() 方法，能够正确处理4个字符存储的字符，返回一个字符的码点。
// var s = "𠮷a";
// console.log(s.codePointAt(0)) // 134071
// console.log(s.codePointAt(1)) // 57271
// console.log(s.codePointAt(2)) // 97

// codePointAt()方法的参数，是字符在字符串中的位置（从0开始）。上面代码中，JavaScript 将’𠮷a‘视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点134071（即十六进制的20BB7）在第二个字符（即“𠮷”的后两个字节）和第三个字符a上，codePointAt() 方法的结果与charCodeAt()方法相同。
// 总之，codePointAt() 方法会正确返回32 位的UTF-16字符的码点。对于那些两个字节存储的常规字符，它的返回结果与charCodeAt()方法相同。

// codePointAt() 方法返回的是码点的十进制，如果想要十六进制的值，可以使用toString()方法转换一下
// let s = '𠮷a';
// console.log(s.codePointAt(0).toString(16)) // 20bb7
// console.log(s.codePointAt(2).toString(16)) // 6

// 你可能注意到了，codePointAt()方法的参数， 仍然是不正确的。比如上面代码中，字符a在字符串s的正确位置序号应该是1，但是必须向codePointAt() 方法传入2.解决这个问题的一个办法是使用for...of循环，因为它会正确识别32位的UTF-16 字符。
// for(let ch of s) {
//   console.log(ch.codePointAt(0).toString(16))
// }
// 20bb7
// 61

// 另一种方法也可以，使用扩展运算符(...)进行展开运算
// let arr = [...'𠮷a'];
// arr.forEach(ch => console.log(ch.codePointAt(0).toString(16)))
// 20bb7
// 61

// codePointAt()方法是测试一个字符由两个字节还是四个字节组成的最简单方法
// function is32Bit(c) {  
//   return c.codePointAt(0) > 0xFFFF;
// }

// console.log(is32Bit("𠮷")) // true
// console.log(is32Bit("a")) // false

/** 实例方法：normalize()
 *    许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如：Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如 O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。
 * 
 * 这两种表示方法，在视觉和语义上都是等价，但是JavaScript不能识别。
 */
// console.log('\u01D1' === '\u004F\u030C') //false
// console.log('\u01D1'.length) // 1
// console.log('\u004F\u030C'.length) // 2
// 上面代码表示，JavaScript将合成字符视为两个字符，导致两种表示方法不相等。
// ES6提供字符串实例normalize() 方法，用来将字符的不同表示方法统一为同样的形式，这成为Unicode正规化。
// console.log('\u01D1'.normalize() === '\u004F\u030C'.normalize()) // true

// normalize 方法可以接受一个参数来制定normalize的方式，参数的四个可选值如下、
/* 
    - NFC, 默认参数，表示“标准等价合成”（Normalization Form Canonical Composition）, 返回多个简单字符的合成字符。 所谓“标准等价”指的是视觉和语义上的等价。
    - NFD， 表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
    - NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition）, 返回合成字符。所谓“兼容等价” 指的是语义上存在等价，但是视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文）
    - NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition）, 即在兼容等价的前提下，返回合成字符分解的多个简单字符
**/
// console.log('\u004F\u030C'.normalize('NFC').length)// 1
// console.log('\u004F\u030C'.normalize('NFD').length)// 2

// 上面代码表示，NFC参数返回字符的合成形式，NFD参数返回的分解形式。
// 不过，normalize方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过Unicode编码区间判断

/** 实例方法：includes(), startsWith(), endsWith()
 * 
 *    传统上，JavaScript 只有IndexOf方法，可以用来确定一个字符串是否包含在另一个字符串。ES6又提供了三种新方法
 *    - inclueds()： 返回布尔值，表示是否找到了参数字符串
 *    - startsWith(): 返回布尔值，表示参数字符串是否在原字符串的头部
 *    - endsWith(): 返回布尔值，表示参数字符串是否在原字符串的尾部。
 */
// let s = 'Hello World!';
// console.log(s.startsWith('Hello')) // true
// console.log(s.endsWith('d!')) // true
// console.log(s.includes('o')) // true

// 这三个方法都支持第二个参数，表示开始搜索的位置。
// console.log(s.startsWith('World', 6)) // true
// console.log(s.endsWith('Hello', 5)) // true
// console.log(s.includes('Hello', 6)) // false
// 上面代码表示，使用第二个参数n时，endsWidth 的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n 个位置知道直到字符串结束

/** 实例方法： repeat()
 *    repeat 方法返回一个新字符串，表示将原字符串重复n次
 */
// console.log('x'.repeat(3))
// console.log('hello'.repeat(2))
// console.log('na'.repeat(0))

// 参数如果是小数，会被取整
// console.log('na'.repeat(2.9)) // "nana"

// 如果repeat 的参数是负数或者Infinity，会报错
// console.log('na'.repeat(Infinity)) //string-new-method.js:151 Uncaught RangeError: Invalid count value

// console.log('na'.repeat(-1)) // string-new-method.js:153 Uncaught RangeError: Invalid count value

// 但是，如果参数是0 到 -1 之间的小数，则等同于-，这是因为会先进行取整运算。0 到 -1 之间的小数，取整以后等于-0，repeat视同为0。
console.log('na'.repeat(-0.9))// ""



