/* Carrd Core JS | carrd.co | License: MIT */

var	on = addEventListener,
	$ = function(q) { return document.querySelector(q) },
	$$ = function(q) { return document.querySelectorAll(q) },
	$body = document.body,
	$inner = $('.inner');

// Animation.
	on('load', function() {
		setTimeout(function() {
			$body.className = $body.className.replace(/\bis-loading\b/, 'is-playing');

			setTimeout(function() {
				$body.className = $body.className.replace(/\bis-playing\b/, 'is-ready');
			}, 2000);
		}, 100);
	});

// Browser-specific hacks.

	// Init.
		var style, sheet, rule;

		// Create <style> element.
			style = document.createElement('style');
			style.appendChild(document.createTextNode(''));
			document.head.appendChild(style);

		// Get sheet.
			sheet = style.sheet;

	// Android.
		if (navigator.userAgent.match(/Android ([0-9\.]+)/)) {

			// Prevent background "jump" when address bar shrinks.
			// Specifically, this fix forces the background pseudoelement to a fixed height based on the physical
			// screen size instead of relying on "vh" (which is subject to change when the scrollbar shrinks/grows).
				(function() {

					// Insert and get rule.
						sheet.insertRule('body::after { }', 0);
						rule = sheet.cssRules[0];

					// Event.
						var f = function() {
							rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
						};

						on('load', f);
						on('orientationchange', f);
						on('touchmove', f);

				})();

		}

	// iOS.
		else if (navigator.userAgent.match(/([0-9_]+) like Mac OS X/) || navigator.userAgent.match(/CPU like Mac OS X/)) {

			// Prevent white bar below background when address bar shrinks.
			// For some reason, simply forcing GPU-acceleration on the background pseudoelement fixes this.
				(function() {

					// Insert and get rule.
						sheet.insertRule('body::after { }', 0);
						rule = sheet.cssRules[0];

					// Set rule.
						rule.style.cssText = '-webkit-transform: scale(1.0)';

				})();

		}

	// IE.
		else if (navigator.userAgent.match(/(MSIE|rv:11\.0)/)) {

			// Flexbox workaround.
			// IE's flexbox implementation doesn't work when 'min-height' is used, so we can work around this
			// by switching to 'height' but simulating the behavior of 'min-height' via JS.
				(function() {
					var t, f;

					// Handler function.
						f = function() {

							var x = $('#wrapper');

							x.style.height = 'auto';

							if (x.scrollHeight <= innerHeight)
								x.style.height = '100vh';

						};

					// Do an initial call of the handler.
						(f)();

					// Then bind it to resize.
						on('resize', function() {

							clearTimeout(t);

							t = setTimeout(f, 250);

						});

				})();

		}



		//Notification Code::

function onStart() {
		if (!Notification) {
    alert('Desktop notifications are not available in your browser. Try Chrome.'); 
    return;
  }

  if (Notification.permission !== "granted") 
    Notification.requestPermission();
  else {
    var notification = new Notification('Test', {
      icon: 'image01.png',
      body: "This is a desktop notification",
    });

    notification.onclick = function() {
    	window.open('./memezone.html');
    };

	}
}
