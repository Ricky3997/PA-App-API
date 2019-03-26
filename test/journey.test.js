const menteeService = require("../service/mentees");

test('Journey generated for Oxford', () => {
  expect(menteeService.generateJourney({
    firstName: 'Riccardo',
    unisApplyingFor : ['Oxford']
  })).toHaveLength(6)
});

test('Journey generated for Warwick', () => {
  expect(menteeService.generateJourney({
    firstName: 'Riccardo',
    unisApplyingFor : ['Warwick']
  })).toHaveLength(5)
});