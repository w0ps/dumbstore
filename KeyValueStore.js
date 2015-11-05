var shared = require( './shared' );

function KeyValueStore( name, items ){
	this.name = name;
	this.type = 'KeyValueStore';
	this.items = items || {};
	this.subscribers = [];
}

KeyValueStore.prototype.add = function( key, value ) {
	this.items[ key ] = value;

	this.save( console.log.bind( console, 'key-value store written' ) );
};

KeyValueStore.prototype.get = function( key ) {
	return this.items[ key ];
};

KeyValueStore.prototype.save = shared.save;

KeyValueStore.prototype.save = shared.save;

KeyValueStore.prototype.subscribe = shared.subscribe;

KeyValueStore.prototype.unsubscribe = shared.unsubscribe;

module.exports = KeyValueStore;
