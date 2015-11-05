var storeDir = process.cwd() + '/stores';

module.exports = {
	storeDir: storeDir,
	save: function( cb ){
		var items = this.items;

		fs.writeFile( storeDir + '/' + this.name + '.json', JSON.stringify( { type: this.type, items: this.items }, null, 2 ), 'utf8', cb );

		this.subscribers.forEach( sendData );

		function sendData( fun ){
			fun( items );
		}
	},
	subscribe: function( fun ) {
		this.subscribers.push( fun );
	},
	unsubscribe: function( fun ) {
		this.subscribers.splice( this.subscribers.indexOf( fun ) );
	}
};
