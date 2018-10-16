'use strict';

describe('Newsletters E2E Tests:', function () {
  describe('Test Newsletters page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/newsletters');
      expect(element.all(by.repeater('newsletter in newsletters')).count()).toEqual(0);
    });
  });
});
