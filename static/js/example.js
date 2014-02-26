// This is the javascript file that is used to power the live example in the iphone on this [github page for the Junior HTML5 mobile framework](http://justspamjustin.github.com/junior/).
// Don't forget, that you need to include the necessary js and css dependencies
// that are listed on the main github page.  You will also need some initial scaffolding
// in the body of your HTML like this:
// <pre class="highlight">&lt;div id=<em class="s1">"app-container"</em>&gt;
//    &lt;div id=<em class="s1">"app-main"</em>&gt;
//    &lt;div&gt;
//&lt;div&gt;</pre>

// ## Defining Templates and Views

// ### HomeTemplate
//  This is just an array of strings.  However, you can use whatever
//  templating library that you want here.


// ### HomeView
// A Jr.View works just like a Backbone.View, except whenever you attach a click event,
// if will check to see if you are on a touch device and if you are, attach a
// touchend event instead.

var KaartView = Jr.View.extend({
  // Simply render our HomeTemplate in the View's HTML
  render: function(){
	  	//document.getElementByClassName('content')
    this.$el.html(document.getElementById('kaart').cloneNode(true));
    this.afterRender();
    // Always return 'this' so Jr.Router can append your view to the body
    return this;
  },

  afterRender: function() {
    this.setUpCarousel();
  },

  setUpCarousel: function() {
    var after = function() {
      // Use the flickable plugin to setup our carousel with 3 segments
      this.$('.carousel-list').flickable({segments:3});
    };
    // We have to put this in a setTimeout so that it sets it up after the view is added to the DOM
    setTimeout(after,1);
  },

  events: {
    'click .show-more-button': 'onClickShowMoreButton',
    'onScroll .carousel-list': 'onScrollCarousel',
    'click .carousel-navigation li': 'onClickCarouselNavigationItem'
  },

  onClickShowMoreButton: function() {
	  console.log('Jr.Navigator.navigate');
    // Jr.Navigator works like Backbone.history.navigate, but it allows you to add an animation in the mix.
    Jr.Navigator.navigate('page2',{
      trigger: true,
      animation: {
        // Do a stacking animation and slide to the left.
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.LEFT
      }
    });
    return false;
  },

  onScrollCarousel: function() {
    // Set the active dot when the user scrolls the carousel
    var index = this.$('.carousel-list').flickable('segment');
    this.$('.carousel-navigation li').removeClass('active');
    this.$('.carousel-navigation li[data-index="'+index+'"]').addClass('active');
  },

  onClickCarouselNavigationItem: function(e) {
    // Scroll the carousel when the user clicks on a dot.
    var index = $(e.currentTarget).attr('data-index');
    this.$('.carousel-list').flickable('segment',index);
  }

});


var KiesMeldingView = Jr.View.extend({
	  // Simply render our HomeTemplate in the View's HTML
	  render: function(){
		  	//document.getElementByClassName('content')
	    this.$el.html(document.getElementById('kiesmelding').cloneNode(true));
	    this.afterRender();
	    // Always return 'this' so Jr.Router can append your view to the body
	    return this;
	  },

	  afterRender: function() {
	    this.setUpCarousel();
	  },

	  setUpCarousel: function() {
	    var after = function() {
	      // Use the flickable plugin to setup our carousel with 3 segments
	      this.$('.cl2').flickable({segments:3});
	    };
	    // We have to put this in a setTimeout so that it sets it up after the view is added to the DOM
	    setTimeout(after,1);
	  },

	  events: {
	    'click .show-more-button': 'onClickShowMoreButton',
	    'onScroll .cl2': 'onScrollCarousel',
	    'click .cn2 li': 'onClickCarouselNavigationItem',
	    'click .button-prev': 'onClickButtonPrev'
	  },

	  onClickButtonPrev: function() {
	    Jr.Navigator.navigate('home',{
	      trigger: true,
	      animation: {
	        type: Jr.Navigator.animations.SLIDE_STACK,
	        direction: Jr.Navigator.directions.RIGHT
	      }
	    });
	  },

	  onClickShowMoreButton: function() {
	    // Jr.Navigator works like Backbone.history.navigate, but it allows you to add an animation in the mix.
	    Jr.Navigator.navigate('page3',{
	      trigger: true,
	      animation: {
	        // Do a stacking animation and slide to the left.
	        type: Jr.Navigator.animations.SLIDE_STACK,
	        direction: Jr.Navigator.directions.LEFT
	      }
	    });
	    return false;
	  },

	  onScrollCarousel: function() {
	    // Set the active dot when the user scrolls the carousel
		  console.log('start');
	    var index = this.$('.cl2').flickable('segment');
	    //console.log('index ' +index);
	    this.$('.cn2 li').removeClass('active');
	   // console.log('add ' +index);
	   // console.log(this);

	    //console.log(this.$('.cn2 li[data-index="'+index+'"]')[0]);
	    this.$('.cn2 li[data-index="'+index+'"]').addClass('active');
	  },

	  onClickCarouselNavigationItem: function(e) {
	    // Scroll the carousel when the user clicks on a dot.
	    var index = $(e.currentTarget).attr('data-index');
	    this.$('.cl2').flickable('segment',index);
	    this.setUpCarousel();
	  }

	});
// ### RatchetTemplate
// This is just a template that shows different UI elements that you can use from the Ratchet project

// ## PushStateView

var PushStateView = Jr.View.extend({
  render: function() {
	    this.$el.html(document.getElementById('page3').cloneNode(true));
    return this;
  },

  events: {
    'click .button-prev': 'onClickButtonPrev'
  },

  onClickButtonPrev: function() {
    Jr.Navigator.navigate('page2',{
      trigger: true,
      animation: {
        type: Jr.Navigator.animations.SLIDE_STACK,
        direction: Jr.Navigator.directions.RIGHT
      }
    });
  }

});

//## Routing to your Views
// Jr.Router is just like a Backbone.Router except we provide a renderView
// that will automatically add the view to the dom and do the animation if
// one is specified.  It will also automatically handle doing an opposite animation
// if the back button is pressed.

var AppRouter = Jr.Router.extend({
  routes: {
    'kaart': 'kaart',
    'kiesmelding': 'kiesmelding',
    'page3': 'page3'
  },

  kaart: function(){
    this.renderView(new KaartView());
  },

  kiesmelding: function() {
    this.renderView(new KiesMeldingView());
  },

  page3: function() {
    var pushStateView = new PushStateView();
    this.renderView(pushStateView);
  }

});

var startup = new AppRouter();
Backbone.history.start();
Jr.Navigator.navigate('kaart',{
  trigger: true
});


function showError(error)
  {
  switch(error.code)
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred.";
      break;
    }
  }
