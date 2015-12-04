/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};


exports.bangladesh = function (req, res) {
    var dataSet = [
        {
            "name": "Rangpur",
            "value": 0
        },
        {
            "name": "Dhaka",
            "value": 1
        },
        {
            "name": "Sylhet",
            "value": 2
        },
        {
            "name": "Khulna",
            "value": 3
        },
        {
            "name": "Barisal",
            "value": 4
        },
        {
            "name": "Chittagong",
            "value": 5
        },
        {
            "name": "Rajshahi",
            "value": 6
        }
    ];
    res.json({
        data: dataSet
    });
};