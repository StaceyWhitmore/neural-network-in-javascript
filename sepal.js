//First, set up variables and require libraries
var brain =require('brain')//import
var fs = require('fs')

//config for brain
const config = {
binaryThreshold: 0.5, //set to an arbitrary float value
hiddenLayers: [3],    //size of the hiddenLayers in the network
activation: 'sigmoid'//the activation f(x)
}

//make an array to hold the formatting data (after formatting)
let data = []

//initialize a new back propagating network
const net = new brain.neuralNetwork(config)

/*READ the training Data*/
let file = fs.readFileSync("iris.csv")

for (let i =0; i< file.length; i++) {
  let entry = file[i]
  let values = entry.split(",")// split using "," as delimiter
  let points = [parseFloat(values[0]),parseFloat(values[1]), parseFloat(values[2]),parseFloat(values[3]) ]

 //i determines the class
if (i < 49) {
  data.push({input: points, output: {setosa: 1}})
} else if (i > 49 && i < 99){
data.push({input: points, output:{versicolor: 1}})
} else if(i > 99 && i < 149) {
  data.push({input: points, output:{virginica: 1}})
}

}//close for
console.log(data)

//Train network and give it a sample

net.train(data, {log: true})

//test the data (virginica)
//var output = net.run([6,3,5,2]) //ints
let output = net.run([6.2, 3.4, 5.1, 2.6])//float values are seem to be faster as they allow for more accuracy.

console.log(output)
