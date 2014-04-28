var async = require('async'),
    _ = require('underscore'),
    MinHeap = require('min-heap');

var rangeList = [
                  [3,14,23,27],
                  [1,10,13,21],
                  [4,18,22,31]
                ];

function smallestRange() {
  var heap = new MinHeap(function(l,r) {
    return l.value - r.value;
  });
  var minRange = {};
  var maxValue = rangeList[0][0];

  for(var i=0; i < rangeList.length; i++) {
    var initData = rangeList[i].splice(0, 1)[0];

    if(initData > maxValue) {
      maxValue = initData;
    }

    heap.insert({value: initData, listNum: i});
  }

  var complete = false;
  while(!complete) {
    var headElement = heap.removeHead();
    var testRange = maxValue - headElement.value + 1;

    if(testRange < minRange.range || _.isEmpty(minRange)) {
      minRange.range = testRange;
      minRange.values = [headElement.value, maxValue];
    }

    if(rangeList[headElement.listNum].length > 0) {
      if(rangeList[headElement.listNum][0] > maxValue) {
        maxValue = rangeList[headElement.listNum][0];
      }
      heap.insert({value: rangeList[headElement.listNum].splice(0,1)[0], listNum: headElement.listNum});
    }else{
      console.log(minRange);
      return minRange;
    }
  }
}

smallestRange();