var kafka = require("kafka-node"),
	Producer = kafka.Producer,
	client = new kafka.KafkaClient(),
	producer = new Producer(client);

let count = 0;

// producer.on("ready", function() {
// 	console.log("ready");
// 	setInterval(function() {
// 		payloads = [
// 			{ topic: "cat", messages: `I have ${count} cats`, partition: 0 }
// 		];
//
// 		producer.send(payloads, function(err, data) {
// 			console.log(data);
// 			count += 1;
// 		});
// 	}, 5000);
// });
producer.on('ready', () => {
	console.log('Producer ready');
	const obj = {
		"timestamp": 1582901306142,
		"object_id": "some_id",
		"age_error": 10,
		"age_value": 25,
		"gender_label": "M",
		"gender_score": 90,
		"positions": [
			{
				"timestamp": 1582901306157,
				"x": 256.23,
				"y": 247.31
			}

		]
	};
	producer.send([{ topic: 'track', messages: JSON.stringify(obj)}], (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
});

producer.on("error", function(err) {
	console.log(err);
});
