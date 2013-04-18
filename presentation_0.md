# FRP and Bacon.js
@philip_roberts

!

# Asynchronous JavaScript

* JavaScript is asynchronous
* This is a good thing, as it helps us build great UIs
* But it can be hard to understand and write

!

    var numbers = $(document).asEventStream('keyup')
                               .map(getCharFromEvent)

span data-stream='numbers' data-title='Numbers' class='stream'></span>

!

    var keys = $(document).asEventStream('keyup')
                             .map(getCharFromEvent)
    
    doublekeys = keys.map(function(key) { 
                       return key + key;
                     })

<span data-stream='keys' data-title='Keys' class='stream'></span>
<span data-stream='doublekeys' data-title='Doubled' class='stream'></span>
    
!

    numbers = $(document).asEventStream('keyup')
                               .map(getCharFromEvent)
                               .map(parseInt)
                               .filter(isANumber)

    smoothed = numbers.slidingWindow(5)
                          .map(function(ns) {
                            var average = ns.reduce(function(sum,n) {
                              return sum + n/ns.length
                            }, 0)
                            return round(3, average)
                          })

<span data-stream='numbers' data-title='Numbers' class='stream'></span>
<span data-stream='smoothed' data-title='Smoothed' class='stream'></span>

!

    numbers1 = $(document).asEventStream('keyup')
                          .map(getCharFromEvent)
                          .map(parseInt)
                          .filter(isANumber)

    doAjaxCall = function(n) { 
      return Bacon.later(n*1000, n*2)
    }
    flatMapped = numbers1.flatMap(doAjaxCall)

    numbers1.log()
    flatMapped.log()

<span data-stream='numbers1' data-title='Numbers' class='stream'></span>
<span data-stream='flatMapped' data-title='FlatMapped' class='stream'></span>

!

    numbers1 = $(document).asEventStream('keyup')
                            .map(getCharFromEvent)
                            .map(parseInt)
                            .filter(isANumber)

    doAjaxCall = function(n) { 
      return Bacon.later(n*1000, n*2)
    }
    flatMapped = numbers1.flatMapLatest(doAjaxCall)

<span data-stream='numbers1' data-title='Numbers' class='stream'></span>
<span data-stream='flatMapped' data-title='FlatMapped' class='stream'></span>


!



# Callbacks

* Say we want to build a live search form

    $('input').keyup(function() {
      var query = $(this).val();
      search(query, function(results) {
        ... do stuff with results
      });
    });

* That's okay but what if we don't want to repeat queries

    var lastQuery = ''

    $('input').keyup(function() {
      var query = $(this).val();
      if (query != lastQuery) {
        lastQuery = query
        search(query, function(results) {
          ... do stuff with results
        });
      }
    });

* What if we want to throttle queries, so we only fire them off every 500ms

   var lastQuery = ''
   var timer

   $('input').keyup(function() {
      var query = $(this).val();
      if (query != lastQuery) {
        lastQuery = query
        clearTimeout(timer)
        timer = setTimeout(function() {
          $.getJSON('/search?q='+query, function(results) {
            ... do stuff with results
          });
        }, 500);
      }
   });

!

## Why does this suck?

* Conceptually all this code does is:
  * When a user types anything, do a search for what they've typed
  * But don't repeat searches
  * And don't search more than every half a second

* But is it obvious?

   var lastQuery = ''
   var timer

   $('input').keyup(function() {
      var query = $(this).val();
      if (query != lastQuery) {
        lastQuery = query
        clearTimeout(timer)
        timer = setTimeout(function() {
          $.getJSON('/search?q='+query, function(results) {
            ... do stuff with results
          });
        }, 500);
      }
   });

* Is it extendable? Err not really

   var lastQuery = ''
   var timer

   $('input').keyup(function() {
      var query = $(this).val();
      if (query.length > 3 && query != lastQuery) {
        lastQuery = query
        clearTimeout(timer)
        timer = setTimeout(function() {
          $.getJSON('/search?q='+query, function(results) {
            ... do stuff with results
          });
        }, 500);
      }
   });

* Is it easy to code?
* Is it error free? Who knows
* Is it easy to reuse?

!

# What's the problem

* We have explicit state management?
* We have control flow
* And we have the logic of what we care about
* All mixed up together
* In other words we have a lot of _how_code, mixed up with a lot of _what_, but really we only care about _what_.

!

# Is there a better way?

!

# What if we could write this?

  $('input').asEventStream('keyup')
              .map(function() { return $('input').val() })
              .skipDuplicates()
              .throttle(500)
              .onValue(function(v) {
                search(query, function() {
                  ...do stuff with results
                })
              })

!

# What if we could extend it like this?

  $('input').asEventStream('keyup')
              .map(function() { return $('input').val() })
              .filter(function(query) { return query.length > 3 })
              .skipDuplicates()
              .throttle(500)
              .onValue(function(v) {
                search(query, function() {
                  ...do stuff with results
                })
              })

!

# Well yay, FRP!

* FRP gives us event streams as a first class _thing_
* Note the same thing as node streams (but similar?)
* Instead of treating events, like keyups, in isolation and handling them with callbacks, we get a stream of values for each keyup. We can then map, filter, throttle, merge, combine... event streams to compose the logic for our applications in a more understandable fashion (dealing with how not what) 

!

# EventStreams

An event stream is a first class thing that represents a sequence of values in time. Each event occurs at a specific time, and has an associated value.

We can create simple event streams using bacon, like:

    var stream = Bacon.repeatedly(500, [1,2,3,4,5])

But more often we would create them from DOM events (with jquery):

    var clicks = $('button').asEventStream('click')

!

# Subscribing

We can subscribe to values on event streams:

    var stream = Bacon.repeatedly(500, [1,2,3,4,5])

    stream.onValue(function(value) {
      $('#output').text(value)
    });

<div id='output'></div>

!

# Composing event streams

This is where it gets good!

!

#We can map event streams

    var raw = $('input').asEventStream('keyup')

    var queries = raw.map(function(event) {
                            return $(event.currentTarget).val()
                          })

!

# We can filter the values on an event stream

    var raw = $('input').asEventStream('keyup')

    var queries = raw.map(function(event) {
                        return $(event.currentTarget).val()
                     })
                     .filter(function(query) {
                        return query.length > 3
                      })
                      
!

# Thinking in bacon: Another example

We wish to place francis bacon's head on our webpage and move it with this slider between the left and right of the screen. We also want it to work if we resize the page

!

  <input id='percent' type='range' min=0 max=100 step=1>
  <img src='bacon.jpg' style='position: absolute; top: 300'>

    var screenWidth, percent, position
    
    screenWidth = $(window).asEventStream('resize')
                           .map(function() {
                             return $(window).width()
                           })
                           .toProperty( $(window).width() )
                    
    percent = $('#percent').asEventStream('change')
                            .map(function(e) {
                              return $(e.currentTarget).val()
                            })
                            .toProperty(50)

    position = screenWidth.combine(percent, function(width, percent) {
                            return width * percent/100
                          })

    position.onValue(function(v) {
               $('img').css({left: v})
            })
!

  <input id='percent' type='range' min=0 max=100 step=1>
  <img src='bacon.jpg' style='position: absolute; top: 300'>

    var screenWidth, percent, position
    var getScreenWidth = function() { return $(window).width() }
    var getInputValue = function(ev) { return $(ev.currentTarget).val() }
    
    screenWidth = $(window).asEventStream('resize')
                             .map(getScreenWidth)
                             .toProperty(getScreenWidth())
                    
    percent = $('#percent').asEventStream('change')
                             .map(getInputValue)
                             .toProperty(50)

    screenWidth.combine(percent, function(width, percent) {
                  return width * percent/100
               })
               .onValue(function(v) {
                 $('img').css({left: v})
               })


