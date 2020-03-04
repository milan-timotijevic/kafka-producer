const kafka = require("kafka-node"),
	Producer = kafka.Producer,
	client = new kafka.KafkaClient(),
	producer = new Producer(client);

function getRandomSec() {
	return Math.floor(Math.random() * 5) || 1;
}

function sendTrack(producer) {
	const d1 = new Date();
	const d2 = new Date(d1);
	d2.setSeconds(d2.getSeconds() + getRandomSec());

	const d3 = new Date(d1);
	d3.setSeconds(d3.getSeconds() + getRandomSec());

	const d4 = new Date(d1);
	d4.setSeconds(d4.getSeconds() + getRandomSec());

	const tracks = [
		{
			timestamp: d1.getTime(),
			object_id: 'Arthas',
			age_error: 10,
			age_value: 35,
			gender_label: 'M',
			gender_score: 100,
			positions: [
				{
					timestamp: d1.getTime(),
					x: 1,
					y: 2
				},
				{
					timestamp: d2.getTime(),
					x: 3,
					y: 4
				}
			]
		},
		{
			timestamp: d1.getTime(),
			object_id: 'Jaina',
			age_error: 10,
			age_value: 32,
			gender_label: 'F',
			gender_score: 100,
			positions: [
				{
					timestamp: d1.getTime(),
					x: 10,
					y: 11
				},
				{
					timestamp: d2.getTime(),
					x: 12,
					y: 13
				}
			]
		},
		{
			timestamp: d1.getTime(),
			object_id: "Kael'Thas",
			age_error: 10,
			age_value: 31,
			gender_label: 'M',
			gender_score: 100,
			positions: [
				{
					timestamp: d1.getTime(),
					x: 20,
					y: 21
				},
				{
					timestamp: d2.getTime(),
					x: 22,
					y: 23
				}
			]
		},

	];

	tracks.forEach(track => {
		producer.send([{ topic: 'cv_service.topics.cv_namespace.Track', messages: JSON.stringify(track)}], (err, data) => {
			if (err) {
				console.log(err);
			} else {
				console.log(data);
			}
		});
	});
}

producer.on('ready', () => {
	console.log('Producer ready');

	setInterval(function() {
		sendTrack(producer);
	}, 5000);
});

producer.on("error", function(err) {
	console.log(err);
});
