require("./index.css");
var $gS6ko$reactjsxruntime = require("react/jsx-runtime");
require("react");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "Introduction", () => $9233cea927cb9637$export$cc4d8724d022ebe5);
$parcel$export(module.exports, "default", () => $9233cea927cb9637$export$2e2bcd8739ae039);


var $e0c2d12cbd0aedf8$export$a279c5c553241f38;
$e0c2d12cbd0aedf8$export$a279c5c553241f38 = "introduction";




const $96ca7d2071891e76$export$f99233281efd08a0 = ({ options: options  })=>{
    return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx("h2", {
        children: options?.value
    });
};
var $96ca7d2071891e76$export$2e2bcd8739ae039 = {
    Title: $96ca7d2071891e76$export$f99233281efd08a0
};




const $ae1054aaeacdeb5a$export$cf345ef34cd72655 = ({ options: options  })=>{
    return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx("h3", {
        children: options.value
    });
};
var $ae1054aaeacdeb5a$export$2e2bcd8739ae039 = {
    Subtitle: $ae1054aaeacdeb5a$export$cf345ef34cd72655
};




const $b2f15e6ed827f967$export$4b2c32e08f77ff18 = ({ options: options  })=>{
    return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx("p", {
        children: options.value
    });
};
var $b2f15e6ed827f967$export$2e2bcd8739ae039 = {
    Body: $b2f15e6ed827f967$export$4b2c32e08f77ff18
};




const $00973f01e3e11c4b$export$b5f2c46c0231ba4e = ()=>{
    return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx("hr", {});
};
var $00973f01e3e11c4b$export$2e2bcd8739ae039 = {
    LineDivider: $00973f01e3e11c4b$export$b5f2c46c0231ba4e
};




const $878e31113bd39e73$export$e25b75e5623c2c82 = ({ options: options  })=>{
    return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsxs("h6", {
        children: [
            options.value,
            " minutes"
        ]
    });
};
var $878e31113bd39e73$export$2e2bcd8739ae039 = {
    CourseDuration: $878e31113bd39e73$export$e25b75e5623c2c82
};




const $9233cea927cb9637$export$cc4d8724d022ebe5 = ({ manifest: manifest  })=>{
    const titleConfig = manifest.title;
    const subtitleConfig = manifest.subtitle;
    const courseDurationConfig = manifest.courseDuration;
    const bodyConfig = manifest.body;
    if (titleConfig.type !== "text") {
        console.error("Title value not a string!");
        return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($gS6ko$reactjsxruntime.Fragment, {});
    }
    if (subtitleConfig.type !== "text") {
        console.error("Subtitle value not a string!");
        return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($gS6ko$reactjsxruntime.Fragment, {});
    }
    if (courseDurationConfig.type !== "number") {
        console.error("Course Duration value not a number!");
        return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($gS6ko$reactjsxruntime.Fragment, {});
    }
    if (bodyConfig.type !== "textarea") {
        console.error("Title value not a string");
        return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($gS6ko$reactjsxruntime.Fragment, {});
    }
    return /*#__PURE__*/ $gS6ko$reactjsxruntime.jsxs("div", {
        className: $e0c2d12cbd0aedf8$export$a279c5c553241f38,
        children: [
            /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($96ca7d2071891e76$export$f99233281efd08a0, {
                options: titleConfig
            }),
            /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($878e31113bd39e73$export$e25b75e5623c2c82, {
                options: courseDurationConfig
            }),
            /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($00973f01e3e11c4b$export$b5f2c46c0231ba4e, {}),
            /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($ae1054aaeacdeb5a$export$cf345ef34cd72655, {
                options: subtitleConfig
            }),
            /*#__PURE__*/ $gS6ko$reactjsxruntime.jsx($b2f15e6ed827f967$export$4b2c32e08f77ff18, {
                options: bodyConfig
            })
        ]
    });
};
var $9233cea927cb9637$export$2e2bcd8739ae039 = {
    Introduction: $9233cea927cb9637$export$cc4d8724d022ebe5
};


//# sourceMappingURL=index.js.map
