Backbone = require( "backbone" );
_ = require( "underscore" );

require( "../src/backbone.collectionview" )

describe( "Backbone.CollectionView", function() {
    
    var view, collection;
    
    beforeEach( function() {
        collection = new Backbone.Collection([
            { name: "Steve" },
            { name: "John" },
            { name: "Peter" },
            { name: "Paul" },
            { name: "Andrew" }
        ]);
        view = new Backbone.CollectionView( collection );
    });
    
    describe( "sorting and filtering", function() {
    
        beforeEach( function() {
            view.filter = function( item ) {
                return item.get( "name" ).charAt( 0 ) === "P";
            };
            view.comparator = function( a, b ) {
                a = a.get( "name" );
                b = b.get( "name" );
                
                if ( a > b ) return 1;
                if ( a < b ) return -1;
                return 0;
            };
            view.refresh();
        });
    
        it( "should sort and filter but not affect the original list", function() {
            expect( view.length ).toBe( 2 );
            expect( view.at( 0 ).get( "name" ) ).toBe( "Paul" );
        });
        
        it( "should update the view when the collection is updated", function() {
            expect( view.length ).toBe( 2 );
            
            collection.add({ name: "Poppy" });
            
            expect( view.length ).toBe( 3 );
            expect( view.at( 2 ).get( "name" ) ).toBe( "Poppy" );
        });
        
        it( "should update the collection when the view is updated", function() {
            expect( collection.length ).toBe( 5 );
            
            view.add({ name: "Poppy" });
            
            expect( view.at( 2 ).get( "name" ) ).toBe( "Poppy" );
            expect( collection.length ).toBe( 6 );
            expect( collection.at( 5 ).get( "name" ) ).toBe( "Poppy" );
        });
    
    });
    
});
