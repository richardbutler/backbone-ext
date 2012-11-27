Backbone Extensions
===================

The motivation for this repository is to create a library of oft-used classes
and utilities used directly with Backbone.

Backbone.CollectionView
-----------------------

Backbone CollectionView creates a proxy to a Backbone Collection, that
allows differents "views" (or states) of the same data; inspired by Flex's
ListCollectionView.

For example, you may have an underlying list of users, but you want to
display all users in one list and only male users in another list. You
can then maintain your main collection, whilst having a CollectionView
that filters male users.

_Note: The name "CollectionView" is likely to change because whilst the name is
technically sound, it is somewhat confusing considering Backbone's Collection
and View classes._

    var collection, view;

    collection = new Backbone.Collection([
        { name: "Steve" },
        { name: "John" },
        { name: "Peter" },
        { name: "Paul" },
        { name: "Andrew" }
    ]);
    
    view = new Backbone.CollectionView( collection );
    view.comparator = function( a, b ) {
        a = a.get( "name" );
        b = b.get( "name" );
        
        if ( a > b ) return 1;
        if ( a < b ) return -1;
        return 0;
    };
    view.filter = function( item ) {
        // Filter all users whose names begin with the letter P.
        return item.get( "name" ).charAt( 0 ) === "P";
    };
    
    // Must be called after setting the sort comparator or filter functions.
    view.refresh();

    // Logs "Paul, Peter".
    console.log( view.map( function( user ) { return user.get( "name" ); } ).join( ", " ) );
