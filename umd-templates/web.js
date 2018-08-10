if (!this.<%= namespace %>) (function(doc, x) {
  // define global object
  <%= namespace %> = (function() {
    <%= contents %>
  })();

  // initialize
  function init(ev) {
    // trigger init event
    ev = doc.createEvent('HTMLEvents');
    if (ev.initEvent) ev.initEvent('hkjs-init', false, true);
    else ev = new Event('hkjs-init', {cancelable: true});
    doc.dispatchEvent(ev);
  
    // initialize library
    if (!ev.defaultPrevented) <%= namespace %>.init();
  }

  // execute on DOMContentLoaded
  x = doc.readyState;
  if (x == 'interactive' || x == 'complete') init();
  else doc.addEventListener('DOMContentLoaded', function() {init();});
})(document);
