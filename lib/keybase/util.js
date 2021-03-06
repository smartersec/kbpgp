// Generated by IcedCoffeeScript 108.0.11
(function() {
  var SRF, bufxor, genseed, iced, __iced_k, __iced_k_noop;

  iced = require('iced-runtime');
  __iced_k = __iced_k_noop = function() {};

  SRF = require('../rand').SRF;

  exports.bufxor = bufxor = function(b1, b2) {
    var arr, c, i;
    arr = (function() {
      var _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = b1.length; _i < _len; i = ++_i) {
        c = b1[i];
        _results.push(c ^ b2[i]);
      }
      return _results;
    })();
    return Buffer.from(arr);
  };

  exports.genseed = genseed = function(_arg, cb) {
    var err, len, rseed, seed, server_half, split, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    seed = _arg.seed, split = _arg.split, len = _arg.len, server_half = _arg.server_half;
    err = rseed = null;
    if (server_half == null) {
      server_half = null;
    }
    (function(_this) {
      return (function(__iced_k) {
        if ((seed == null) || (split && (server_half == null))) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/max/src/keybase/kbpgp/src/keybase/util.iced"
            });
            SRF().random_bytes(len, __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return rseed = arguments[0];
                };
              })(),
              lineno: 16
            }));
            __iced_deferrals._fulfill();
          })(__iced_k);
        } else {
          return __iced_k();
        }
      });
    })(this)((function(_this) {
      return function() {
        if ((seed != null) && seed.length !== len) {
          err = new Error("Wrong seed length; need " + len + " bytes; got " + seed.length);
        } else if ((seed != null) && (rseed != null)) {
          server_half = rseed;
          seed = bufxor(seed, rseed);
        } else if ((seed != null) && (server_half != null)) {
          seed = bufxor(seed, server_half);
        } else if (seed == null) {
          seed = rseed;
        }
        return cb(err, {
          seed: seed,
          server_half: server_half
        });
      };
    })(this));
  };

  exports.prefix_signature_payload = function(prefix, payload) {
    var v;
    v = [];
    if (prefix != null ? prefix.length : void 0) {
      v.push(prefix);
      v.push(Buffer.from([0]));
    }
    if (payload != null) {
      v.push(payload);
    }
    if (v.length) {
      return Buffer.concat(v);
    } else {
      return null;
    }
  };

}).call(this);
