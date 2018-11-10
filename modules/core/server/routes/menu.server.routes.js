'use strict';

/**
 * Module dependencies
 */

var adminMenu = require('../controllers/menu.server.controller');
//var Genlang = require('../controllers/menu.server.controller');

module.exports = function (app)
{

  app.route('/api/admin-menu/getMenuList').post(adminMenu.getList);
  app.route('/api/language/getGenLang').post(adminMenu.getLang);
  app.route('/api/admin-menu/create').post(adminMenu.create);
  app.route('/api/admin-menu/addSubMenu').post(adminMenu.addSubMenu);
  app.route('/api/admin-menu/updateMenu').put(adminMenu.updateMenu);

  // app.route('/api/menu/:groupId')
  //  .get(menu.getById)
  //  .delete(menu.delete)
  //  .put(menu.updatemenu);

  // app.route('/api/extrafieldgroups').all(req, res)
  //  .get(extrafield.list)
  //  .post(products.create);

  // app.route('/api/products/:productId').all(productsPolicy.isAllowed)
  //  .get(products.read)
  //  .put(products.update)
  //  .delete(products.delete);

  //app.param('menuId', adminMenu.getById);

};
