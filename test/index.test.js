'use strict';

const bulmaSteps = require('../src/js/index').default;

describe('bulmaSteps', () => {
  test('Should throw exception if instanciate with no/wrong selector', () => {
    expect(() => {
      new bulmaSteps();
    }).toThrow('An invalid selector or non-DOM node has been provided.');
  });

  test('Should return an array', () => {
    var instances = bulmaSteps.attach('.selector');
    expect(Array.isArray(instances)).toBe(true);
  });

  test('Should return an array of bulmaSteps instances', () => {
    var instances = bulmaSteps.attach();
    instances.every(i => expect(i).toBeInstanceOf(bulmaSteps));
  });

  test('Should return an array of bulmaSteps instances with options', () => {
    var instances = bulmaSteps.attach('[type="date"]', {
      minDate: '2018-01-01',
      maxDate: '2018-12-31',
      dateFormat: 'yyyy-mm-dd',
    });
    instances.every(i => expect(i).toBeInstanceOf(bulmaSteps));
  });
});
