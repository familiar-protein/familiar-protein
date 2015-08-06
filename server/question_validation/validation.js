var validate = function(regexString, iFlag, truthy, falsy) {
  var regex = new RegExp(regexString, iFlag);

  var error = function(value, expected) {
    return 'Expected ' + value + ' to be ' + String(expected) + ' instead of ' + String(!expected) + '!';
  };

  for (var i = 0; i < truthy.length; i++) {
    if (regex.test(truthy[i]) === false) {
      return error(truthy[i], true);
    }
  }

  for (var i = 0; i < falsy.length; i++) {
    if (regex.test(falsy[i]) === true) {
      return error(falsy[i], false);
    }
  }

  return "Success! All test cases passed!"
}

module.exports = validate;

// var truthy = ['Apple', 'Jan', 'hamburger', 'David', 'Sophia', 'example'];

// var falsy = ['Aaron', 'Tim', 'Ingi', 'Canvas', 'PC', 'hackreactor'];

// var regexString = '^[^a]*[a]{1}[^a]*$';


// debug(validate(regexString, truthy, falsy, 'i'));