dumbstore: a quick and easy way to store data (strings for now) and retrieve them across app resets.
usage:

```var dumbStores = require('dumbstore');

var myStore = dumbStores.getStringStore('myStore');

myStore.subscribe( console.log.bind( console, 'myStore contents:' ) );

myStore.add( 'test' );

//myStore contents: ['test']```
