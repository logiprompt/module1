'use strict';

describe('Cms E2E Tests:', function () {
  describe('Test Cms page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/cms');
      expect(element.all(by.repeater('cm in cms')).count()).toEqual(0);
    });
  });
});
