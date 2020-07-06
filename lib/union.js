// Calculate the union between two lists:
function union(a, b) {
  return a.concat(b.filter(function (item) {
    return a.indexOf(item) < 0;
  }));
}
module.exports = union;
