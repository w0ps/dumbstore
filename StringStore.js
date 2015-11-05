var shared = require('./shared');

function StringStore( name, items ){
	this.name = name;
	this.type = 'StringStore';
	this.items = items || [];
	this.subscribers = [];
}

StringStore.prototype.add = function( str ){
	if(this.items.indexOf( str ) > -1 ) return; //not adding item twice

	this.items.push( str );

	this.save( console.log.bind( console, 'string store written' ) );
};

StringStore.prototype.save = shared.save;

StringStore.prototype.subscribe = shared.subscribe;

StringStore.prototype.unsubscribe = shared.unsubscribe;

module.exports = StringStore;
