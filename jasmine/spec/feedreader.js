/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each define non-empty urls', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each define non-empty names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });

        /* Extra test: Tests that a function that has not been implemented
         * adds a new feed to the allFeeds array
         */
        it('should be able to add a feed', function() {
            var beginningLength = allFeeds.length;
            var newFeedName = 'New Feed Name';
            var newFeedUrl = 'http://feeds.feedburner.com/new_feed_name';
            addFeed(newFeedName, newFeedUrl);

            // Make sure another feed was added and the name and url are set
            // correctly.
            expect(allFeeds.length).toEqual(beginningLength + 1);
            var lastFeedItem = allFeeds[allFeeds.length - 1];
            expect(lastFeedItem.name).toEqual(newFeedName);
            expect(lastFeedItem.url).toEqual(newFeedUrl);

            // Remove the feed - don't pollute the state
            allFeeds.pop();
        });
    });

    /* Tests menu visibility and content */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should toggle when the menu icon is clicked', function() {
            // Click should reveal menu
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            // Clicking again should hide the menu
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* Extra Test: Make sure there is a link for each feed item */
        it('should have an entry for each feed', function() {
            var menuFeedNames = $.map($('.feed-list').find('a'), function(link) {
                return link.text;
            });
            var allFeedNames = $.map(allFeeds, function(feed) {
                return feed.name;
            });
            expect(menuFeedNames).toEqual(allFeedNames);
        });
    });

    /* Tests that feed loading works correctly */
    describe('Initial entries', function() {
        /* Load the feed and wait to call done until loading is complete */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should have at least one entry after loading a feed', function() {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    /* Tests that feed selection results in content updates */
    describe('New feed selection', function() {
        /* Load the initial feed and wait to call done until loading is
         * complete.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should cause feed content to change', function(done) {
            var existingContent = $('.feed').find('.entry');
            loadFeed(1, function() {
                var newContent = $('.feed').find('.entry');

                // Verify content exists
                expect(newContent.length).toBeGreaterThan(0);

                // Verify the content has changed
                expect(newContent).not.toEqual(existingContent);

                done();
            });
        });
    });
}());
