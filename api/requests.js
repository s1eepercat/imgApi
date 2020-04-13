const search = (id) => itemArr.find(object => object.id === Number(id));

module.exports = {
    search: search,
}
