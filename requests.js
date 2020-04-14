"use strict";
var search = function (id) { return itemArr.find(function (object) { return object.id === Number(id); }); };
module.exports = {
    search: search,
};
