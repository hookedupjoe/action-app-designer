
(function($){
  //--- Plugin: MOVE

  $.whenAll = function (deferreds) {
    function isPromise(fn) {
      return fn && typeof fn.then === 'function' &&
        String($.Deferred().then) === String(fn.then);
    }
    var d = $.Deferred(),
      keys = Object.keys(deferreds),
      args = keys.map(function (k) {
        return $.Deferred(function (d) {
          var fn = deferreds[k];

          (isPromise(fn) ? fn : $.Deferred(fn))
            .done(d.resolve)
            .fail(function (err) { d.reject(err, k); })
            ;
        });
      });

    $.when.apply(this, args)
      .done(function () {
        var resObj = {},
          resArgs = Array.prototype.slice.call(arguments);
        resArgs.forEach(function (v, i) { resObj[keys[i]] = v; });
        d.resolve(resObj);
      })
      .fail(d.reject);

    return d;
  };


})($);
