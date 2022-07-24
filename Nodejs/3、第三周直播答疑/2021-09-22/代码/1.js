async function foo() {
    const b = await cool()
    console.log(b)
    console.log(2)
}
async function cool() {
    return new Promise((resolve,reject) => { resolve(1) })
}
console.log(333)
