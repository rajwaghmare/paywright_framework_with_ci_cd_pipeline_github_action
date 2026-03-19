
const person = {
    name: "Alice",
    age: 30,
    city: "New York",

    greet: function() {
        console.log(`Hello, my name is ${this.name},
             I'm ${this.age} years old and 
             I live in ${this.city}.`);
    }
}
person.greet();