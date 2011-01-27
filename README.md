Really easy to use benchmarking utility for async code execution in node.js. _Currently_ not a lot handled for you other than executing your code x number of times and providing the time it took to do so.  Used for benchmarks in [node-postgres](https://github.com/brianc/node-postgres).

## Example

    var bencher = require('path/to/bencher/lib/folder');
    var bench = bencher({
      name: 'my benchmark',
      repeat: 100,
      actions:[{
        name: 'first action',
        run: function(next) {
          //do something
          setTimeout(function() {
            //call next when you're done
            next()
          }, 100)
        }
      },{
        name: 'second action',
        run: function(next) {
          //do something...
          //call next when you're done
          next()
        }
      }]
    })
   
    bench(function(result) {
      result.actions.forEach(function(action) {
        console.log(aciton.name);
        action.repeats.forEach(function(repeat) {
          console.log(repeat.start) // -- date object
          console.log(repeat.end)  // -- date object
        })
      })
    })

## TODO
* better documentation
* provide summary and helper info for average runtimes
* how to bench things which take less than a milisecond?
