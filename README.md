# Feedreader Project

## Running This

Open index.html in chrome.  Specs will be run automatically, there should be
one failure for an addFeed function that has not been defined.

### Additional Tests

#### Existing Features

##### Feed Menu Links

This test makes sure that an entry in the feed menu exists for each item in
the allFeeds array.

#### New Features

##### Add Feed Function Test

This tests an `addFeed` function that has not been implemented which will
allow adding feeds to the allFeeds array.  A potential implementation of that
method is:

    function addFeed(name, url) {
        var newFeed = {name: name, url: url};
        allFeeds.push(newFeed);
    }

This function would have to be called before the menu items are built, since
it doesn't make any attempt to modify the feed menu.  Another menu,
addFeedItemToMenu could be added to create the menu items.