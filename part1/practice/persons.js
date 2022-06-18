class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    greet() {
        console.log('hello, my name is', this.name)
    }
}

const arto = new Person('Arto Hellas', 35)
arto.greet()

const juha = new Person('Juha Tauriainen', 48)
juha.greet()