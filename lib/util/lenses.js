const { lens, prop, assoc } = require('ramda');

exports.dateCreatedLens = lens(prop('date_created'), assoc('date_created'));
exports.dateModifiedLens = lens(prop('date_modified'), assoc('date_modified'));
exports.groceryItems = lens(prop('items'), assoc('items'));
exports.groceryIdLens = lens(prop('grocery'), assoc('grocery'));
