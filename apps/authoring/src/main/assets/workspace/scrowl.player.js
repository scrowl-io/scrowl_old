require("./scrowl.player.css");
var $c5RZX$reactjsxruntime = require("react/jsx-runtime");
var $c5RZX$react = require("react");
var $c5RZX$reactrouterdom = require("react-router-dom");
var $c5RZX$owluilib = require("@owlui/lib");
var $c5RZX$reactbootstrap = require("react-bootstrap");

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $c67a19b186f1582a$exports = {};
var $7fbf2bc6c6c20081$exports = {};

$parcel$defineInteropFlag($7fbf2bc6c6c20081$exports);

$parcel$export($7fbf2bc6c6c20081$exports, "App", () => $7fbf2bc6c6c20081$export$86fbec116b87613f);
$parcel$export($7fbf2bc6c6c20081$exports, "default", () => $7fbf2bc6c6c20081$export$2e2bcd8739ae039);



var $31a7195d5fab3e13$export$729c8b7179294ba;
var $31a7195d5fab3e13$export$21813e8ba15b8006;
var $31a7195d5fab3e13$export$f6cadf447928a533;
$31a7195d5fab3e13$export$729c8b7179294ba = "app";
$31a7195d5fab3e13$export$21813e8ba15b8006 = "app-main";
$31a7195d5fab3e13$export$f6cadf447928a533 = "app-main";


var $3ae11dbdad4aeba4$exports = {};
var $12585369b146a620$exports = {};


var $d24388e2d67487a6$exports = {};

$parcel$defineInteropFlag($d24388e2d67487a6$exports);

$parcel$export($d24388e2d67487a6$exports, "get", () => $d24388e2d67487a6$export$3988ae62b71be9a3);
$parcel$export($d24388e2d67487a6$exports, "default", () => $d24388e2d67487a6$export$2e2bcd8739ae039);
const $d24388e2d67487a6$export$3988ae62b71be9a3 = ()=>{
    if (!window.__SCROWL_MANIFEST) return {
        error: true,
        message: 'Unable to find project manifest'
    };
    else return {
        error: false,
        data: window.__SCROWL_MANIFEST
    };
};
var $d24388e2d67487a6$export$2e2bcd8739ae039 = {
    get: $d24388e2d67487a6$export$3988ae62b71be9a3
};


$parcel$exportWildcard($3ae11dbdad4aeba4$exports, $12585369b146a620$exports);
$parcel$exportWildcard($3ae11dbdad4aeba4$exports, $d24388e2d67487a6$exports);




var $157004a5da0b1090$exports = {};
var $25277333c3fbbb04$exports = {};

$parcel$defineInteropFlag($25277333c3fbbb04$exports);

$parcel$export($25277333c3fbbb04$exports, "hasProp", () => $25277333c3fbbb04$export$dd642ef726dcde21);
$parcel$export($25277333c3fbbb04$exports, "deepCopy", () => $25277333c3fbbb04$export$6c40052bed430212);
$parcel$export($25277333c3fbbb04$exports, "default", () => $25277333c3fbbb04$export$2e2bcd8739ae039);
const $25277333c3fbbb04$export$dd642ef726dcde21 = (obj, prop)=>{
    return Object.prototype.hasOwnProperty.call(obj, prop);
};
const $25277333c3fbbb04$export$6c40052bed430212 = (obj)=>{
    return JSON.parse(JSON.stringify(obj));
};
var $25277333c3fbbb04$export$2e2bcd8739ae039 = {
    hasProp: $25277333c3fbbb04$export$dd642ef726dcde21,
    deepCopy: $25277333c3fbbb04$export$6c40052bed430212
};


$parcel$exportWildcard($157004a5da0b1090$exports, $25277333c3fbbb04$exports);


var $ac57c60e5e8d706c$exports = {};
var $6b0827ead5f0e19b$exports = {};


var $38d44dc55b7fadbf$exports = {};

$parcel$defineInteropFlag($38d44dc55b7fadbf$exports);

$parcel$export($38d44dc55b7fadbf$exports, "getPages", () => $38d44dc55b7fadbf$export$f4348e32a399a3d5);
$parcel$export($38d44dc55b7fadbf$exports, "default", () => $38d44dc55b7fadbf$export$2e2bcd8739ae039);


const $38d44dc55b7fadbf$export$f4348e32a399a3d5 = (project)=>{
    if (!project.modules) return {
        error: true,
        message: 'manifest has no modules'
    };
    const data = [];
    project.modules.forEach((module, mIdx)=>{
        if (!module.lessons || !module.lessons.length) return;
        module.lessons.forEach((lesson, lIdx)=>{
            if (!lesson.slides || !lesson.slides.length) return;
            data.push({
                moduleId: mIdx,
                moduleName: module.name,
                id: lIdx,
                name: lesson.name,
                url: `/module-${mIdx}--lesson-${lIdx}`,
                Element: ()=>{
                    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("div", {
                        children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("h1", {
                            children: lesson.name
                        })
                    });
                }
            });
        });
    });
    return {
        error: false,
        data: data
    };
};
var $38d44dc55b7fadbf$export$2e2bcd8739ae039 = {
    getPages: $38d44dc55b7fadbf$export$f4348e32a399a3d5
};


$parcel$exportWildcard($ac57c60e5e8d706c$exports, $6b0827ead5f0e19b$exports);
$parcel$exportWildcard($ac57c60e5e8d706c$exports, $38d44dc55b7fadbf$exports);








const $b453328758bf1810$export$3565eb3d00ca5a74 = ({ config: config  })=>{
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsxs($c5RZX$reactrouterdom.Routes, {
        children: [
            config.map((page, idx)=>{
                return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$reactrouterdom.Route, {
                    path: `${page.url}`,
                    element: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx(page.Element, {})
                }, idx);
            }),
            /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$reactrouterdom.Route, {
                path: "*",
                element: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$reactrouterdom.Navigate, {
                    to: config[0].url
                })
            })
        ]
    });
};
var $b453328758bf1810$export$2e2bcd8739ae039 = {
    Routes: $b453328758bf1810$export$3565eb3d00ca5a74
};




const $7fbf2bc6c6c20081$export$86fbec116b87613f = ()=>{
    const runtime = window.__SCROWL_RUNTIME;
    if (runtime) {
        const startRes = runtime.start();
        if (startRes.error) // root.render(<Error msg={startRes.message} />);
        console.error(`starting error: ${startRes.message}`);
    }
    const manifestRes = $3ae11dbdad4aeba4$exports.get();
    if (manifestRes.error) return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($e6b798ebc8cce9cc$export$edf27be85e5f6da0, {
        msg: manifestRes.message
    });
    if (!manifestRes.data) return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($e6b798ebc8cce9cc$export$edf27be85e5f6da0, {
        msg: "Manifest does not have data"
    });
    let manifest = manifestRes.data;
    if (typeof manifest === 'string') manifest = JSON.parse(manifest);
    const pageRes = $ac57c60e5e8d706c$exports.getPages(manifest);
    if (pageRes.error) return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($e6b798ebc8cce9cc$export$edf27be85e5f6da0, {
        msg: pageRes.message
    });
    if (!pageRes.data || !pageRes.data.length) return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($e6b798ebc8cce9cc$export$edf27be85e5f6da0, {
        msg: "Project has no pages"
    });
    const pageConfig = pageRes.data;
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$reactrouterdom.HashRouter, {
        children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsxs("div", {
            className: $31a7195d5fab3e13$export$729c8b7179294ba,
            children: [
                /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($2b59d89ef66bc0a3$export$5beeae30d1389e5, {
                    config: pageConfig
                }),
                /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("main", {
                    className: $31a7195d5fab3e13$export$f6cadf447928a533,
                    children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($b453328758bf1810$export$3565eb3d00ca5a74, {
                        config: pageConfig
                    })
                })
            ]
        })
    });
};
var $7fbf2bc6c6c20081$export$2e2bcd8739ae039 = {
    App: $7fbf2bc6c6c20081$export$86fbec116b87613f
};


$parcel$exportWildcard($c67a19b186f1582a$exports, $7fbf2bc6c6c20081$exports);


var $a9ee52bad7ecc66a$exports = {};
var $7d5b0edef906e8ad$exports = {};


var $e6b798ebc8cce9cc$exports = {};

$parcel$defineInteropFlag($e6b798ebc8cce9cc$exports);

$parcel$export($e6b798ebc8cce9cc$exports, "Error", () => $e6b798ebc8cce9cc$export$edf27be85e5f6da0);
$parcel$export($e6b798ebc8cce9cc$exports, "default", () => $e6b798ebc8cce9cc$export$2e2bcd8739ae039);


const $e6b798ebc8cce9cc$export$edf27be85e5f6da0 = (props)=>{
    const { msg: msg  } = props;
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsxs("div", {
        children: [
            /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("h1", {
                children: "Error"
            }),
            /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("p", {
                children: msg
            })
        ]
    });
};
var $e6b798ebc8cce9cc$export$2e2bcd8739ae039 = {
    Error: $e6b798ebc8cce9cc$export$edf27be85e5f6da0
};


$parcel$exportWildcard($a9ee52bad7ecc66a$exports, $7d5b0edef906e8ad$exports);
$parcel$exportWildcard($a9ee52bad7ecc66a$exports, $e6b798ebc8cce9cc$exports);


var $499ac68a7f786f27$exports = {};
var $14761769d08fb2b0$exports = {};


var $906f9f84353bcce2$exports = {};

$parcel$defineInteropFlag($906f9f84353bcce2$exports);

$parcel$export($906f9f84353bcce2$exports, "Slide", () => $906f9f84353bcce2$export$d8dc01b5c85a37b9);
$parcel$export($906f9f84353bcce2$exports, "default", () => $906f9f84353bcce2$export$2e2bcd8739ae039);


var $4a639da7743220cc$export$c1742949d0193489;
$4a639da7743220cc$export$c1742949d0193489 = "slide";



const $906f9f84353bcce2$var$aspectRatios = {
    '4:3': {
        label: 'Standard 4:3',
        width: 1920,
        height: 1440
    },
    '16:9': {
        label: 'Widescreen 16:9',
        width: 1920,
        height: 1080
    },
    '16:10': {
        label: 'Widescreen 16:10',
        width: 1920,
        height: 1200
    }
};
const $906f9f84353bcce2$export$d8dc01b5c85a37b9 = ({ children: children , className: className , options: options , style: style  })=>{
    const cssClasses = className ? `${$4a639da7743220cc$export$c1742949d0193489} ${className}` : `${$4a639da7743220cc$export$c1742949d0193489}`;
    const ratio = options.aspect && $157004a5da0b1090$exports.hasProp($906f9f84353bcce2$var$aspectRatios, options.aspect) ? options.aspect : '16:9';
    const aspect = $906f9f84353bcce2$var$aspectRatios[ratio];
    const slideStyle = Object.assign(style ? $157004a5da0b1090$exports.deepCopy(style) : {}, {
        width: `${aspect.width}px`,
        height: `${aspect.height}px`
    });
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("div", {
        className: cssClasses,
        style: slideStyle,
        children: children
    });
};
var $906f9f84353bcce2$export$2e2bcd8739ae039 = {
    Slide: $906f9f84353bcce2$export$d8dc01b5c85a37b9
};


$parcel$exportWildcard($499ac68a7f786f27$exports, $14761769d08fb2b0$exports);
$parcel$exportWildcard($499ac68a7f786f27$exports, $906f9f84353bcce2$exports);


var $1d513fd46b8b7e22$exports = {};
var $b0533871ba2d88bd$exports = {};


var $2b59d89ef66bc0a3$exports = {};

$parcel$defineInteropFlag($2b59d89ef66bc0a3$exports);

$parcel$export($2b59d89ef66bc0a3$exports, "Outline", () => $2b59d89ef66bc0a3$export$5beeae30d1389e5);
$parcel$export($2b59d89ef66bc0a3$exports, "default", () => $2b59d89ef66bc0a3$export$2e2bcd8739ae039);







var $a3f9805fb22ca6dd$export$80e4b313e5e6b30d;
var $a3f9805fb22ca6dd$export$f91427ed400cf646;
var $a3f9805fb22ca6dd$export$fc36764bd7bec3e8;
var $a3f9805fb22ca6dd$export$da9553d3db930185;
var $a3f9805fb22ca6dd$export$ff0c8eecf5de586a;
var $a3f9805fb22ca6dd$export$ee30335ba9608a;
var $a3f9805fb22ca6dd$export$373590c234222a27;
var $a3f9805fb22ca6dd$export$a68361e11c0e26bb;
var $a3f9805fb22ca6dd$export$11d56bc7f356c3ab;
var $a3f9805fb22ca6dd$export$d8ec543b124f99bb;
var $a3f9805fb22ca6dd$export$be374168c717555a;
var $a3f9805fb22ca6dd$export$5ffa98f5e39b7953;
var $a3f9805fb22ca6dd$export$40d884b4bc2443e0;
var $a3f9805fb22ca6dd$export$3a64aac218809531;
var $a3f9805fb22ca6dd$export$e12a7e60645f3512;
var $a3f9805fb22ca6dd$export$9397b961b963c0ef;
var $a3f9805fb22ca6dd$export$e70cf296a07db7a6;
var $a3f9805fb22ca6dd$export$45ca8ffe23059ad9;
var $a3f9805fb22ca6dd$export$864ed75129e052b4;
var $a3f9805fb22ca6dd$export$ba0e3d50b55e781f;
var $a3f9805fb22ca6dd$export$fa3754856145d548;
var $a3f9805fb22ca6dd$export$7fe1c01b339ef5cd;
var $a3f9805fb22ca6dd$export$e61aa1e86c2900d6;
$a3f9805fb22ca6dd$export$80e4b313e5e6b30d = "nav";
$a3f9805fb22ca6dd$export$f91427ed400cf646 = "tree-view__header";
$a3f9805fb22ca6dd$export$fc36764bd7bec3e8 = "tree-view__header";
$a3f9805fb22ca6dd$export$da9553d3db930185 = "owlui-dropdown-toggle";
$a3f9805fb22ca6dd$export$ff0c8eecf5de586a = "owlui-dropdown-toggle";
$a3f9805fb22ca6dd$export$ee30335ba9608a = "tree-view__item";
$a3f9805fb22ca6dd$export$373590c234222a27 = "tree-view__item";
$a3f9805fb22ca6dd$export$a68361e11c0e26bb = "module-icons";
$a3f9805fb22ca6dd$export$11d56bc7f356c3ab = "module-icons";
$a3f9805fb22ca6dd$export$d8ec543b124f99bb = "lesson-icons";
$a3f9805fb22ca6dd$export$be374168c717555a = "lesson-icons";
$a3f9805fb22ca6dd$export$5ffa98f5e39b7953 = "tree-view__item__icon--handle";
$a3f9805fb22ca6dd$export$40d884b4bc2443e0 = "tree-view__item__icon--handle";
$a3f9805fb22ca6dd$export$3a64aac218809531 = "tree-view__item__icon";
$a3f9805fb22ca6dd$export$e12a7e60645f3512 = "tree-view__item__icon";
$a3f9805fb22ca6dd$export$9397b961b963c0ef = "tree-view__item__icon--detail";
$a3f9805fb22ca6dd$export$e70cf296a07db7a6 = "tree-view__item__icon--detail";
$a3f9805fb22ca6dd$export$45ca8ffe23059ad9 = "tree-view__item__label";
$a3f9805fb22ca6dd$export$864ed75129e052b4 = "tree-view__item__label";
$a3f9805fb22ca6dd$export$ba0e3d50b55e781f = "tree-view--module";
$a3f9805fb22ca6dd$export$fa3754856145d548 = "tree-view--module";
$a3f9805fb22ca6dd$export$7fe1c01b339ef5cd = "tree-view--lesson";
$a3f9805fb22ca6dd$export$e61aa1e86c2900d6 = "tree-view--lesson";








const $e74be0595a06d795$export$8ac254ae510b04b0 = ({ config: config , idx: idx  })=>{
    const [open, setOpen] = $c5RZX$react.useState(true);
    const itemId = `tree-item-module-${idx}-item`;
    const menuId = `tree-item-module-${idx}-menu`;
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsxs("div", {
        className: $a3f9805fb22ca6dd$export$fa3754856145d548,
        children: [
            /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("div", {
                className: $a3f9805fb22ca6dd$export$fc36764bd7bec3e8,
                children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$owluilib.Button, {
                    id: itemId,
                    "aria-expanded": open,
                    "aria-controls": menuId,
                    className: $a3f9805fb22ca6dd$export$373590c234222a27,
                    onClick: ()=>setOpen(!open)
                    ,
                    variant: "link",
                    children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsxs("div", {
                        className: "module-icons",
                        children: [
                            /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("span", {
                                className: $a3f9805fb22ca6dd$export$40d884b4bc2443e0,
                                children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$owluilib.Icon, {
                                    icon: "arrow_drop_down",
                                    display: "outlined",
                                    filled: true,
                                    style: {
                                        fontSize: '1.375rem'
                                    }
                                })
                            }),
                            /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("span", {
                                className: $a3f9805fb22ca6dd$export$e70cf296a07db7a6,
                                children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$owluilib.Icon, {
                                    icon: "folder",
                                    display: "outlined",
                                    filled: open
                                })
                            }),
                            /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("span", {
                                className: $a3f9805fb22ca6dd$export$864ed75129e052b4,
                                children: config.name
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$reactbootstrap.Collapse, {
                in: open,
                children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("div", {
                    className: "nav flex-column",
                    id: menuId,
                    children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($d412debe65f8235b$export$ce4f5213804e8d1e, {
                        config: config.lessons,
                        moduleIdx: idx
                    })
                })
            })
        ]
    }, idx);
};
var $e74be0595a06d795$export$2e2bcd8739ae039 = {
    NavModule: $e74be0595a06d795$export$8ac254ae510b04b0
};






const $d412debe65f8235b$export$2607965bc6070427 = ({ config: config , idx: idx  })=>{
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("div", {
        className: $a3f9805fb22ca6dd$export$e61aa1e86c2900d6,
        children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsxs("div", {
            className: $a3f9805fb22ca6dd$export$fc36764bd7bec3e8,
            children: [
                /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("span", {
                    className: $a3f9805fb22ca6dd$export$e70cf296a07db7a6,
                    children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$owluilib.Icon, {
                        icon: "interests",
                        display: "outlined"
                    })
                }),
                /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("span", {
                    className: $a3f9805fb22ca6dd$export$864ed75129e052b4,
                    children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("a", {
                        href: `#${config.url}`,
                        children: config.name
                    })
                })
            ]
        })
    }, idx);
};
const $d412debe65f8235b$export$ce4f5213804e8d1e = ({ config: config , moduleIdx: moduleIdx  })=>{
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$reactjsxruntime.Fragment, {
        children: config.map((lesson, idx)=>{
            return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($d412debe65f8235b$export$2607965bc6070427, {
                moduleIdx: moduleIdx,
                idx: idx,
                config: lesson
            }, idx);
        })
    });
};
var $d412debe65f8235b$export$2e2bcd8739ae039 = {
    NavLessons: $d412debe65f8235b$export$ce4f5213804e8d1e
};




const $9d63cbcdfe995d27$export$9fb93abafa4ff69b = ({ config: config  })=>{
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("div", {
        className: $a3f9805fb22ca6dd$export$80e4b313e5e6b30d,
        children: config.map((def, mIdx)=>{
            return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($e74be0595a06d795$export$8ac254ae510b04b0, {
                idx: mIdx,
                config: def
            }, mIdx);
        })
    });
};
var $9d63cbcdfe995d27$export$2e2bcd8739ae039 = {
    TabNav: $9d63cbcdfe995d27$export$9fb93abafa4ff69b
};






const $2b59d89ef66bc0a3$var$toModuleFormat = (config)=>{
    const dict = {};
    config.forEach((def)=>{
        if (!$157004a5da0b1090$exports.hasProp(dict, def.moduleName)) dict[def.moduleName] = [];
        dict[def.moduleName].push(def);
    });
    return Object.keys(dict).map((name)=>{
        return {
            name: name,
            lessons: dict[name]
        };
    });
};
const $2b59d89ef66bc0a3$export$5beeae30d1389e5 = ({ config: config  })=>{
    const fConfig = $2b59d89ef66bc0a3$var$toModuleFormat(config);
    const tabItems = [
        {
            id: '1',
            title: 'Outline',
            view: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($9d63cbcdfe995d27$export$9fb93abafa4ff69b, {
                config: fConfig
            })
        }, 
    ];
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($80d36a326df24276$export$fd2e1a4921eb839b, {
        children: /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx($c5RZX$owluilib.Tabs, {
            items: tabItems,
            pxScale: "Sm"
        })
    });
};
var $2b59d89ef66bc0a3$export$2e2bcd8739ae039 = {
    Outline: $2b59d89ef66bc0a3$export$5beeae30d1389e5
};


$parcel$exportWildcard($1d513fd46b8b7e22$exports, $b0533871ba2d88bd$exports);
$parcel$exportWildcard($1d513fd46b8b7e22$exports, $2b59d89ef66bc0a3$exports);


var $ce3244dd721153b7$exports = {};
var $d9c1bc43b1ed66bf$exports = {};


var $80d36a326df24276$exports = {};

$parcel$defineInteropFlag($80d36a326df24276$exports);

$parcel$export($80d36a326df24276$exports, "Pane", () => $80d36a326df24276$export$fd2e1a4921eb839b);
$parcel$export($80d36a326df24276$exports, "default", () => $80d36a326df24276$export$2e2bcd8739ae039);


var $7686f2da335c8a33$export$f243eef9be5f65fb;
var $7686f2da335c8a33$export$718f7791aa978d39;
var $7686f2da335c8a33$export$b2c3c93d3bc013e6;
var $7686f2da335c8a33$export$6e5bb584860ae26e;
var $7686f2da335c8a33$export$45c3922f2c33b499;
var $7686f2da335c8a33$export$b64547cc1e24b050;
var $7686f2da335c8a33$export$f4fbc5dab7e9c2fe;
var $7686f2da335c8a33$export$e4f3210edf200c06;
var $7686f2da335c8a33$export$6b0dde39a13c1375;
var $7686f2da335c8a33$export$7861f4f95f7f8ffd;
var $7686f2da335c8a33$export$15e0660759c7d368;
var $7686f2da335c8a33$export$12167b8286af4779;
var $7686f2da335c8a33$export$1a18d209072e2b36;
var $7686f2da335c8a33$export$aef7cc01204227fd;
var $7686f2da335c8a33$export$6dff30574f79a202;
var $7686f2da335c8a33$export$7f506c70190d2dd3;
var $7686f2da335c8a33$export$610665bf6d31ae2;
var $7686f2da335c8a33$export$49448bd48caf99b3;
var $7686f2da335c8a33$export$7582047f07f09982;
$7686f2da335c8a33$export$f243eef9be5f65fb = "pane--left";
$7686f2da335c8a33$export$718f7791aa978d39 = "pane--left";
$7686f2da335c8a33$export$b2c3c93d3bc013e6 = "pane--left__header";
$7686f2da335c8a33$export$6e5bb584860ae26e = "pane--left__header";
$7686f2da335c8a33$export$45c3922f2c33b499 = "pane--left__content";
$7686f2da335c8a33$export$b64547cc1e24b050 = "pane--left__content";
$7686f2da335c8a33$export$f4fbc5dab7e9c2fe = "pane--right";
$7686f2da335c8a33$export$e4f3210edf200c06 = "pane--right";
$7686f2da335c8a33$export$6b0dde39a13c1375 = "pane--right__header";
$7686f2da335c8a33$export$7861f4f95f7f8ffd = "pane--right__header";
$7686f2da335c8a33$export$15e0660759c7d368 = "pane--right__content";
$7686f2da335c8a33$export$12167b8286af4779 = "pane--right__content";
$7686f2da335c8a33$export$1a18d209072e2b36 = "pane__heading";
$7686f2da335c8a33$export$aef7cc01204227fd = "pane__heading";
$7686f2da335c8a33$export$6dff30574f79a202 = "pane";
$7686f2da335c8a33$export$7f506c70190d2dd3 = "owlui-nav-tabs";
$7686f2da335c8a33$export$610665bf6d31ae2 = "owlui-nav-tabs";
$7686f2da335c8a33$export$49448bd48caf99b3 = "owlui-tab-pane";
$7686f2da335c8a33$export$7582047f07f09982 = "owlui-tab-pane";


const $80d36a326df24276$export$fd2e1a4921eb839b = ({ children: children , className: className , side: side  })=>{
    let paneStyles = `${$7686f2da335c8a33$export$6dff30574f79a202}`;
    if (className) paneStyles += className;
    paneStyles += ` ${$7686f2da335c8a33$export$718f7791aa978d39}`;
    return /*#__PURE__*/ $c5RZX$reactjsxruntime.jsx("div", {
        className: paneStyles,
        children: children
    });
};
var $80d36a326df24276$export$2e2bcd8739ae039 = {
    Pane: $80d36a326df24276$export$fd2e1a4921eb839b
};


$parcel$exportWildcard($ce3244dd721153b7$exports, $d9c1bc43b1ed66bf$exports);
$parcel$exportWildcard($ce3244dd721153b7$exports, $80d36a326df24276$exports);


$parcel$exportWildcard(module.exports, $c67a19b186f1582a$exports);
$parcel$exportWildcard(module.exports, $a9ee52bad7ecc66a$exports);
$parcel$exportWildcard(module.exports, $499ac68a7f786f27$exports);
$parcel$exportWildcard(module.exports, $1d513fd46b8b7e22$exports);
$parcel$exportWildcard(module.exports, $ce3244dd721153b7$exports);


//# sourceMappingURL=scrowl.player.js.map
