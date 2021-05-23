let result = array.reduce((acc, v, i, a) => {
  // return the new value to the result variable 
}, initVal);

// result - the single value that is returned. 
// array - the array to run the reduce function on. 
// acc - the accumulator accumulates all of the returned values. 
// v - the current value being processed
// i - the curret index of the value being processed
// a - the original array
// initVal - an optionally supplied initial value. 
// If the initial value is not supplied,
// the 0th element is used as the initial value.


const new = array.some(( v, i, a) => {
    // return boolean
});

// newArray - the new array that is returned
// array - the array to run the map function on
// v - the current value being processed
// i - the current index of the value being processed
// a - the original array

let new = array.filter((v, i, a) => {
    // return element to new if condition are met 
   // skip element if conditions are not met
   });
 
 // new - the array that is returned
 // array - the array to run the filter function on
 // v - the current value being processes
 // i - the current index of the value being processed
 // a - the original array

 const someArray = [bmw, [lambo, mustang], [car4, car5]]
someArray.flat()
//Output: [bmw, lambo, mustang, car4, car5]