'use strict';

/**
 * Simple snippet that automatically follows anyone on the page that you are not following
 * Uses a random timeout to prevent blacklist by Twitter
 * 
 * NOTE: logging does not working since Twitter's javascript has reassigned window.console.log to an empty anonymous function
 */
(function() {

    var $document = $(document),
        $feedContainer = $('#timeline'),
        $notFollowing,

        randomIntFromInterval = function(min, max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        },

        continueFollowing = function () {

            var randomTimeout = randomIntFromInterval(200, 5000),
                $nextToFollow;

            // window.console.log('Next pass in ' + randomTimeout + ' milliseconds...');
            setTimeout(function () {

                // refresh our to-follow list
                $notFollowing = $feedContainer.find('.not-following');

                // check if we have anyone left to follow
                if(!$notFollowing.length) {
                    // window.console.log('Not following list exhausted; triggering scroll to populate list.');
                    $document.scrollTop($document.height());
                    return;
                }

                $nextToFollow = $notFollowing.eq(0);
                // window.console.log('About to follow: ' + $nextToFollow.attr('data-name'));
                $nextToFollow.find('button.user-actions-follow-button').click();

                // loop
                continueFollowing();

            }, randomTimeout);
        };

    continueFollowing();
})();
