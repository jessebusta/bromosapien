var path = require('path');

var bros = require('../data/bros.js');

module.exports = function(app) {
  app.get('/api/bros', function(req, res) {
    res.json(bros);
  });

  app.post('/api/bros', function(req, res) {
    var userInput = req.body;

    var surveyResponses = userInput.scores;

    // Compute best friend match
    var matchName = '';
    var matchImage = '';
    var totalDiffArray = [];

    function populateTotalDiffArray() {

      for (var i = 0; i < bros.length; i++) {
        var diffArray = [];
        var totalDiif = 0;
        for (var j = 0; j < surveyResponses.length; j++) {
          var diff = Math.abs(bros[i].scores[j] - surveyResponses[j]);
          diffArray.push(diff);

          function getTotalDiff(total, num) {
            return total + num;
          }
          var totalDiff = myArray.reduce(getTotalDiff);
          totalDiffArray.push(totalDiff)
        }
      }
    }

    function findYourClosestBro() {
      populateTotalDiffArray();
      var index = 0;
      var value = totalDiffArray[0];
      for (var i = 1; i < totalDiffArray.length; i++) {
        if (totalDiffArray[i] < value) {
          value = totalDiffArray[i];
          index = i;
        }
      }
			var broMatch = bros[index];
			matchName = broMatch.name;
			matchImage = broMatch.photo;
    }

    bros.push(userInput);

    // Send appropriate response
    res.json({
      status: 'OK',
      matchName: matchName,
      matchImage: matchImage
    });
  });
};
