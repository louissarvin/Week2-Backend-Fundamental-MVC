const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = JSON.parse(jsonString);

console.log(jsonObject.name); // Output: John

const person = {
  name: "John",
  age: 30,
  city: "New York"
};

const jsonString2 = JSON.stringify(person);
console.log(jsonString2);
// Output: {"name":"John","age":30,"city":"New York"}

const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  const jsonObject = JSON.parse(data);
  console.log(jsonObject);
});

fs.writeFile('data.json', JSON.stringify(person), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Data has been written to person.json');
});