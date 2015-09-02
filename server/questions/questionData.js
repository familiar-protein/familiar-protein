module.exports = [
  {
    qNumber: 0,
    title: "Capital Words",
    description: "Validate whether a given string starts with a capital letter",
    truthy: ['Home', 'PC', 'Microsoft', 'Hack Reactor', 'London'],
    falsy: ['table', 'computer', 'hello', 'hEllo', '$Hello']
  },
  {
    qNumber: 1,
    title: "Does a Word Contain One 'a'",
    description: "Validate whether the given word contains one and only one letter 'a'.",
    truthy: ['Apple', 'Marcus', 'hamburger', 'example', 'China'],
    falsy: ['Aaron', 'bottle', 'Canvas', 'PC', 'hackreactor']
  },
  {
    qNumber: 2,
    title: "Username Validation",
    description: "Determine whether a given username is valid according to the following restrictions: A username has to be between 6 and 10 characters and can only contain alphanumeric characters and '_'!",
    truthy: ['myname', 'ali_gator', '12345678', 'alpha123', '_USER_'],
    falsy: ['myreallylongname', '@symbol', '@#$%^&*()', 'name', '$myName$']
  },
  {
    qNumber: 3,
    title: "Find Prices",
    description: "Determine whether the given string is a valid price",
    truthy: ['$123', '$0', '$0.50', '$99.99', '$102472349.17'],
    falsy: ['hello', '123', '$0.577', '$123.4.3', '$823.h']
  },
  {
    qNumber: 4,
    title: "Hex Color Code",
    description: "Determine whether a given string is valid Hex color code.",
    truthy: ['#FFF', '#abcabc', '#123', '#4d2', '#83e9db'],
    falsy: ['fff', '123123', '%FFF', '#897f', '#44444444']
  },
  {
    qNumber: 5,
    title: "Valid Number?",
    description: "Match a valid phone number.",
    truthy: ['(123) 321-4444', '444-444-989', '000.123.4321', '(111) 111-1111', '752-491-4234'],
    falsy: ['(2342) 342-444', '4447864673', '(231) 770-000', '111.111.232.1', '888,888,8976']
  },
  {
    qNumber: 6,
    title: "Validate Password",
    description: "Validate a password to have the following criteria:  \n8-16 characters \nmust include: 1 lowercase, 1 uppercase, 1 number \nonly lowercase, uppercase, and numbers are valid",
    truthy: ['Password1234', '111xxxYY', '123456aA', 'fhewoh123EWD', '12345abcdeFGHIJK'],
    falsy: ['#Password1234', '12345aA', 'no$pesialCharacter5', 'paws&*fsB', 'ThisIsTooLongOfAPassword']
  },
  {
    qNumber: 7,
    title: "Test",
    description: "Test",
    truthy: ['a', 'a', 'a'],
    falsy: ['b']
  }
];