var fs = require( 'fs' );

var shared = require('./shared'),
		stores = {},
		constructors = {
			StringStore: require('./StringStore.js'),
			KeyValueStore: require('./KeyValueStore.js')
		},
		storeDir = shared.storeDir;

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

function getStore( type, name ){
	var store = stores[name];
	if( !store ) store = new constructors[ type ]( name );
	stores[ name ] = store;
	return store;
}

module.exports.getStore = getStore;
