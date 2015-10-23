var fs = require( 'fs' );



var stores = {},
		constructors = {
			StringStore: StringStore
		},
		storeDir = __dirname + '/stores';

function StringStore( name, items ){
	this.name = name;
	this.type = 'StringStore';
	this.items = items || [];
	this.subscribers = [];
}

StringStore.prototype.add = function( str ){
	if(this.items.indexOf( str ) > -1 ) return; //not adding item twice

	this.items.push( str );

	this.save(console.log.bind(console, 'store written'));
};

StringStore.prototype.save = function( cb ){
	var items = this.items;

	fs.writeFile(storeDir + '/' + this.name + '.json', JSON.stringify( { type: this.type, items: this.items }, null, 2 ), 'utf8', cb );

	this.subscribers.forEach( sendData );

	function sendData( fun ){
		fun( items );
	}
};

StringStore.prototype.subscribe = function( fun ) {
	this.subscribers.push( fun );
};

StringStore.prototype.unsubscribe = function( fun ) {
	this.subscribers.splice( this.subscribers.indexOf( fun ) );
};

function init(){
	var t = new Date().getTime();
	if(!fs.existsSync( storeDir ) ) {
		fs.mkdirSync( storeDir );
	}

	var storeFiles = fs.readdirSync(storeDir);
	
	storeFiles.forEach( createStoreFromFile );

	console.log( Object.keys( stores ).length + ' dumbstores loaded in ' + ( new Date().getTime() - t ) + 'ms' );
}

init();

function createStoreFromFile( filename ){
	var split = filename.split('.'),
			storeName = split.slice(0, split.length - 1).join('.'),
			contents = fs.readFileSync( storeDir + '/' + filename, 'utf8' ),
			storeInfo = JSON.parse( contents ),
			store = new constructors[storeInfo.type]( storeName, storeInfo.items );

	stores[storeName] = store;
}

function getStringStore( name ){
	var store = stores[name];
	if( !store ) store = new StringStore( name );
	return store;
}

module.exports.getStringStore = getStringStore;
