let obj = `{a: 0,b: "dd",c: null,d: undefined,e: () => { console.log(123) },f: [11, 22, 33],g: { ppp: 666 },h: Symbol("hha "),i: false
}`
// new Data
// const x = 2n * 23n;
// console.log(x)
// console.log(JSON.stringify(obj))
// console.log(JSON.parse(JSON.stringify(obj)))
console.log(JSON.parse(obj))