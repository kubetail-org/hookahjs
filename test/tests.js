/**
 * hookahjs tests
 * @module test/tests.js
 */

var assert = chai.assert,
    expect = chai.expect;


describe('HookahJS tests', function() {
  function dispatchEvent(el, type) {
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent(type, true, false);
    el.dispatchEvent(ev);
  }

  describe('Empty/Not-Empty CSS Hooks', function() {
    it('renders initial classes properly', function() {
      // empty
      var el = document.createElement('input');
      hkjs.init(el);
      assert.equal(/hkjs--empty/.test(el.className), true);
      assert.equal(/hkjs--not-empty/.test(el.className), false);
      
      // not empty
      el = document.createElement('input');
      el.value = 'my-value';
      hkjs.init(el);
      assert.equal(/hkjs--empty/.test(el.className), false);
      assert.equal(/hkjs--not-empty/.test(el.className), true);
    });
    

    it('updates pre-seeded classes', function() {
      var el;
      
      // empty
      el = document.createElement('input');
      el.className = 'hkjs--empty';
      hkjs.init(el);
      assert.equal(/hkjs--empty/.test(el.className), true);
      assert.equal(/hkjs--not-empty/.test(el.className), false);
      
      // not empty
      el = document.createElement('input');
      el.className = 'hkjs--not-empty';
      el.value = 'my-value';
      hkjs.init(el);
      assert.equal(/hkjs--empty/.test(el.className), false);
      assert.equal(/hkjs--not-empty/.test(el.className), true);
    });
    
    
    it('updates classes on change/input events', function() {
      var el;
      
      el = document.createElement('input');
      hkjs.init(el);
      
      // update value and verify that it still has empty class
      el.value = 'my-value';
      assert.equal(/hkjs--empty/.test(el.className), true);
      
      // trigger change event
      dispatchEvent(el, 'change');
      assert.equal(/hkjs--empty/.test(el.className), false);
      assert.equal(/hkjs--not-empty/.test(el.className), true);

      // remove value and verify that it still has empty class
      el.value = '';
      assert.equal(/hkjs--not-empty/.test(el.className), true);

      // trigger input event
      dispatchEvent(el, 'input');
      assert.equal(/hkjs--empty/.test(el.className), true);
      assert.equal(/hkjs--not-empty/.test(el.className), false);
    });
  });


  describe('Pristine/Dirty CSS Hooks', function() {
    it('renders with pristine hook', function() {
      // pristine
      var el = document.createElement('input');
      hkjs.init(el);
      assert.equal(/hkjs--pristine/.test(el.className), true);
      assert.equal(/hkjs--dirty/.test(el.className), false);
      
      // pristine
      el = document.createElement('input');
      el.value = 'my-value';
      hkjs.init(el);
      assert.equal(/hkjs--pristine/.test(el.className), true);
      assert.equal(/hkjs--dirty/.test(el.className), false);
    });


    it('updates classes on change/input events', function() {
      var el;

      // trigger change event
      el = document.createElement('input');
      hkjs.init(el);

      dispatchEvent(el, 'change');
      assert.equal(/hkjs--pristine/.test(el.className), false);
      assert.equal(/hkjs--dirty/.test(el.className), true);
      
      // trigger input event
      el = document.createElement('input');
      hkjs.init(el);
      
      dispatchEvent(el, 'input');
      assert.equal(/hkjs--pristine/.test(el.className), false);
      assert.equal(/hkjs--dirty/.test(el.className), true);
    });


    it("doesn't add pristine class if pre-seeded with dirty class", function(){
      var el;

      // seed with dirty class
      el = document.createElement('input');
      el.className = 'hkjs--dirty';
      hkjs.init(el);
      assert.equal(/hkjs--pristine/.test(el.className), false);
      assert.equal(/hkjs--dirty/.test(el.className), true);
    });
  });


  describe('Touched/Untouched CSS Hooks', function() {
    it('renders with `untouched` hook', function() {
      // untouched
      var el = document.createElement('input');
      hkjs.init(el);
      assert.equal(/hkjs--untouched/.test(el.className), true);
      assert.equal(/hkjs--touched/.test(el.className), false);
      
      // untouched
      el = document.createElement('input');
      el.value = 'my-value';
      hkjs.init(el);
      assert.equal(/hkjs--untouched/.test(el.className), true);
      assert.equal(/hkjs--touched/.test(el.className), false);
    });


    it('updates classes on blur event', function() {
      var el, ev;

      // trigger blur event
      el = document.createElement('input');
      hkjs.init(el);

      dispatchEvent(el, 'blur');
      assert.equal(/hkjs--untouched/.test(el.className), false);
      assert.equal(/hkjs--touched/.test(el.className), true);
    });


    it('removes handler after blur event', function() {
      var el, ev;

      el = document.createElement('input');
      hkjs.init(el);

      // trigger event
      dispatchEvent(el, 'blur');
      assert.equal(/hkjs--untouched/.test(el.className), false);
      assert.equal(/hkjs--touched/.test(el.className), true);

      // modify class and trigger again
      el.className = 'hkjs--untouched';
      dispatchEvent(el, 'blur');
      assert.equal(/hkjs--untouched/.test(el.className), true);
      assert.equal(/hkjs--touched/.test(el.className), false);
    });


    it('ignores blur event with el is still focused', function() {
      var el, ev;

      el = document.createElement('input');
      document.body.appendChild(el);
      hkjs.init(el);
      el.focus();

      // trigger event
      dispatchEvent(el, 'bur');
      assert.equal(/hkjs--untouched/.test(el.className), true);
      assert.equal(/hkjs--touched/.test(el.className), false);

      // clean up
      document.body.removeChild(el);
    });


    it("doesn't add `touched` if pre-seeded with `untouched`", function(){
      var el;

      // seed with touched class
      el = document.createElement('input');
      el.className = 'hkjs--touched';
      hkjs.init(el);
      assert.equal(/hkjs--untouched/.test(el.className), false);
      assert.equal(/hkjs--touched/.test(el.className), true);
    });
  });
});
