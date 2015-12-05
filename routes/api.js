/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Radu'
  });
};


exports.bangladesh = function (req, res) {
    var dataSet = [
        {
            "name": "Rangpur",
            "value": 162
        },
        {
            "name": "Dhaka",
            "value": 590
        },
        {
            "name": "Sylhet",
            "value": 489
        },
        {
            "name": "Khulna",
            "value": 390
        },
        {
            "name": "Barisal",
            "value": 290
        },
        {
            "name": "Chittagong",
            "value": 345
        },
        {
            "name": "Rajshahi",
            "value": 789
        }
    ];
    res.json({
        data: dataSet
    });
};

exports.sudan = function (req, res) {
    var dataSet = [
        {
            "hc-key": "sd-rs",
            "value": 956
        },
        {
            "hc-key": "sd-711",
            "value": 396
        },
        {
            "hc-key": "sd-7281",
            "value": 567
        },
        {
            "hc-key": "sd-wd",
            "value": 345
        },
        {
            "hc-key": "sd-kh",
            "value": 985
        },
        {
            "hc-key": "sd-gz",
            "value": 456
        },
        {
            "hc-key": "sd-gd",
            "value": 678
        },
        {
            "hc-key": "sd-rn",
            "value": 345
        },
        {
            "hc-key": "sd-no",
            "value": 893
        },
        {
            "hc-key": "sd-kn",
            "value": 678
        },
        {
            "hc-key": "sd-wn",
            "value": 567
        },
        {
            "hc-key": "sd-si",
            "value": 478
        },
        {
            "hc-key": "sd-nd",
            "value": 690
        },
        {
            "hc-key": "sd-ks",
            "value": 790
        },
        {
            "hc-key": "sd-sd",
            "value": 456
        },
        {
            "hc-key": "sd-ka",
            "value": 392
        },
        {
            "hc-key": "sd-bn",
            "value": 590
        }
    ];
    res.json({
        data: dataSet
    });
};