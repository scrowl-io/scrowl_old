import './index.css';

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  });
}
var $parcel$global =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global['parcelRequire3e0a'];
if (parcelRequire == null) {
  parcelRequire = function (id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = { id: id, exports: {} };
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global['parcelRequire3e0a'] = parcelRequire;
}
parcelRequire.register('hBWRk', function (module, exports) {
  $parcel$export(
    module.exports,
    'Fragment',
    () => $cd238c9481ea077c$export$ffb0004e005737fa,
    v => ($cd238c9481ea077c$export$ffb0004e005737fa = v)
  );
  $parcel$export(
    module.exports,
    'jsx',
    () => $cd238c9481ea077c$export$34b9dba7ce09269b,
    v => ($cd238c9481ea077c$export$34b9dba7ce09269b = v)
  );
  $parcel$export(
    module.exports,
    'jsxs',
    () => $cd238c9481ea077c$export$25062201e9e25d76,
    v => ($cd238c9481ea077c$export$25062201e9e25d76 = v)
  );
  var $cd238c9481ea077c$export$ffb0004e005737fa;
  var $cd238c9481ea077c$export$34b9dba7ce09269b;
  var $cd238c9481ea077c$export$25062201e9e25d76;
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ ('use strict');

  var $dRi2I = parcelRequire('dRi2I');
  var $cd238c9481ea077c$var$k = Symbol.for('react.element'),
    $cd238c9481ea077c$var$l = Symbol.for('react.fragment'),
    $cd238c9481ea077c$var$m = Object.prototype.hasOwnProperty,
    $cd238c9481ea077c$var$n =
      $dRi2I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentOwner,
    $cd238c9481ea077c$var$p = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0,
    };
  function $cd238c9481ea077c$var$q(c, a, g) {
    var b,
      d = {},
      e = null,
      h = null;
    void 0 !== g && (e = '' + g);
    void 0 !== a.key && (e = '' + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a)
      $cd238c9481ea077c$var$m.call(a, b) &&
        !$cd238c9481ea077c$var$p.hasOwnProperty(b) &&
        (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in ((a = c.defaultProps), a)) void 0 === d[b] && (d[b] = a[b]);
    return {
      $$typeof: $cd238c9481ea077c$var$k,
      type: c,
      key: e,
      ref: h,
      props: d,
      _owner: $cd238c9481ea077c$var$n.current,
    };
  }
  $cd238c9481ea077c$export$ffb0004e005737fa = $cd238c9481ea077c$var$l;
  $cd238c9481ea077c$export$34b9dba7ce09269b = $cd238c9481ea077c$var$q;
  $cd238c9481ea077c$export$25062201e9e25d76 = $cd238c9481ea077c$var$q;
});
parcelRequire.register('dRi2I', function (module, exports) {
  'use strict';

  module.exports = parcelRequire('2dz4a');
});
parcelRequire.register('2dz4a', function (module, exports) {
  $parcel$export(
    module.exports,
    'Children',
    () => $19d7ff122e785330$export$dca3b0875bd9a954,
    v => ($19d7ff122e785330$export$dca3b0875bd9a954 = v)
  );
  $parcel$export(
    module.exports,
    'Component',
    () => $19d7ff122e785330$export$16fa2f45be04daa8,
    v => ($19d7ff122e785330$export$16fa2f45be04daa8 = v)
  );
  $parcel$export(
    module.exports,
    'Fragment',
    () => $19d7ff122e785330$export$ffb0004e005737fa,
    v => ($19d7ff122e785330$export$ffb0004e005737fa = v)
  );
  $parcel$export(
    module.exports,
    'Profiler',
    () => $19d7ff122e785330$export$e2c29f18771995cb,
    v => ($19d7ff122e785330$export$e2c29f18771995cb = v)
  );
  $parcel$export(
    module.exports,
    'PureComponent',
    () => $19d7ff122e785330$export$221d75b3f55bb0bd,
    v => ($19d7ff122e785330$export$221d75b3f55bb0bd = v)
  );
  $parcel$export(
    module.exports,
    'StrictMode',
    () => $19d7ff122e785330$export$5f8d39834fd61797,
    v => ($19d7ff122e785330$export$5f8d39834fd61797 = v)
  );
  $parcel$export(
    module.exports,
    'Suspense',
    () => $19d7ff122e785330$export$74bf444e3cd11ea5,
    v => ($19d7ff122e785330$export$74bf444e3cd11ea5 = v)
  );
  $parcel$export(
    module.exports,
    '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
    () => $19d7ff122e785330$export$ae55be85d98224ed,
    v => ($19d7ff122e785330$export$ae55be85d98224ed = v)
  );
  $parcel$export(
    module.exports,
    'cloneElement',
    () => $19d7ff122e785330$export$e530037191fcd5d7,
    v => ($19d7ff122e785330$export$e530037191fcd5d7 = v)
  );
  $parcel$export(
    module.exports,
    'createContext',
    () => $19d7ff122e785330$export$fd42f52fd3ae1109,
    v => ($19d7ff122e785330$export$fd42f52fd3ae1109 = v)
  );
  $parcel$export(
    module.exports,
    'createElement',
    () => $19d7ff122e785330$export$c8a8987d4410bf2d,
    v => ($19d7ff122e785330$export$c8a8987d4410bf2d = v)
  );
  $parcel$export(
    module.exports,
    'createFactory',
    () => $19d7ff122e785330$export$d38cd72104c1f0e9,
    v => ($19d7ff122e785330$export$d38cd72104c1f0e9 = v)
  );
  $parcel$export(
    module.exports,
    'createRef',
    () => $19d7ff122e785330$export$7d1e3a5e95ceca43,
    v => ($19d7ff122e785330$export$7d1e3a5e95ceca43 = v)
  );
  $parcel$export(
    module.exports,
    'forwardRef',
    () => $19d7ff122e785330$export$257a8862b851cb5b,
    v => ($19d7ff122e785330$export$257a8862b851cb5b = v)
  );
  $parcel$export(
    module.exports,
    'isValidElement',
    () => $19d7ff122e785330$export$a8257692ac88316c,
    v => ($19d7ff122e785330$export$a8257692ac88316c = v)
  );
  $parcel$export(
    module.exports,
    'lazy',
    () => $19d7ff122e785330$export$488013bae63b21da,
    v => ($19d7ff122e785330$export$488013bae63b21da = v)
  );
  $parcel$export(
    module.exports,
    'memo',
    () => $19d7ff122e785330$export$7c73462e0d25e514,
    v => ($19d7ff122e785330$export$7c73462e0d25e514 = v)
  );
  $parcel$export(
    module.exports,
    'startTransition',
    () => $19d7ff122e785330$export$7568632d0d33d16d,
    v => ($19d7ff122e785330$export$7568632d0d33d16d = v)
  );
  $parcel$export(
    module.exports,
    'unstable_act',
    () => $19d7ff122e785330$export$88948ce120ea2619,
    v => ($19d7ff122e785330$export$88948ce120ea2619 = v)
  );
  $parcel$export(
    module.exports,
    'useCallback',
    () => $19d7ff122e785330$export$35808ee640e87ca7,
    v => ($19d7ff122e785330$export$35808ee640e87ca7 = v)
  );
  $parcel$export(
    module.exports,
    'useContext',
    () => $19d7ff122e785330$export$fae74005e78b1a27,
    v => ($19d7ff122e785330$export$fae74005e78b1a27 = v)
  );
  $parcel$export(
    module.exports,
    'useDebugValue',
    () => $19d7ff122e785330$export$dc8fbce3eb94dc1e,
    v => ($19d7ff122e785330$export$dc8fbce3eb94dc1e = v)
  );
  $parcel$export(
    module.exports,
    'useDeferredValue',
    () => $19d7ff122e785330$export$6a7bc4e911dc01cf,
    v => ($19d7ff122e785330$export$6a7bc4e911dc01cf = v)
  );
  $parcel$export(
    module.exports,
    'useEffect',
    () => $19d7ff122e785330$export$6d9c69b0de29b591,
    v => ($19d7ff122e785330$export$6d9c69b0de29b591 = v)
  );
  $parcel$export(
    module.exports,
    'useId',
    () => $19d7ff122e785330$export$f680877a34711e37,
    v => ($19d7ff122e785330$export$f680877a34711e37 = v)
  );
  $parcel$export(
    module.exports,
    'useImperativeHandle',
    () => $19d7ff122e785330$export$d5a552a76deda3c2,
    v => ($19d7ff122e785330$export$d5a552a76deda3c2 = v)
  );
  $parcel$export(
    module.exports,
    'useInsertionEffect',
    () => $19d7ff122e785330$export$aaabe4eda9ed9969,
    v => ($19d7ff122e785330$export$aaabe4eda9ed9969 = v)
  );
  $parcel$export(
    module.exports,
    'useLayoutEffect',
    () => $19d7ff122e785330$export$e5c5a5f917a5871c,
    v => ($19d7ff122e785330$export$e5c5a5f917a5871c = v)
  );
  $parcel$export(
    module.exports,
    'useMemo',
    () => $19d7ff122e785330$export$1538c33de8887b59,
    v => ($19d7ff122e785330$export$1538c33de8887b59 = v)
  );
  $parcel$export(
    module.exports,
    'useReducer',
    () => $19d7ff122e785330$export$13e3392192263954,
    v => ($19d7ff122e785330$export$13e3392192263954 = v)
  );
  $parcel$export(
    module.exports,
    'useRef',
    () => $19d7ff122e785330$export$b8f5890fc79d6aca,
    v => ($19d7ff122e785330$export$b8f5890fc79d6aca = v)
  );
  $parcel$export(
    module.exports,
    'useState',
    () => $19d7ff122e785330$export$60241385465d0a34,
    v => ($19d7ff122e785330$export$60241385465d0a34 = v)
  );
  $parcel$export(
    module.exports,
    'useSyncExternalStore',
    () => $19d7ff122e785330$export$306c0aa65ff9ec16,
    v => ($19d7ff122e785330$export$306c0aa65ff9ec16 = v)
  );
  $parcel$export(
    module.exports,
    'useTransition',
    () => $19d7ff122e785330$export$7b286972b8d8ccbf,
    v => ($19d7ff122e785330$export$7b286972b8d8ccbf = v)
  );
  $parcel$export(
    module.exports,
    'version',
    () => $19d7ff122e785330$export$83d89fbfd8236492,
    v => ($19d7ff122e785330$export$83d89fbfd8236492 = v)
  );
  var $19d7ff122e785330$export$dca3b0875bd9a954;
  var $19d7ff122e785330$export$16fa2f45be04daa8;
  var $19d7ff122e785330$export$ffb0004e005737fa;
  var $19d7ff122e785330$export$e2c29f18771995cb;
  var $19d7ff122e785330$export$221d75b3f55bb0bd;
  var $19d7ff122e785330$export$5f8d39834fd61797;
  var $19d7ff122e785330$export$74bf444e3cd11ea5;
  var $19d7ff122e785330$export$ae55be85d98224ed;
  var $19d7ff122e785330$export$e530037191fcd5d7;
  var $19d7ff122e785330$export$fd42f52fd3ae1109;
  var $19d7ff122e785330$export$c8a8987d4410bf2d;
  var $19d7ff122e785330$export$d38cd72104c1f0e9;
  var $19d7ff122e785330$export$7d1e3a5e95ceca43;
  var $19d7ff122e785330$export$257a8862b851cb5b;
  var $19d7ff122e785330$export$a8257692ac88316c;
  var $19d7ff122e785330$export$488013bae63b21da;
  var $19d7ff122e785330$export$7c73462e0d25e514;
  var $19d7ff122e785330$export$7568632d0d33d16d;
  var $19d7ff122e785330$export$88948ce120ea2619;
  var $19d7ff122e785330$export$35808ee640e87ca7;
  var $19d7ff122e785330$export$fae74005e78b1a27;
  var $19d7ff122e785330$export$dc8fbce3eb94dc1e;
  var $19d7ff122e785330$export$6a7bc4e911dc01cf;
  var $19d7ff122e785330$export$6d9c69b0de29b591;
  var $19d7ff122e785330$export$f680877a34711e37;
  var $19d7ff122e785330$export$d5a552a76deda3c2;
  var $19d7ff122e785330$export$aaabe4eda9ed9969;
  var $19d7ff122e785330$export$e5c5a5f917a5871c;
  var $19d7ff122e785330$export$1538c33de8887b59;
  var $19d7ff122e785330$export$13e3392192263954;
  var $19d7ff122e785330$export$b8f5890fc79d6aca;
  var $19d7ff122e785330$export$60241385465d0a34;
  var $19d7ff122e785330$export$306c0aa65ff9ec16;
  var $19d7ff122e785330$export$7b286972b8d8ccbf;
  var $19d7ff122e785330$export$83d89fbfd8236492;
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ ('use strict');
  var $19d7ff122e785330$var$l = Symbol.for('react.element'),
    $19d7ff122e785330$var$n = Symbol.for('react.portal'),
    $19d7ff122e785330$var$p = Symbol.for('react.fragment'),
    $19d7ff122e785330$var$q = Symbol.for('react.strict_mode'),
    $19d7ff122e785330$var$r = Symbol.for('react.profiler'),
    $19d7ff122e785330$var$t = Symbol.for('react.provider'),
    $19d7ff122e785330$var$u = Symbol.for('react.context'),
    $19d7ff122e785330$var$v = Symbol.for('react.forward_ref'),
    $19d7ff122e785330$var$w = Symbol.for('react.suspense'),
    $19d7ff122e785330$var$x = Symbol.for('react.memo'),
    $19d7ff122e785330$var$y = Symbol.for('react.lazy'),
    $19d7ff122e785330$var$z = Symbol.iterator;
  function $19d7ff122e785330$var$A(a) {
    if (null === a || 'object' !== typeof a) return null;
    a =
      ($19d7ff122e785330$var$z && a[$19d7ff122e785330$var$z]) ||
      a['@@iterator'];
    return 'function' === typeof a ? a : null;
  }
  var $19d7ff122e785330$var$B = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    $19d7ff122e785330$var$C = Object.assign,
    $19d7ff122e785330$var$D = {};
  function $19d7ff122e785330$var$E(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = $19d7ff122e785330$var$D;
    this.updater = e || $19d7ff122e785330$var$B;
  }
  $19d7ff122e785330$var$E.prototype.isReactComponent = {};
  $19d7ff122e785330$var$E.prototype.setState = function (a, b) {
    if ('object' !== typeof a && 'function' !== typeof a && null != a)
      throw Error(
        'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
      );
    this.updater.enqueueSetState(this, a, b, 'setState');
  };
  $19d7ff122e785330$var$E.prototype.forceUpdate = function (a) {
    this.updater.enqueueForceUpdate(this, a, 'forceUpdate');
  };
  function $19d7ff122e785330$var$F() {}
  $19d7ff122e785330$var$F.prototype = $19d7ff122e785330$var$E.prototype;
  function $19d7ff122e785330$var$G(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = $19d7ff122e785330$var$D;
    this.updater = e || $19d7ff122e785330$var$B;
  }
  var $19d7ff122e785330$var$H = ($19d7ff122e785330$var$G.prototype =
    new $19d7ff122e785330$var$F());
  $19d7ff122e785330$var$H.constructor = $19d7ff122e785330$var$G;
  $19d7ff122e785330$var$C(
    $19d7ff122e785330$var$H,
    $19d7ff122e785330$var$E.prototype
  );
  $19d7ff122e785330$var$H.isPureReactComponent = !0;
  var $19d7ff122e785330$var$I = Array.isArray,
    $19d7ff122e785330$var$J = Object.prototype.hasOwnProperty,
    $19d7ff122e785330$var$K = {
      current: null,
    },
    $19d7ff122e785330$var$L = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0,
    };
  function $19d7ff122e785330$var$M(a, b, e) {
    var d,
      c = {},
      k = null,
      h = null;
    if (null != b)
      for (d in (void 0 !== b.ref && (h = b.ref),
      void 0 !== b.key && (k = '' + b.key),
      b))
        $19d7ff122e785330$var$J.call(b, d) &&
          !$19d7ff122e785330$var$L.hasOwnProperty(d) &&
          (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
      for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
      c.children = f;
    }
    if (a && a.defaultProps)
      for (d in ((g = a.defaultProps), g)) void 0 === c[d] && (c[d] = g[d]);
    return {
      $$typeof: $19d7ff122e785330$var$l,
      type: a,
      key: k,
      ref: h,
      props: c,
      _owner: $19d7ff122e785330$var$K.current,
    };
  }
  function $19d7ff122e785330$var$N(a, b) {
    return {
      $$typeof: $19d7ff122e785330$var$l,
      type: a.type,
      key: b,
      ref: a.ref,
      props: a.props,
      _owner: a._owner,
    };
  }
  function $19d7ff122e785330$var$O(a) {
    return (
      'object' === typeof a &&
      null !== a &&
      a.$$typeof === $19d7ff122e785330$var$l
    );
  }
  function $19d7ff122e785330$var$escape(a1) {
    var b = {
      '=': '=0',
      ':': '=2',
    };
    return (
      '$' +
      a1.replace(/[=:]/g, function (a) {
        return b[a];
      })
    );
  }
  var $19d7ff122e785330$var$P = /\/+/g;
  function $19d7ff122e785330$var$Q(a, b) {
    return 'object' === typeof a && null !== a && null != a.key
      ? $19d7ff122e785330$var$escape('' + a.key)
      : b.toString(36);
  }
  function $19d7ff122e785330$var$R(a2, b, e, d, c) {
    var k = typeof a2;
    if ('undefined' === k || 'boolean' === k) a2 = null;
    var h = !1;
    if (null === a2) h = !0;
    else
      switch (k) {
        case 'string':
        case 'number':
          h = !0;
          break;
        case 'object':
          switch (a2.$$typeof) {
            case $19d7ff122e785330$var$l:
            case $19d7ff122e785330$var$n:
              h = !0;
          }
      }
    if (h)
      return (
        (h = a2),
        (c = c(h)),
        (a2 = '' === d ? '.' + $19d7ff122e785330$var$Q(h, 0) : d),
        $19d7ff122e785330$var$I(c)
          ? ((e = ''),
            null != a2 &&
              (e = a2.replace($19d7ff122e785330$var$P, '$&/') + '/'),
            $19d7ff122e785330$var$R(c, b, e, '', function (a) {
              return a;
            }))
          : null != c &&
            ($19d7ff122e785330$var$O(c) &&
              (c = $19d7ff122e785330$var$N(
                c,
                e +
                  (!c.key || (h && h.key === c.key)
                    ? ''
                    : ('' + c.key).replace($19d7ff122e785330$var$P, '$&/') +
                      '/') +
                  a2
              )),
            b.push(c)),
        1
      );
    h = 0;
    d = '' === d ? '.' : d + ':';
    if ($19d7ff122e785330$var$I(a2))
      for (var g = 0; g < a2.length; g++) {
        k = a2[g];
        var f = d + $19d7ff122e785330$var$Q(k, g);
        h += $19d7ff122e785330$var$R(k, b, e, f, c);
      }
    else if (((f = $19d7ff122e785330$var$A(a2)), 'function' === typeof f))
      for (a2 = f.call(a2), g = 0; !(k = a2.next()).done; )
        (k = k.value),
          (f = d + $19d7ff122e785330$var$Q(k, g++)),
          (h += $19d7ff122e785330$var$R(k, b, e, f, c));
    else if ('object' === k)
      throw (
        ((b = String(a2)),
        Error(
          'Objects are not valid as a React child (found: ' +
            ('[object Object]' === b
              ? 'object with keys {' + Object.keys(a2).join(', ') + '}'
              : b) +
            '). If you meant to render a collection of children, use an array instead.'
        ))
      );
    return h;
  }
  function $19d7ff122e785330$var$S(a3, b, e) {
    if (null == a3) return a3;
    var d = [],
      c = 0;
    $19d7ff122e785330$var$R(a3, d, '', '', function (a) {
      return b.call(e, a, c++);
    });
    return d;
  }
  function $19d7ff122e785330$var$T(a) {
    if (-1 === a._status) {
      var b1 = a._result;
      b1 = b1();
      b1.then(
        function (b) {
          if (0 === a._status || -1 === a._status)
            (a._status = 1), (a._result = b);
        },
        function (b) {
          if (0 === a._status || -1 === a._status)
            (a._status = 2), (a._result = b);
        }
      );
      -1 === a._status && ((a._status = 0), (a._result = b1));
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
  }
  var $19d7ff122e785330$var$U = {
      current: null,
    },
    $19d7ff122e785330$var$V = {
      transition: null,
    },
    $19d7ff122e785330$var$W = {
      ReactCurrentDispatcher: $19d7ff122e785330$var$U,
      ReactCurrentBatchConfig: $19d7ff122e785330$var$V,
      ReactCurrentOwner: $19d7ff122e785330$var$K,
    };
  $19d7ff122e785330$export$dca3b0875bd9a954 = {
    map: $19d7ff122e785330$var$S,
    forEach: function (a, b, e) {
      $19d7ff122e785330$var$S(
        a,
        function () {
          b.apply(this, arguments);
        },
        e
      );
    },
    count: function (a) {
      var b = 0;
      $19d7ff122e785330$var$S(a, function () {
        b++;
      });
      return b;
    },
    toArray: function (a4) {
      return (
        $19d7ff122e785330$var$S(a4, function (a) {
          return a;
        }) || []
      );
    },
    only: function (a) {
      if (!$19d7ff122e785330$var$O(a))
        throw Error(
          'React.Children.only expected to receive a single React element child.'
        );
      return a;
    },
  };
  $19d7ff122e785330$export$16fa2f45be04daa8 = $19d7ff122e785330$var$E;
  $19d7ff122e785330$export$ffb0004e005737fa = $19d7ff122e785330$var$p;
  $19d7ff122e785330$export$e2c29f18771995cb = $19d7ff122e785330$var$r;
  $19d7ff122e785330$export$221d75b3f55bb0bd = $19d7ff122e785330$var$G;
  $19d7ff122e785330$export$5f8d39834fd61797 = $19d7ff122e785330$var$q;
  $19d7ff122e785330$export$74bf444e3cd11ea5 = $19d7ff122e785330$var$w;
  $19d7ff122e785330$export$ae55be85d98224ed = $19d7ff122e785330$var$W;
  $19d7ff122e785330$export$e530037191fcd5d7 = function (a, b, e) {
    if (null === a || void 0 === a)
      throw Error(
        'React.cloneElement(...): The argument must be a React element, but you passed ' +
          a +
          '.'
      );
    var d = $19d7ff122e785330$var$C({}, a.props),
      c = a.key,
      k = a.ref,
      h = a._owner;
    if (null != b) {
      void 0 !== b.ref && ((k = b.ref), (h = $19d7ff122e785330$var$K.current));
      void 0 !== b.key && (c = '' + b.key);
      if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
      for (f in b)
        $19d7ff122e785330$var$J.call(b, f) &&
          !$19d7ff122e785330$var$L.hasOwnProperty(f) &&
          (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (1 === f) d.children = e;
    else if (1 < f) {
      g = Array(f);
      for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
      d.children = g;
    }
    return {
      $$typeof: $19d7ff122e785330$var$l,
      type: a.type,
      key: c,
      ref: k,
      props: d,
      _owner: h,
    };
  };
  $19d7ff122e785330$export$fd42f52fd3ae1109 = function (a) {
    a = {
      $$typeof: $19d7ff122e785330$var$u,
      _currentValue: a,
      _currentValue2: a,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    };
    a.Provider = {
      $$typeof: $19d7ff122e785330$var$t,
      _context: a,
    };
    return (a.Consumer = a);
  };
  $19d7ff122e785330$export$c8a8987d4410bf2d = $19d7ff122e785330$var$M;
  $19d7ff122e785330$export$d38cd72104c1f0e9 = function (a) {
    var b = $19d7ff122e785330$var$M.bind(null, a);
    b.type = a;
    return b;
  };
  $19d7ff122e785330$export$7d1e3a5e95ceca43 = function () {
    return {
      current: null,
    };
  };
  $19d7ff122e785330$export$257a8862b851cb5b = function (a) {
    return {
      $$typeof: $19d7ff122e785330$var$v,
      render: a,
    };
  };
  $19d7ff122e785330$export$a8257692ac88316c = $19d7ff122e785330$var$O;
  $19d7ff122e785330$export$488013bae63b21da = function (a) {
    return {
      $$typeof: $19d7ff122e785330$var$y,
      _payload: {
        _status: -1,
        _result: a,
      },
      _init: $19d7ff122e785330$var$T,
    };
  };
  $19d7ff122e785330$export$7c73462e0d25e514 = function (a, b) {
    return {
      $$typeof: $19d7ff122e785330$var$x,
      type: a,
      compare: void 0 === b ? null : b,
    };
  };
  $19d7ff122e785330$export$7568632d0d33d16d = function (a) {
    var b = $19d7ff122e785330$var$V.transition;
    $19d7ff122e785330$var$V.transition = {};
    try {
      a();
    } finally {
      $19d7ff122e785330$var$V.transition = b;
    }
  };
  $19d7ff122e785330$export$88948ce120ea2619 = function () {
    throw Error('act(...) is not supported in production builds of React.');
  };
  $19d7ff122e785330$export$35808ee640e87ca7 = function (a, b) {
    return $19d7ff122e785330$var$U.current.useCallback(a, b);
  };
  $19d7ff122e785330$export$fae74005e78b1a27 = function (a) {
    return $19d7ff122e785330$var$U.current.useContext(a);
  };
  $19d7ff122e785330$export$dc8fbce3eb94dc1e = function () {};
  $19d7ff122e785330$export$6a7bc4e911dc01cf = function (a) {
    return $19d7ff122e785330$var$U.current.useDeferredValue(a);
  };
  $19d7ff122e785330$export$6d9c69b0de29b591 = function (a, b) {
    return $19d7ff122e785330$var$U.current.useEffect(a, b);
  };
  $19d7ff122e785330$export$f680877a34711e37 = function () {
    return $19d7ff122e785330$var$U.current.useId();
  };
  $19d7ff122e785330$export$d5a552a76deda3c2 = function (a, b, e) {
    return $19d7ff122e785330$var$U.current.useImperativeHandle(a, b, e);
  };
  $19d7ff122e785330$export$aaabe4eda9ed9969 = function (a, b) {
    return $19d7ff122e785330$var$U.current.useInsertionEffect(a, b);
  };
  $19d7ff122e785330$export$e5c5a5f917a5871c = function (a, b) {
    return $19d7ff122e785330$var$U.current.useLayoutEffect(a, b);
  };
  $19d7ff122e785330$export$1538c33de8887b59 = function (a, b) {
    return $19d7ff122e785330$var$U.current.useMemo(a, b);
  };
  $19d7ff122e785330$export$13e3392192263954 = function (a, b, e) {
    return $19d7ff122e785330$var$U.current.useReducer(a, b, e);
  };
  $19d7ff122e785330$export$b8f5890fc79d6aca = function (a) {
    return $19d7ff122e785330$var$U.current.useRef(a);
  };
  $19d7ff122e785330$export$60241385465d0a34 = function (a) {
    return $19d7ff122e785330$var$U.current.useState(a);
  };
  $19d7ff122e785330$export$306c0aa65ff9ec16 = function (a, b, e) {
    return $19d7ff122e785330$var$U.current.useSyncExternalStore(a, b, e);
  };
  $19d7ff122e785330$export$7b286972b8d8ccbf = function () {
    return $19d7ff122e785330$var$U.current.useTransition();
  };
  $19d7ff122e785330$export$83d89fbfd8236492 = '18.1.0';
});

var $77e8d50d2e3c37d8$exports = {};
('use strict');

$77e8d50d2e3c37d8$exports = parcelRequire('hBWRk');

parcelRequire('dRi2I');
var $09d6d5cf124fc2ec$export$a279c5c553241f38;
$09d6d5cf124fc2ec$export$a279c5c553241f38 = 'introduction';

parcelRequire('dRi2I');
const $0e65cd8d2bbfdd5b$export$f99233281efd08a0 = ({ options: options }) => {
  return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx('h2', {
    children: options?.value,
  });
};
var $0e65cd8d2bbfdd5b$export$2e2bcd8739ae039 = {
  Title: $0e65cd8d2bbfdd5b$export$f99233281efd08a0,
};

parcelRequire('dRi2I');
const $69b6345e7d4cbf70$export$cf345ef34cd72655 = ({ options: options }) => {
  return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx('h3', {
    children: options.value,
  });
};
var $69b6345e7d4cbf70$export$2e2bcd8739ae039 = {
  Subtitle: $69b6345e7d4cbf70$export$cf345ef34cd72655,
};

parcelRequire('dRi2I');
const $badd1c4120f5f84f$export$4b2c32e08f77ff18 = ({ options: options }) => {
  return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx('p', {
    children: options.value,
  });
};
var $badd1c4120f5f84f$export$2e2bcd8739ae039 = {
  Body: $badd1c4120f5f84f$export$4b2c32e08f77ff18,
};

parcelRequire('dRi2I');
const $bb7e48a74d2a9995$export$b5f2c46c0231ba4e = () => {
  return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx('hr', {});
};
var $bb7e48a74d2a9995$export$2e2bcd8739ae039 = {
  LineDivider: $bb7e48a74d2a9995$export$b5f2c46c0231ba4e,
};

parcelRequire('dRi2I');
const $11676c5cdf82f0a8$export$e25b75e5623c2c82 = ({ options: options }) => {
  return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsxs('h6', {
    children: [options.value, ' minutes'],
  });
};
var $11676c5cdf82f0a8$export$2e2bcd8739ae039 = {
  CourseDuration: $11676c5cdf82f0a8$export$e25b75e5623c2c82,
};

const $b58c553922c448e0$export$cc4d8724d022ebe5 = ({ manifest: manifest }) => {
  const titleConfig = manifest.title;
  const subtitleConfig = manifest.subtitle;
  const courseDurationConfig = manifest.courseDuration;
  const bodyConfig = manifest.body;
  if (titleConfig.type !== 'text') {
    console.error('Title value not a string!');
    return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
      $77e8d50d2e3c37d8$exports.Fragment,
      {}
    );
  }
  if (subtitleConfig.type !== 'text') {
    console.error('Subtitle value not a string!');
    return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
      $77e8d50d2e3c37d8$exports.Fragment,
      {}
    );
  }
  if (courseDurationConfig.type !== 'number') {
    console.error('Course Duration value not a number!');
    return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
      $77e8d50d2e3c37d8$exports.Fragment,
      {}
    );
  }
  if (bodyConfig.type !== 'textarea') {
    console.error('Title value not a string');
    return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
      $77e8d50d2e3c37d8$exports.Fragment,
      {}
    );
  }
  return /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsxs('div', {
    className: $09d6d5cf124fc2ec$export$a279c5c553241f38,
    children: [
      /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
        $0e65cd8d2bbfdd5b$export$f99233281efd08a0,
        {
          options: titleConfig,
        }
      ),
      /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
        $11676c5cdf82f0a8$export$e25b75e5623c2c82,
        {
          options: courseDurationConfig,
        }
      ),
      /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
        $bb7e48a74d2a9995$export$b5f2c46c0231ba4e,
        {}
      ),
      /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
        $69b6345e7d4cbf70$export$cf345ef34cd72655,
        {
          options: subtitleConfig,
        }
      ),
      /*#__PURE__*/ $77e8d50d2e3c37d8$exports.jsx(
        $badd1c4120f5f84f$export$4b2c32e08f77ff18,
        {
          options: bodyConfig,
        }
      ),
    ],
  });
};
var $b58c553922c448e0$export$2e2bcd8739ae039 = {
  Introduction: $b58c553922c448e0$export$cc4d8724d022ebe5,
};

export {
  $b58c553922c448e0$export$cc4d8724d022ebe5 as Introduction,
  $b58c553922c448e0$export$2e2bcd8739ae039 as default,
};
//# sourceMappingURL=index.js.map
