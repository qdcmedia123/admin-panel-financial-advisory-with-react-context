// Data should be presented like this
/*
 = 'low'
['low', 'medium'] = 'low'
['low', 'high'] = 'high'
['medium', 'low'] = 'low'
['medium', 'medium'] = 'medium'
['medium', 'high'] = 'high'
['high', 'low'] = 'medium'
['high', 'medium'] = 'high'
['high', 'high'] = 'high'
*/
const dataStructure = {
  low: ["low", "low"],
  high: ["low", "high"],
  low1: ["medium", "low"],
  medium: ["medium", "medium"],
  high: ["medium", "high"],
  medium1: ["high", "low"],
  high1: ["high", "medium"],
  high2: ["high", "high"],
};

// Check probability
function checkProb(s1, s2, datastructure) {
  // Set them in array
  if (typeof s1 !== "string" || typeof s2 !== "string") return false;

  // Third argument must be datastructure
  if (typeof arguments[2] !== "object") return false;

  // Check the object
  if (Object.keys(dataStructure).length < 0) {
    return false;
  }

  // Input data compose to array
  const input = JSON.stringify([s1, s2]);

  // Loop each object
  for (var key in dataStructure) {
    // Lets forgate key but
    if (input === JSON.stringify(dataStructure[key])) break;
  }

  return key;
}

function threeStepsCalculation(datastructure) {
  // Finding a+b+c
  const aResult = checkProb("low", "high", dataStructure);

  // B result
  const bResult = checkProb("high", "low", datastructure);

  // A pluse b
  const aPlusB = checkProb(aResult, bResult, datastructure);

  // Check
  const aPlusbPlusC = checkProb(aPlusB, "high", datastructure);

  // a+b+c
  //const aPlusbPlusC = checkProb(aPlusb, c, datastructure);

  //return aPlusbPlusC;
  return aPlusbPlusC !== false ? aPlusbPlusC.replace(/[^A-Za-z]$/, "") : false;
}
// Again you we need different three steops
// In this three st
console.log(threeStepsCalculation(dataStructure));
