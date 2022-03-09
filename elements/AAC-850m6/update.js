function(instance, properties, context) {
    
    
    var selector = '#' + properties.elementid;
    
    // wait until element appears on the page, checking every second
    // allows user to show element on pageload (no race conditions for showing input, if this plugin is loaded first it will still work)
    var waitForEl = function(ELselector, callback) {
      if (jQuery(ELselector).length) {
        callback();
      } else {
        setTimeout(function() {
          waitForEl(ELselector, callback);
        }, 1000);
      }
    };
    
  
    waitForEl(selector, function() {
    // v1 Instant Text functionality    
      function setValue (x) {
        instance.publishState("value",x);    
        //console.log("new value published");
      };
        
      $(selector).on("input", null, null, function(){
        instance.data.value = $(selector).val();
        setValue($(selector).val());
      });        
    // end v1 functionality
        
        // wait until initial content is set, checking every second
        // REMOVED THIS CONDITION, CAN ADD AGAIN LATER stop checking after ~15 seconds (not exact, slightly over 15 seconds due to overhead checking input)
        // this only begins: after the element is visible, AND 
        //                   when initial_content is set to true in the element on the user's page.
        if (properties.initial_content) {
            var waitForIC = function(ICselector, count, callback) {
              if (//count < 15 && 
                  instance.data.value === undefined && 
                  $(ICselector).val() !== "") {
                  // console.log($(ICselector).val());
                callback();
              } else {
                  //count++; ignoring this, too hard to explain
                  // console.log(count);
                  setTimeout(function() {
                      waitForIC(ICselector, count, callback);
                  }, 1000);
              }
            };

            waitForIC(selector, 0, function() {
                setValue($(selector).val());
            });
        }
    }); // end waitForEl call
}