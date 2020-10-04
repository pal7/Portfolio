const Portfolio = function() {
	function makeWords() {
		var words = [
			{
				text: "Automation",
				weight: 12.3
			}, {
				text: "Teacher",
				weight: 14
			}, {
				text: "JavaScript",
				weight: 14
			}, {
				text: "Full Stack",
				weight: 10
			}, {
				text: "Firebase",
				weight: 9
			}, {
				text: "Python",
				weight: 11
			}, {
				text: "Industrial Robotics",
				weight: 9
			}, {
				text: "PLC",
				weight: 12
			}, {
				text: "Control Systems",
				weight: 10
			}
		];
		return words;
	}

	function makeWordCloud(words) {
		$('.teaching-domains').jQCloud(words, {delay: 180});
	}

	function displayWordCloud() {
		var count = 1;
		$(window).on('scroll', function() {
			var y_scroll_pos = window.pageYOffset;
			var scroll_pos_test = 2700; // set to whatever you want it to be
			var words = makeWords();
			if (y_scroll_pos > scroll_pos_test && count <= 1) {
				makeWordCloud(words);
				count++;
			}
		});
	}

	function designForm() {
		$("#my-modal form").addClass("my-form");
	}

	function typeAnimation() {
		Typed.new("#writing-text", {
			strings: [
				"am a Mechatronics Engineer.", "love everything about automation", "like installing, troubleshooting and fixing industrial machines.", "am also a web developer.", "am passionate about coding.", "solve problems efficiently."
			],
			// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
			stringsElement: null,
			// typing speed
			typeSpeed: 1,
			contentType: 'text',
			callback: function() {
				$("#writing-text").css({"color": "#fff", "background-color": "#C8412B"});
			},
			preStringTyped: function() {},
			onStringTyped: function() {}
		});
	}

	return {
		displayWordCloud: displayWordCloud,
		typeAnimation: typeAnimation
	}

}();


Portfolio.displayWordCloud();
Portfolio.typeAnimation();
