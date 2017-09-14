// define global object
<%= namespace %> = (function (<%= param %>) {
<%= contents %>
})(<%= global %>);

// initialize
document.addEventListener('DOMContentLoaded', function() {
  // trigger init event
  var ev = document.createEvent('HTMLEvents');
  ev.initEvent('hkjs-init', false, true);
  document.dispatchEvent(ev);
  
  // initialize library
  if (!ev.defaultPrevented) <%= namespace %>.init();
});
