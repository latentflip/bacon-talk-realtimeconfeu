# Callbacks

<input>

    $('input').keyup(function(ev) {
      var value = $(ev.currentTarget).val();
      console.log( value );
    });

<console></console>
    
!

# Add two numbers

<style>
  input { width: 100px; }
</style>
<input id='a' value='0'/> +
<input id='b' value='0'/> =
<input id='c' readonly/>

    var a=0, b=0;
  
    $('#a').keyup(function(ev) {
      a = parseInt( $(ev.currentTarget).val() )
      $('#c').val(a + b)
    });
  
    $('#b').keyup(function(ev) {
      b = parseInt( $(ev.currentTarget).val() )
      $('#c').val(a + b)
    });

!

# Add two numbers

<style>
  input { width: 100px; }
</style>
<input id='a' value='0'/> +
<input id='b' value='0'/> =
<input id='c' readonly/>

    function inputEventToNumber(ev) {
      return parseInt($(ev.currentTarget).val())
    }
    function sum(arg1, arg2) { return arg1 + arg2 }

    a = $('#a').asEventStream('keyup', inputEventToNumber)
                .toProperty(0)

    b = $('#b').asEventStream('keyup', inputEventToNumber)
                .toProperty(0)
    
    c = a.combine(b, sum, 0)
    c.onValue( $('#c'), 'val' )
