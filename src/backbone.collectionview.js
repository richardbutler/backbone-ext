(function( Backbone, _ ) {
    "use strict";
    
    var Collection = Backbone.Collection;
    
    /**
     * Backbone CollectionView creates a proxy to a Backbone Collection, that
     * allows differents "views" (or states) of the same data.
     * 
     * For example, you may have an underlying list of users, but you want to
     * display all users in one list and only male users in another list. You
     * can then maintain your main collection, whilst having a CollectionView
     * that filters male users.
     * 
     * Inspired by Flex's ListCollectionView.
     * 
     * @param {Object} collection
     * @param {Object} options
     */
    var CollectionView = function( collection, options ) {
        if ( !collection ) {
            throw new Error( "No collection supplied." );
        }
        
        _.bindAll( this, "refresh" );
        
        this.setCollection( collection );
    };
    
    _.extend( CollectionView.prototype, Backbone.Collection.prototype, {
        
        /**
         * @see Backbone.Collection.add
         */
        add: function( models, options ) {
            var model, i;
            
            models = _.isArray( models ) ? models.concat() : [ models ];
            
            for ( i = models.length - 1; i >= 0; i-- ) {
                model = models[ i ];
                
                if ( !( model instanceof this.model.constructor ) ) {
                    model = new this.model( model );
                    models.splice( i, 1, model );
                }
                
                if ( !this.filter || this.filter( model ) ) {
                    Collection.prototype.add.call( this, model, options );
                }
            }
            
            return this._collection.add( models, options );
        },
        
        /**
         * @see Backbone.Collection.remove
         */
        remove: function( models, options ) {
            Collection.prototype.remove.call( this, models, options );
            
            return this._collection.remove( models, options );
        },
        
        /**
         * Resets and refreshes the CollectionView based on the collection,
         * performing relevant sorting and filtering in the process.
         */
        refresh: function() {
            var items = this._collection.filter( this.filter );
            
            this._reset();
            this.models = items || [];
            
            if ( this.comparator !== undefined ) {
                this.sort({ silent: true });
            }
            
            this.length = this.models.length;
            this.trigger( "reset", this );
        },
        
        /**
         * Use this method to set the collection, rather than assigning it to
         * the property directly.
         * 
         * @param {Backbone.Collection} collection
         */
        setCollection: function( collection ) {
            if ( this._collection ) {
                this._collection.off( "all", this.refresh );
            }
            
            this._collection = collection;
            
            if ( this._collection ) {
                this._collection.on( "all", this.refresh );
            }
            
            this.refresh();
        }
    });
    
    CollectionView.extend = Collection.extend;
    
    Backbone.CollectionView = CollectionView;
    
})( Backbone, _ );
