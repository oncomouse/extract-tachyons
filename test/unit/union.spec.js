var { expect } = require('chai');
var union = require('../../lib/union');

describe('union()', () => {
  var testArray1 = [1,2,3,4];
  var testArray2 = [5,6,7,8];
  var testArray3 = [1,5,6,9];
  var testArrayOverlap = [2,4,6,8];
  var results1and2 = [1,2,3,4,5,6,7,8];
  var results2and1 = [5,6,7,8,1,2,3,4];
  var results1andOverlap = [1,2,3,4,6,8];
  var results2andOverlap = [5,6,7,8,2,4];
  var results12and3 = [1,2,3,4,5,6,7,8,9];
  var blankArray = [];
  it('should return [] when passed blank arrays', () => {
    expect(union(blankArray, blankArray)).to.deep.equal(blankArray);
  });
  it('should return test array when passed test array and blank array', () => {
    expect(union(testArray1, blankArray)).to.deep.equal(testArray1);
    expect(union(testArray2, blankArray)).to.deep.equal(testArray2);
  });
  it('should return test concatenation of both arrays when not overlapping', () => {
    expect(union(testArray1, testArray2)).to.deep.equal(results1and2);
    expect(union(testArray2, testArray1)).to.deep.equal(results2and1);
  });
  it('should return overlapping results when arrays overlap', () => {
    expect(union(testArray1, testArrayOverlap)).to.deep.equal(results1andOverlap);
    expect(union(testArray2, testArrayOverlap)).to.deep.equal(results2andOverlap);
  });
  it('should work with Array.reduce()', () => {
    expect([
      testArray1,
      testArray2,
      testArray3,
    ].reduce((acc, cur) => union(acc, cur), [])).to.deep.equal(results12and3);
  });
});
