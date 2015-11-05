dumbstore: a quick and easy way to store data (strings for now) and retrieve them across app resets.
usage:

```var dumbStores = require('dumbstore');

var myStringStore = dumbStores.getStore('StringStore', 'myStringStore');

myStringStore.subscribe( console.log.bind( console, 'myStringStore contents:' ) );

myStringStore.add( 'foo' );

//myStringStore contents: ['foo']

var myKeyValueStore = dumbStores.getStore('KeyValueStore', 'myKeyValueStore');

myKeyValueStore.subscribe( console.log.bind( console, 'myKeyValueStore contents:' ) );

myKeyValueStore.add( 'foo', 'bar' );

//myKeyValueStore contents: { foo: 'bar' }

```
