# FRP
## Event Streams & Properties

!

# Event Streams

    stream = Bacon.interval(1000, "HI")

<span data-stream='stream' data-title='Event Stream' class='stream'></span>

!

# Event Stream - Observable

    stream = Bacon.interval(1000, "HI!")

    stream.onValue(function(val) {
      console.log(new Date().valueOf(), val)
    })

<span data-stream='stream' data-title='Event Stream' class='stream'></span>

!

# Event Streams - Enumerable

    stream  = Bacon.repeatedly(1000, [1,2,3,4,5])

    doubled = stream.map(function(v) { return v * 2 })


<span data-stream='stream' data-title='Numbers' class='stream'></span>
<span data-stream='doubled' data-title='Doubled' class='stream'></span>

!

# Event Streams - Enumerable

    stream = Bacon.repeatedly(1000, [1,2,3,4,5])

    even   = stream.filter(function(v) { return v%2 == 0 })


<span data-stream='stream' data-title='Numbers' class='stream'></span>
<span data-stream='even' data-title='Even only' class='stream'></span>

!

# Property

    stream = Bacon.repeatedly(1000, [1,2,3,4,5])
    property = stream.toProperty()

<span data-property='property' data-title='Property'></span>

!

# Property

    stream = Bacon.repeatedly(3000, [1,2,3,4,5])
    property = stream.toProperty(0)

    otherStream = Bacon.repeatedly(1000, [2])
    
    combined = property.combine(otherStream, function(a,b) { return a * b })
    combined.log()
    

<div data-property='property' data-title='Property'></div>
<div data-property='combined' data-title='Combined'></div>

!

    var numbers = $(document).asEventStream('keyup')
                               .map(getCharFromEvent)

<span data-stream='numbers' data-title='Numbers' class='stream'></span>

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

