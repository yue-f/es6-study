/** String.fromCodePoint()
 *    ES5 提供了String.sromCharCode()方法，用于从Unicode码点返回对应字符，但是这个方法不能识别码点大于OxFFFF的字符
 */
console.log(String.fromCharCode(0x20BB7)) //ஷ
/*
  上面代码中，String.fromCharCode()不能识别大于0xFFFF的码点，所以0x20BB7就发生了溢出，最高位2被舍弃了，最后返回码点U+0BB7 对应的字符，而不是码点U+20BB7对应的字符。

  ES6 提供了String.formcodePoint()方法，可以识别大于0xFFFF的字符弥补了String.sromCharcode()方法的不足。在作用上正好与下面的codePointAt()相反
**/
console.log(String.fromCodePoint(0x20BB7))
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y')
/*
  上面代码中，如果String.fromCodePonit方法有多个参数，则他们会被合并成一个字符串返回。

  注意：
    formCodepoint 方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上
**/


/** String.raw()
 *    ES6 还为原生的String 对象，提供了一个raw() 方法。
 *    该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法
 */