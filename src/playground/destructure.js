const person = {
  name: "vaibhav",
  age: 18,
  location: {
    city: "delhi",
    temp: 20
  }
}

const {name: firstName = "Anonymous", age} = person;
const {city, temp: temperature} = person.location;

console.log(`${firstName} is ${age}.`);
console.log(`It's ${temperature} in ${city}.`);

const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday",
  publisher: {
    name: "Penguin"
  }
}

const {name: publisherName = "Self-published"} = book.publisher;
console.log(publisherName);

const item = ["coffee(hot)", "$2.00", "$2.50", "$2.75"];
const [itemName, , medPrice] = item;
console.log(`A medium ${itemName} costs ${medPrice}`);