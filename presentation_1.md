# EventStreams

<button>Click Me</button>

    var numbers = Bacon.sequentially(1000, [1,2,3,4,5,6,7,8,9,10])
    var clicks = $('button').asEventStream('click')

<span data-stream='numbers' data-title='EventStream - Numbers' class='stream'></span>
<span data-stream='click' data-title='EventStream - Clicks' class='stream'></span>



!

<span data-property='property' data-title='Property' class='property'></span>

!





<input id='search'>

    var search = $('#search').asEventStream('keyup')
    var property = search.toProperty(0)

<span data-stream='search' data-title='Stream' class='stream'></span>

!

# FRP and Bacon.js
@philip_roberts

!

# Imperative JS
    var list     = [1,2,3,4]
      , new_list = []
      , new_el

    for (var i=0; i<list.length; i++) {
      new_el = list[i]**2
      new_list.push( new_el )
    }

!

# Imperative JS
    var list     = [1,2,3,4]
      , new_list = []
      , new_el

    for (var i=0; i<list.length; i++) { //<-- how
      new_el = list[i]**2               //<-- what
      new_list.push( new_el )           //<-- how
    }

!

# Functional JS
    var list = [1,2,3,4]
    
    var new_list = list.map(function(el) {
      return el**2
    })

!

# Functional JS

    var list = [1,2,3,4]

    function squareNum(n) {
      return n**2;
    };

    new_list = list.map( squareNum )

!

# Functional JS

    list.map( squareNum );     //<-- what

!

# Functional JS

    list.map( squareNum );     //<-- what
    list.filter( isOdd );      //<-- what

!

# Functional JS

    list.map( squareNum );     //<-- what
    list.filter( isOdd );      //<-- what
    list.filter( not(isOdd) ); //<-- what

!

# Where did the _how_ go?

## Who cares!

!

# Imperative -> Declarative 
##  (how -> what)

!

# Callbacks
## Run me, maybe?

    $('button').click(function() {
      # if and when the user clicks the button
      # no matter what you are doing otherwise
      # run this function
    });

!

# Callbacks
* User interfaces are not linear
* Real time applications are not linear
* Our code does not run top to bottom any more 

!

# Callbacks
* not are not applications linear
* time are linear Real
* interfaces code User not does run bottom any more Our

!

# Why are callbacks so hellish?

* State management
* Imperative code, written in a run me, maybe? style

!

<div style='font-size: 20px; border: 1px gray solid; padding: 10px; margin-bottom: 40px'>
Signup for my app:
<input placeholder='username' value="phil"/>
<span style='color: forestgreen'>✔ available</span>
</div>

    $('.username').keyup(function() {
      name = $('.username').val()

      $.post('/check_username', { name: name }, function(data) {
        if (data.available) {
          #...
        }
      });
    })

!

# Why are callbacks so hellish?

* Nested
* What and how are jumbled up again
* State management
* Not composable

!

# FRP

* Let's make asynchronicty a first class citizen
* a = b + c
* from assignment to equality

!

# Bacon.js

* Let's not think about callbacks
* Let's think about events
* Let's think about eventstreams
* Let's think about properties

!

# Bacon.js

* A little toolkit for creating and working with event streams

!

# Managing Event Streams

* map
* filter

!

# Combining event streams

* merge
* combine

!

# Getting crazy

* flatMap
* flatMapLatest
* combineTemplate

!

