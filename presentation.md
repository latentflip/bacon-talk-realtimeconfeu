# Functional Reactive Programming and Bacon.js
### @philip_roberts

!

# Making life a lot easier by making it a little more complicated first
### @philip_roberts

!

<ul class='implies'>
  <li>Realtime Code
</ul>

!

<ul class='implies'>
  <li>Realtime Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;Asynchronous Code
</ul>

!

<ul class='implies'>
  <li>Realtime Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;Asynchronous Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Callbacks
</ul>

!

<ul class='implies'>
  <li>Realtime Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;Asynchronous Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Callbacks <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Callback Hell
</ul>

!

<ul class='implies'>
  <li>Realtime Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;Asynchronous Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Callbacks <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Callback Hell <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:'(
</ul>

!

<ul class='implies'>
  <li>Realtime Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;Asynchronous Code <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Callbacks <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Callback Hell <span>implies ⇒</span>
  <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:'(
  <li class=close>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})
  <li class=close>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})
  <li class=close>&nbsp;&nbsp;&nbsp;&nbsp;})
  <li class=close>})
</ul>

!

# Control Flow Inversion

It's all gone inside out.

!

<style>
  .bg { 
    background-image: url(/pics/blackhole.jpg);
    opacity: 1;
  }
</style>

!

# Let's dive in


!

# Adding Numbers

<style> button { font-size: 20px; } </style>
<div> <button id='minusOne'>-1</button> &nbsp; score: <span id='score'>0</span> &nbsp; <button id='plusOne'>+1</button> </div>


    var total = 0
    
    $('#plusOne').click(function() {
      total = total + 1
      $('#score').text(total)
    })

    $('#minusOne').click(function() {
      total = total - 1
      $('#score').text(total)
    })


!

# A different way?

!

# A different way?

    var events = [-1, +1, -1, +1, +1, +1 ]; //...

!

# A different way?

    var events = [-1, +1, -1, +1, +1, +1 ]; //...

    var total = events.reduce(function(sum, n) {
                         return sum + n;
                       }) //=> +2

!

# A different way?

    var events = [-1, +1, -1, +1, +1, +1 ]; //...

    var total = events.reduce(function(sum, n) {
                         return sum + n;
                       }) //=> +2
    
    $('#score').text(total); 
      //=> <span id='score'>2</span>

!

# A different way?

    var events = [-1, +1, -1, +1, +1, +1, -1 ]; //...

    var total = events.reduce(function(sum, n) {
                         return sum + n;
                       }) //=> +1
    
    $('#score').text(total); 
      //=> <span id='score'>1</span>

!

# A different way?

    var events = [-1, +1, -1, +1, +1, +1, -1, +1]; //...

    var total = events.reduce(function(sum, n) {
                         return sum + n;
                       }) //=> +2
    
    $('#score').text(total); 
      //=> <span id='score'>2</span>

!

# A different way?

    var events = [-1, +1, -1, +1, +1, +1, -1, +1, +1]; //...

    var total = events.reduce(function(sum, n) {
                         return sum + n;
                       }) //=> +3
    
    $('#score').text(total); 
      //=> <span id='score'>3</span>

!

# It's like, what if:

    a = b + c

meant a _always equals_ b plus c, at any time


!

# EventStreams

<style> button { font-size: 20px; } </style>
<div> <button id='minusOne'>-1</button></div>

    var minusOnes = $('#minusOne').asEventStream('click')

    minusOnes.onValue(function(value) {
      console.log(value)
    })

!

# EventStreams

<style> button { font-size: 20px; } </style>
<div> <button id='minusOne'>-1</button></div>

    minusOnes = $('#minusOne').asEventStream('click')

<div data-stream='minusOnes' data-title='minusOnes' class='stream'></div>

!

# EventStreams

<style> button { font-size: 20px; } </style>
<div> <button id='minusOne'>-1</button></div>

    minusOnes = $('#minusOne').asEventStream('click')
                               .map(function(value) {
                                 return -1
                               })

<div data-stream='minusOnes' data-title='Minus Ones' class='stream'></div>

!

# EventStreams

<style> button { font-size: 20px; } </style>
<div> <button id='minusOne'>-1</button> &nbsp; score: <span id='score'>0</span> &nbsp; <button id='plusOne'>+1</button> </div>

    minusOnes = $('#minusOne').asEventStream('click').map(-1)
    plusOnes = $('#plusOne').asEventStream('click').map(+1)

<div data-stream='minusOnes' data-title='Minus Ones' class='stream'></div>
<div data-stream='plusOnes' data-title='Plus Ones' class='stream'></div>

!

# EventStreams

<style> button { font-size: 20px; } </style>
<div> <button id='minusOne'>-1</button> &nbsp; score: <span id='score'>0</span> &nbsp; <button id='plusOne'>+1</button> </div>

    var minusOnes = $('#minusOne').asEventStream('click').map(-1)
    var plusOnes = $('#plusOne').asEventStream('click').map(1)
    
    var scores = minusOnes.merge(plusOnes)

<div data-stream='minusOnes' data-title='Minus Ones' class='stream'></div>
<div data-stream='plusOnes' data-title='Plus Ones' class='stream'></div>
<div data-stream='scores' data-title='Scores' class='stream'></div>

!

# EventStreams

<style> button { font-size: 20px; } </style>
<div> <button id='minusOne'>-1</button> &nbsp; score: <span id='score'>0</span> &nbsp; <button id='plusOne'>+1</button> </div>

    var minusOnes = $('#minusOne').asEventStream('click').map(-1)
    var plusOnes  = $('#plusOne').asEventStream('click').map(1)

    var merged = minusOnes.merge(plusOnes)
    var score  = merged.scan(0, function(sum, value) {
                         return sum + value
                       })

<div data-stream='merged' data-title='Merged' class='stream'></div>
<div data-stream='score' data-title='Scanned' class='stream'></div>

!

# EventStreams

<style> button { font-size: 20px; } </style>
<div> <button id='minusOne'>-1</button> &nbsp; score: <span id='score'>0</span> &nbsp; <button id='plusOne'>+1</button> </div>

    var minusOnes = $('#minusOne').asEventStream('click').map(-1)
    var plusOnes = $('#plusOne').asEventStream('click').map(1)
    
    var score = minusOnes.merge(plusOnes)
                          .scan(0, function(sum, value) {
                            return sum + value
                          })

    score.assign($('#score'), 'text');

!

# Properties

!

# Yuck

<style> input { width: 100px; } </style>
<input id='a' value='0'/> + <input id='b' value='0'/> = <input id='answer' readonly tabindex=-1/>

    var a=0, b=0;
  
    $('#a').keyup(function(ev) {
      a = parseInt( $(ev.currentTarget).val() )
      $('#answer').val(a + b)
    });
  
    $('#b').keyup(function(ev) {
      b = parseInt( $(ev.currentTarget).val() )
      $('#answer').val(a + b)
    });




!

# Yay! Math! :D

<style> input { width: 100px; } </style>
<input id='a' value='0'/> + <input id='b' value='0'/> = <input id='answer' readonly tabindex=-1/>

    var a = $('#a').asEventStream('keyup')

<div data-stream='a' data-title='A' class='stream'></div>

!

# Yay! Math! :D

<style> input { width: 100px; } </style>
<input id='a' value='0'/> + <input id='b' value='0'/> = <input id='answer' readonly tabindex=-1/>

    function inputVal(ev) {
      return $(ev.currentTarget).val()
    }

    var a = $('#a').asEventStream('keyup')
                      .map(inputVal)

<div data-stream='a' data-title='A' class='stream'></div>

!

<style> input { width: 100px; } </style>
<input id='a' value='0'/> + <input id='b' value='0'/> = <input id='answer' readonly tabindex=-1/>

    function inputVal(ev) {
      return $(ev.currentTarget).val()
    }
    function isNumber(n) {
      return n > 0
    }

    var a = $('#a').asEventStream('keyup')
                      .map(inputVal)
                      .map(parseInt)
                      .filter(isNumber)
                      .debounce(300)

<div data-stream='a' data-title='A' class='stream'></div>

!

<style> input { width: 100px; } </style>
<input id='a' value='0'/> + <input id='b' value='0'/> = <input id='answer' readonly tabindex=-1/>

    function inputVal(ev) { return $(ev.currentTarget).val() }
    function isNumber(n) { return n > 0 }

    var a = $('#a').asEventStream('keyup')
                      .map(inputVal).map(parseInt).filter(isNumber)

    var b = $('#b').asEventStream('keyup')
                      .map(inputVal).map(parseInt).filter(isNumber)
    
<div data-stream='a' data-title='A' class='stream'></div>
<div data-stream='b' data-title='B' class='stream'></div>

!

<style> input { width: 100px; } </style>
<input id='a' value='0'/> + <input id='b' value='0'/> = <input id='answer' readonly tabindex=-1/>

    var a = $('#a').asEventStream('keyup')
                      .map(inputVal).map(parseInt).filter(isNumber)

    var b = $('#b').asEventStream('keyup')
                      .map(inputVal).map(parseInt).filter(isNumber)
    
    var answer = a.merge(b)

<div data-stream='a' data-title='A' class='stream'></div>
<div data-stream='b' data-title='B' class='stream'></div>
<div data-stream='answer' data-title='Answer: a.merge(b)' class='stream'></div>

!

<style> input { width: 100px; } </style>
<input id='a' value='0'/> + <input id='b' value='0'/> = <input id='answer' readonly tabindex=-1/>

    var a = $('#a').asEventStream('keyup')
                      .map(inputVal).map(parseInt).filter(isNumber)
                      .toProperty(0)

    var b = $('#b').asEventStream('keyup')
                      .map(inputVal).map(parseInt).filter(isNumber)
                      .toProperty(0)
    
    function sum(arg1, arg2) { return arg1 + arg2 }
    var answer = a.combine(b, sum)

<div data-stream='a' data-title='A' class='stream'></div>
<div data-stream='b' data-title='B' class='stream'></div>
<div data-stream='answer' data-title='Answer: a.combine(b, sum)' class='stream'></div>

!

<style> input { width: 100px; } </style>
<input id='a' value='0'/> + <input id='b' value='0'/> = <input id='answer' readonly tabindex=-1/>

    function inputVal(ev) { return $(ev.currentTarget).val() }
    function isNumber(n) { return n > 0 }

    var a = $('#a').asEventStream('keyup')
                      .map(inputVal).map(parseInt).filter(isNumber)
                      .toProperty(0)

    var b = $('#b').asEventStream('keyup')
                      .map(inputVal).map(parseInt).filter(isNumber)
                      .toProperty(0)
    
    function sum(arg1, arg2) { return arg1 + arg2 }
    var answer = a.combine(b, sum)

    answer.assign( $('#answer'), 'val')


!

# FlatMap: Getting Funky

## Ajax

!

# Username availability checking

Username: <input id='username'> <span id=available></span>

<code style='display:none'>
  var username = 
    $('#username')
        .asEventStream('keyup')
        .map(function(ev) { return $(ev.currentTarget).val() })

  username.onValue(function(name) {
    doAjaxCall(name, function(result) {
      $('#available').text(result)
    });
  })
</code>

!

Username: <input id='username'>

    var username =
      $('#username').asEventStream('keyup')
                      .map(inputVal)

<div data-stream='username' data-title='Username' class='stream'></div>
                 
!

Username: <input id='username'> <span id=available></span>

    var username = $('#username')
                      .asEventStream('keyup')
                      .map(function(ev) {
                        return $(ev.currentTarget).val()
                      })

    username.onValue(function(name) {
      doAjaxCall(name, function(result) { 
        $('#available').text(result)
      });
    })

!

Username: <input id='username'> <span id=available></span>

    var username = $('#username')
                      .asEventStream('keyup')
                      .map(function(ev) {
                        return $(ev.currentTarget).val()
                      })

    username.onValue(function(name) {
      doAjaxCall(name, function(result) {  // <-- uh-oh, callback
        $('#available').text(result);
      });
    })

!
  
# But wait, an AJAX request is a stream of one value

      ...make request.......(wait)............result.....
      -------|----------------------------------o--------

!

# Create a stream from an AJAX call

    function ajaxStream(query) {
      return Bacon.fromCallback(function(callback) {
        doAjaxCall(query, callback)
      })
    }

!

# But this won't work
  
    function ajaxStream(query) {
      return Bacon.fromCallback(function(callback) {
        doAjaxCall(query, callback)
      })
    }

    username.map(ajaxStream)

!

# We need... FlatMap!

<ul>
  <li>For every value on an eventstream
  <li>Create a new eventstream
  <li>And merge all the results back into a single eventstream
</ul>

    function ajaxStream(query) {
      return Bacon.fromCallback(function(callback) {
        doAjaxCall(query, callback)
      })
    }

    username.flatMap(ajaxStream)

!

Username: <input id='username'> <span id='available'></span>

    function ajaxStream(query) {
      return Bacon.fromCallback(function(callback) {
        doAjaxCall(query, callback)
      })
    }

    var username = $('#username')
                .asEventStream('keyup').map(inputVal).color()

    var results = username.flatMap(ajaxStream)
    results.assign( $('#available'), 'text')
                     
<div data-stream='username' data-title='Username' class='stream'></div>
<div data-stream='results' data-title='Results' class='stream'></div>

!

Username: <input id='username'> <span id='available'></span>

    function ajaxStream(query) {
      return Bacon.fromCallback(function(callback) {
        doAjaxCall(query, callback)
      })
    }

    var username = $('#username')
                .asEventStream('keyup').map(inputVal).color()

    var results = username.flatMapLatest(ajaxStream)
    results.assign( $('#available'), 'text')
                     
<div data-stream='username' data-title='Username' class='stream'></div>
<div data-stream='results' data-title='Results' class='stream'></div>

!

# Thank You!

Further reading

* __Haskell__ 
* __RxJS:__ https://github.com/Reactive-Extensions/RxJS
* __Bacon.js:__ https://github.com/raimohanska/bacon.js

@philip\_roberts
