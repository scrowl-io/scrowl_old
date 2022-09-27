import {jsx as $bvorl$jsx, jsxs as $bvorl$jsxs, Fragment as $bvorl$Fragment} from "react/jsx-runtime";
import {useState as $bvorl$useState} from "react";
import {HashRouter as $bvorl$HashRouter, Routes as $bvorl$Routes, Route as $bvorl$Route, Navigate as $bvorl$Navigate} from "react-router-dom";
import {Tabs as $bvorl$Tabs, Button as $bvorl$Button, Icon as $bvorl$Icon} from "@owlui/lib";
import {Collapse as $bvorl$Collapse} from "react-bootstrap";
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
var $59d51f57c7b47aca$exports = {};
var $97d50e48d778806e$exports = {};
$parcel$defineInteropFlag($97d50e48d778806e$exports);
$parcel$export($97d50e48d778806e$exports, "App", () => $97d50e48d778806e$export$86fbec116b87613f);
$parcel$export($97d50e48d778806e$exports, "default", () => $97d50e48d778806e$export$2e2bcd8739ae039);
var $3d2763135302bec6$export$729c8b7179294ba;
var $3d2763135302bec6$export$21813e8ba15b8006;
var $3d2763135302bec6$export$f6cadf447928a533;
$3d2763135302bec6$export$729c8b7179294ba = "app";
$3d2763135302bec6$export$21813e8ba15b8006 = "app-main";
$3d2763135302bec6$export$f6cadf447928a533 = "app-main";
var $d642e97d04049949$exports = {};
var $a8e8791141945996$exports = {};
var $5865319cfd80dd9d$exports = {};
$parcel$defineInteropFlag($5865319cfd80dd9d$exports);
$parcel$export($5865319cfd80dd9d$exports, "get", () => $5865319cfd80dd9d$export$3988ae62b71be9a3);
$parcel$export($5865319cfd80dd9d$exports, "default", () => $5865319cfd80dd9d$export$2e2bcd8739ae039);
const $5865319cfd80dd9d$export$3988ae62b71be9a3 = ()=>{
    if (!window.__SCROWL_MANIFEST) return {
        error: true,
        message: 'Unable to find project manifest'
    };
    else return {
        error: false,
        data: window.__SCROWL_MANIFEST
    };
};
var $5865319cfd80dd9d$export$2e2bcd8739ae039 = {
    get: $5865319cfd80dd9d$export$3988ae62b71be9a3
};
$parcel$exportWildcard($d642e97d04049949$exports, $a8e8791141945996$exports);
$parcel$exportWildcard($d642e97d04049949$exports, $5865319cfd80dd9d$exports);
var $cec4a3db39924dc6$exports = {};
var $c48e9052882e731f$exports = {};
$parcel$defineInteropFlag($c48e9052882e731f$exports);
$parcel$export($c48e9052882e731f$exports, "hasProp", () => $c48e9052882e731f$export$dd642ef726dcde21);
$parcel$export($c48e9052882e731f$exports, "deepCopy", () => $c48e9052882e731f$export$6c40052bed430212);
$parcel$export($c48e9052882e731f$exports, "default", () => $c48e9052882e731f$export$2e2bcd8739ae039);
const $c48e9052882e731f$export$dd642ef726dcde21 = (obj, prop)=>{
    return Object.prototype.hasOwnProperty.call(obj, prop);
};
const $c48e9052882e731f$export$6c40052bed430212 = (obj)=>{
    return JSON.parse(JSON.stringify(obj));
};
var $c48e9052882e731f$export$2e2bcd8739ae039 = {
    hasProp: $c48e9052882e731f$export$dd642ef726dcde21,
    deepCopy: $c48e9052882e731f$export$6c40052bed430212
};
$parcel$exportWildcard($cec4a3db39924dc6$exports, $c48e9052882e731f$exports);
var $a0d8f6ad4094a27b$exports = {};
var $22ad27703ade1c8b$exports = {};
var $cff7a0b2de5f1fe0$exports = {};
$parcel$defineInteropFlag($cff7a0b2de5f1fe0$exports);
$parcel$export($cff7a0b2de5f1fe0$exports, "getPages", () => $cff7a0b2de5f1fe0$export$f4348e32a399a3d5);
$parcel$export($cff7a0b2de5f1fe0$exports, "default", () => $cff7a0b2de5f1fe0$export$2e2bcd8739ae039);
const $cff7a0b2de5f1fe0$export$f4348e32a399a3d5 = (project)=>{
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
                Element: ({ templateList: templateList  })=>{
                    return /*#__PURE__*/ $bvorl$jsx("div", {
                        children: /*#__PURE__*/ $bvorl$jsxs($bvorl$Fragment, {
                            children: [
                                /*#__PURE__*/ $bvorl$jsx("h1", {
                                    children: lesson.name
                                }),
                                lesson.slides.map((slide)=>{
                                    let Template;
                                    if (!slide.template) return;
                                    const manifest = slide.template?.elements;
                                    if (!manifest) return;
                                    if (templateList && templateList[slide.template.meta.component]) Template = templateList[slide.template.meta.component];
                                    if (!Template) return;
                                    return /*#__PURE__*/ $bvorl$jsx(Template, {
                                        manifest: manifest
                                    });
                                })
                            ]
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
var $cff7a0b2de5f1fe0$export$2e2bcd8739ae039 = {
    getPages: $cff7a0b2de5f1fe0$export$f4348e32a399a3d5
};
$parcel$exportWildcard($a0d8f6ad4094a27b$exports, $22ad27703ade1c8b$exports);
$parcel$exportWildcard($a0d8f6ad4094a27b$exports, $cff7a0b2de5f1fe0$exports);
const $a911700ead652be9$export$3565eb3d00ca5a74 = ({ config: config , templateList: templateList  })=>{
    return /*#__PURE__*/ $bvorl$jsxs($bvorl$Routes, {
        children: [
            config.map((page, idx)=>{
                return /*#__PURE__*/ $bvorl$jsx($bvorl$Route, {
                    path: `${page.url}`,
                    element: /*#__PURE__*/ $bvorl$jsx(page.Element, {
                        templateList: templateList
                    })
                }, idx);
            }),
            /*#__PURE__*/ $bvorl$jsx($bvorl$Route, {
                path: "*",
                element: /*#__PURE__*/ $bvorl$jsx($bvorl$Navigate, {
                    to: config[0].url
                })
            })
        ]
    });
};
var $a911700ead652be9$export$2e2bcd8739ae039 = {
    Routes: $a911700ead652be9$export$3565eb3d00ca5a74
};
const $97d50e48d778806e$export$86fbec116b87613f = ({ templateList: templateList  })=>{
    const runtime = window.__SCROWL_RUNTIME;
    if (runtime) {
        const startRes = runtime.start();
        if (startRes.error) // root.render(<Error msg={startRes.message} />);
        console.error(`starting error: ${startRes.message}`);
    }
    const manifestRes = $d642e97d04049949$exports.get();
    if (manifestRes.error) return /*#__PURE__*/ $bvorl$jsx($467d66ed0bb94ad0$export$edf27be85e5f6da0, {
        msg: manifestRes.message
    });
    if (!manifestRes.data) return /*#__PURE__*/ $bvorl$jsx($467d66ed0bb94ad0$export$edf27be85e5f6da0, {
        msg: "Manifest does not have data"
    });
    let manifest = manifestRes.data;
    if (typeof manifest === 'string') manifest = JSON.parse(manifest);
    const pageRes = $a0d8f6ad4094a27b$exports.getPages(manifest);
    if (pageRes.error) return /*#__PURE__*/ $bvorl$jsx($467d66ed0bb94ad0$export$edf27be85e5f6da0, {
        msg: pageRes.message
    });
    if (!pageRes.data || !pageRes.data.length) return /*#__PURE__*/ $bvorl$jsx($467d66ed0bb94ad0$export$edf27be85e5f6da0, {
        msg: "Project has no pages"
    });
    const pageConfig = pageRes.data;
    return /*#__PURE__*/ $bvorl$jsx($bvorl$HashRouter, {
        children: /*#__PURE__*/ $bvorl$jsxs("div", {
            className: $3d2763135302bec6$export$729c8b7179294ba,
            children: [
                /*#__PURE__*/ $bvorl$jsx($1911174de1b1157d$export$5beeae30d1389e5, {
                    config: pageConfig
                }),
                /*#__PURE__*/ $bvorl$jsx("main", {
                    className: $3d2763135302bec6$export$f6cadf447928a533,
                    children: /*#__PURE__*/ $bvorl$jsx($a911700ead652be9$export$3565eb3d00ca5a74, {
                        config: pageConfig,
                        templateList: templateList
                    })
                })
            ]
        })
    });
};
var $97d50e48d778806e$export$2e2bcd8739ae039 = {
    App: $97d50e48d778806e$export$86fbec116b87613f
};
$parcel$exportWildcard($59d51f57c7b47aca$exports, $97d50e48d778806e$exports);
var $7fce73e32daa5714$exports = {};
var $e8fe94342501cd8c$exports = {};
var $467d66ed0bb94ad0$exports = {};
$parcel$defineInteropFlag($467d66ed0bb94ad0$exports);
$parcel$export($467d66ed0bb94ad0$exports, "Error", () => $467d66ed0bb94ad0$export$edf27be85e5f6da0);
$parcel$export($467d66ed0bb94ad0$exports, "default", () => $467d66ed0bb94ad0$export$2e2bcd8739ae039);
const $467d66ed0bb94ad0$export$edf27be85e5f6da0 = (props)=>{
    const { msg: msg  } = props;
    return /*#__PURE__*/ $bvorl$jsxs("div", {
        children: [
            /*#__PURE__*/ $bvorl$jsx("h1", {
                children: "Error"
            }),
            /*#__PURE__*/ $bvorl$jsx("p", {
                children: msg
            })
        ]
    });
};
var $467d66ed0bb94ad0$export$2e2bcd8739ae039 = {
    Error: $467d66ed0bb94ad0$export$edf27be85e5f6da0
};
$parcel$exportWildcard($7fce73e32daa5714$exports, $e8fe94342501cd8c$exports);
$parcel$exportWildcard($7fce73e32daa5714$exports, $467d66ed0bb94ad0$exports);
var $2ca7e2894c164a4b$exports = {};
var $e7d61bcf0a3dfa45$exports = {};
var $7da050e5dc1a885d$exports = {};
$parcel$defineInteropFlag($7da050e5dc1a885d$exports);
$parcel$export($7da050e5dc1a885d$exports, "Slide", () => $7da050e5dc1a885d$export$d8dc01b5c85a37b9);
$parcel$export($7da050e5dc1a885d$exports, "default", () => $7da050e5dc1a885d$export$2e2bcd8739ae039);
var $70882c1f95c290bb$export$c1742949d0193489;
$70882c1f95c290bb$export$c1742949d0193489 = "slide";
const $7da050e5dc1a885d$var$aspectRatios = {
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
const $7da050e5dc1a885d$export$d8dc01b5c85a37b9 = ({ children: children , className: className , options: options , style: style  })=>{
    const cssClasses = className ? `${$70882c1f95c290bb$export$c1742949d0193489} ${className}` : `${$70882c1f95c290bb$export$c1742949d0193489}`;
    const ratio = options.aspect && $cec4a3db39924dc6$exports.hasProp($7da050e5dc1a885d$var$aspectRatios, options.aspect) ? options.aspect : '16:9';
    const aspect = $7da050e5dc1a885d$var$aspectRatios[ratio];
    const slideStyle = Object.assign(style ? $cec4a3db39924dc6$exports.deepCopy(style) : {}, {
        width: `${aspect.width}px`,
        height: `${aspect.height}px`
    });
    return /*#__PURE__*/ $bvorl$jsx("div", {
        className: cssClasses,
        style: slideStyle,
        children: children
    });
};
var $7da050e5dc1a885d$export$2e2bcd8739ae039 = {
    Slide: $7da050e5dc1a885d$export$d8dc01b5c85a37b9
};
$parcel$exportWildcard($2ca7e2894c164a4b$exports, $e7d61bcf0a3dfa45$exports);
$parcel$exportWildcard($2ca7e2894c164a4b$exports, $7da050e5dc1a885d$exports);
var $d037cec02cd49167$exports = {};
var $c49ceda919745082$exports = {};
var $1911174de1b1157d$exports = {};
$parcel$defineInteropFlag($1911174de1b1157d$exports);
$parcel$export($1911174de1b1157d$exports, "Outline", () => $1911174de1b1157d$export$5beeae30d1389e5);
$parcel$export($1911174de1b1157d$exports, "default", () => $1911174de1b1157d$export$2e2bcd8739ae039);
var $1550644884f0c301$export$80e4b313e5e6b30d;
var $1550644884f0c301$export$f91427ed400cf646;
var $1550644884f0c301$export$fc36764bd7bec3e8;
var $1550644884f0c301$export$da9553d3db930185;
var $1550644884f0c301$export$ff0c8eecf5de586a;
var $1550644884f0c301$export$ee30335ba9608a;
var $1550644884f0c301$export$373590c234222a27;
var $1550644884f0c301$export$a68361e11c0e26bb;
var $1550644884f0c301$export$11d56bc7f356c3ab;
var $1550644884f0c301$export$d8ec543b124f99bb;
var $1550644884f0c301$export$be374168c717555a;
var $1550644884f0c301$export$5ffa98f5e39b7953;
var $1550644884f0c301$export$40d884b4bc2443e0;
var $1550644884f0c301$export$3a64aac218809531;
var $1550644884f0c301$export$e12a7e60645f3512;
var $1550644884f0c301$export$9397b961b963c0ef;
var $1550644884f0c301$export$e70cf296a07db7a6;
var $1550644884f0c301$export$45ca8ffe23059ad9;
var $1550644884f0c301$export$864ed75129e052b4;
var $1550644884f0c301$export$ba0e3d50b55e781f;
var $1550644884f0c301$export$fa3754856145d548;
var $1550644884f0c301$export$7fe1c01b339ef5cd;
var $1550644884f0c301$export$e61aa1e86c2900d6;
$1550644884f0c301$export$80e4b313e5e6b30d = "nav";
$1550644884f0c301$export$f91427ed400cf646 = "tree-view__header";
$1550644884f0c301$export$fc36764bd7bec3e8 = "tree-view__header";
$1550644884f0c301$export$da9553d3db930185 = "owlui-dropdown-toggle";
$1550644884f0c301$export$ff0c8eecf5de586a = "owlui-dropdown-toggle";
$1550644884f0c301$export$ee30335ba9608a = "tree-view__item";
$1550644884f0c301$export$373590c234222a27 = "tree-view__item";
$1550644884f0c301$export$a68361e11c0e26bb = "module-icons";
$1550644884f0c301$export$11d56bc7f356c3ab = "module-icons";
$1550644884f0c301$export$d8ec543b124f99bb = "lesson-icons";
$1550644884f0c301$export$be374168c717555a = "lesson-icons";
$1550644884f0c301$export$5ffa98f5e39b7953 = "tree-view__item__icon--handle";
$1550644884f0c301$export$40d884b4bc2443e0 = "tree-view__item__icon--handle";
$1550644884f0c301$export$3a64aac218809531 = "tree-view__item__icon";
$1550644884f0c301$export$e12a7e60645f3512 = "tree-view__item__icon";
$1550644884f0c301$export$9397b961b963c0ef = "tree-view__item__icon--detail";
$1550644884f0c301$export$e70cf296a07db7a6 = "tree-view__item__icon--detail";
$1550644884f0c301$export$45ca8ffe23059ad9 = "tree-view__item__label";
$1550644884f0c301$export$864ed75129e052b4 = "tree-view__item__label";
$1550644884f0c301$export$ba0e3d50b55e781f = "tree-view--module";
$1550644884f0c301$export$fa3754856145d548 = "tree-view--module";
$1550644884f0c301$export$7fe1c01b339ef5cd = "tree-view--lesson";
$1550644884f0c301$export$e61aa1e86c2900d6 = "tree-view--lesson";
const $a514e2e9f4953fa4$export$8ac254ae510b04b0 = ({ config: config , idx: idx  })=>{
    const [open, setOpen] = $bvorl$useState(true);
    const itemId = `tree-item-module-${idx}-item`;
    const menuId = `tree-item-module-${idx}-menu`;
    return /*#__PURE__*/ $bvorl$jsxs("div", {
        className: $1550644884f0c301$export$fa3754856145d548,
        children: [
            /*#__PURE__*/ $bvorl$jsx("div", {
                className: $1550644884f0c301$export$fc36764bd7bec3e8,
                children: /*#__PURE__*/ $bvorl$jsx($bvorl$Button, {
                    id: itemId,
                    "aria-expanded": open,
                    "aria-controls": menuId,
                    className: $1550644884f0c301$export$373590c234222a27,
                    onClick: ()=>setOpen(!open)
                    ,
                    variant: "link",
                    children: /*#__PURE__*/ $bvorl$jsxs("div", {
                        className: "module-icons",
                        children: [
                            /*#__PURE__*/ $bvorl$jsx("span", {
                                className: $1550644884f0c301$export$40d884b4bc2443e0,
                                children: /*#__PURE__*/ $bvorl$jsx($bvorl$Icon, {
                                    icon: "arrow_drop_down",
                                    display: "outlined",
                                    filled: true,
                                    style: {
                                        fontSize: '1.375rem'
                                    }
                                })
                            }),
                            /*#__PURE__*/ $bvorl$jsx("span", {
                                className: $1550644884f0c301$export$e70cf296a07db7a6,
                                children: /*#__PURE__*/ $bvorl$jsx($bvorl$Icon, {
                                    icon: "folder",
                                    display: "outlined",
                                    filled: open
                                })
                            }),
                            /*#__PURE__*/ $bvorl$jsx("span", {
                                className: $1550644884f0c301$export$864ed75129e052b4,
                                children: config.name
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ $bvorl$jsx($bvorl$Collapse, {
                in: open,
                children: /*#__PURE__*/ $bvorl$jsx("div", {
                    className: "nav flex-column",
                    id: menuId,
                    children: /*#__PURE__*/ $bvorl$jsx($8bc095cab0b4398e$export$ce4f5213804e8d1e, {
                        config: config.lessons,
                        moduleIdx: idx
                    })
                })
            })
        ]
    }, idx);
};
var $a514e2e9f4953fa4$export$2e2bcd8739ae039 = {
    NavModule: $a514e2e9f4953fa4$export$8ac254ae510b04b0
};
const $8bc095cab0b4398e$export$2607965bc6070427 = ({ config: config , idx: idx  })=>{
    return /*#__PURE__*/ $bvorl$jsx("div", {
        className: $1550644884f0c301$export$e61aa1e86c2900d6,
        children: /*#__PURE__*/ $bvorl$jsxs("div", {
            className: $1550644884f0c301$export$fc36764bd7bec3e8,
            children: [
                /*#__PURE__*/ $bvorl$jsx("span", {
                    className: $1550644884f0c301$export$e70cf296a07db7a6,
                    children: /*#__PURE__*/ $bvorl$jsx($bvorl$Icon, {
                        icon: "interests",
                        display: "outlined"
                    })
                }),
                /*#__PURE__*/ $bvorl$jsx("span", {
                    className: $1550644884f0c301$export$864ed75129e052b4,
                    children: /*#__PURE__*/ $bvorl$jsx("a", {
                        href: `#${config.url}`,
                        children: config.name
                    })
                })
            ]
        })
    }, idx);
};
const $8bc095cab0b4398e$export$ce4f5213804e8d1e = ({ config: config , moduleIdx: moduleIdx  })=>{
    return /*#__PURE__*/ $bvorl$jsx($bvorl$Fragment, {
        children: config.map((lesson, idx)=>{
            return /*#__PURE__*/ $bvorl$jsx($8bc095cab0b4398e$export$2607965bc6070427, {
                moduleIdx: moduleIdx,
                idx: idx,
                config: lesson
            }, idx);
        })
    });
};
var $8bc095cab0b4398e$export$2e2bcd8739ae039 = {
    NavLessons: $8bc095cab0b4398e$export$ce4f5213804e8d1e
};
const $bccef95645a1a7fb$export$9fb93abafa4ff69b = ({ config: config  })=>{
    return /*#__PURE__*/ $bvorl$jsx("div", {
        className: $1550644884f0c301$export$80e4b313e5e6b30d,
        children: config.map((def, mIdx)=>{
            return /*#__PURE__*/ $bvorl$jsx($a514e2e9f4953fa4$export$8ac254ae510b04b0, {
                idx: mIdx,
                config: def
            }, mIdx);
        })
    });
};
var $bccef95645a1a7fb$export$2e2bcd8739ae039 = {
    TabNav: $bccef95645a1a7fb$export$9fb93abafa4ff69b
};
const $1911174de1b1157d$var$toModuleFormat = (config)=>{
    const dict = {};
    config.forEach((def)=>{
        if (!$cec4a3db39924dc6$exports.hasProp(dict, def.moduleName)) dict[def.moduleName] = [];
        dict[def.moduleName].push(def);
    });
    return Object.keys(dict).map((name)=>{
        return {
            name: name,
            lessons: dict[name]
        };
    });
};
const $1911174de1b1157d$export$5beeae30d1389e5 = ({ config: config  })=>{
    const fConfig = $1911174de1b1157d$var$toModuleFormat(config);
    const tabItems = [
        {
            id: '1',
            title: 'Outline',
            view: /*#__PURE__*/ $bvorl$jsx($bccef95645a1a7fb$export$9fb93abafa4ff69b, {
                config: fConfig
            })
        }, 
    ];
    return /*#__PURE__*/ $bvorl$jsx($3d4a40b33ce1b2c0$export$fd2e1a4921eb839b, {
        children: /*#__PURE__*/ $bvorl$jsx($bvorl$Tabs, {
            items: tabItems,
            pxScale: "Sm"
        })
    });
};
var $1911174de1b1157d$export$2e2bcd8739ae039 = {
    Outline: $1911174de1b1157d$export$5beeae30d1389e5
};
$parcel$exportWildcard($d037cec02cd49167$exports, $c49ceda919745082$exports);
$parcel$exportWildcard($d037cec02cd49167$exports, $1911174de1b1157d$exports);
var $dbb9e39c35dca45e$exports = {};
var $0395c30720e61dc9$exports = {};
var $3d4a40b33ce1b2c0$exports = {};
$parcel$defineInteropFlag($3d4a40b33ce1b2c0$exports);
$parcel$export($3d4a40b33ce1b2c0$exports, "Pane", () => $3d4a40b33ce1b2c0$export$fd2e1a4921eb839b);
$parcel$export($3d4a40b33ce1b2c0$exports, "default", () => $3d4a40b33ce1b2c0$export$2e2bcd8739ae039);
var $0785a38256fd80f2$export$f243eef9be5f65fb;
var $0785a38256fd80f2$export$718f7791aa978d39;
var $0785a38256fd80f2$export$b2c3c93d3bc013e6;
var $0785a38256fd80f2$export$6e5bb584860ae26e;
var $0785a38256fd80f2$export$45c3922f2c33b499;
var $0785a38256fd80f2$export$b64547cc1e24b050;
var $0785a38256fd80f2$export$f4fbc5dab7e9c2fe;
var $0785a38256fd80f2$export$e4f3210edf200c06;
var $0785a38256fd80f2$export$6b0dde39a13c1375;
var $0785a38256fd80f2$export$7861f4f95f7f8ffd;
var $0785a38256fd80f2$export$15e0660759c7d368;
var $0785a38256fd80f2$export$12167b8286af4779;
var $0785a38256fd80f2$export$1a18d209072e2b36;
var $0785a38256fd80f2$export$aef7cc01204227fd;
var $0785a38256fd80f2$export$6dff30574f79a202;
var $0785a38256fd80f2$export$7f506c70190d2dd3;
var $0785a38256fd80f2$export$610665bf6d31ae2;
var $0785a38256fd80f2$export$49448bd48caf99b3;
var $0785a38256fd80f2$export$7582047f07f09982;
$0785a38256fd80f2$export$f243eef9be5f65fb = "pane--left";
$0785a38256fd80f2$export$718f7791aa978d39 = "pane--left";
$0785a38256fd80f2$export$b2c3c93d3bc013e6 = "pane--left__header";
$0785a38256fd80f2$export$6e5bb584860ae26e = "pane--left__header";
$0785a38256fd80f2$export$45c3922f2c33b499 = "pane--left__content";
$0785a38256fd80f2$export$b64547cc1e24b050 = "pane--left__content";
$0785a38256fd80f2$export$f4fbc5dab7e9c2fe = "pane--right";
$0785a38256fd80f2$export$e4f3210edf200c06 = "pane--right";
$0785a38256fd80f2$export$6b0dde39a13c1375 = "pane--right__header";
$0785a38256fd80f2$export$7861f4f95f7f8ffd = "pane--right__header";
$0785a38256fd80f2$export$15e0660759c7d368 = "pane--right__content";
$0785a38256fd80f2$export$12167b8286af4779 = "pane--right__content";
$0785a38256fd80f2$export$1a18d209072e2b36 = "pane__heading";
$0785a38256fd80f2$export$aef7cc01204227fd = "pane__heading";
$0785a38256fd80f2$export$6dff30574f79a202 = "pane";
$0785a38256fd80f2$export$7f506c70190d2dd3 = "owlui-nav-tabs";
$0785a38256fd80f2$export$610665bf6d31ae2 = "owlui-nav-tabs";
$0785a38256fd80f2$export$49448bd48caf99b3 = "owlui-tab-pane";
$0785a38256fd80f2$export$7582047f07f09982 = "owlui-tab-pane";
const $3d4a40b33ce1b2c0$export$fd2e1a4921eb839b = ({ children: children , className: className , side: side  })=>{
    let paneStyles = `${$0785a38256fd80f2$export$6dff30574f79a202}`;
    if (className) paneStyles += className;
    paneStyles += ` ${$0785a38256fd80f2$export$718f7791aa978d39}`;
    return /*#__PURE__*/ $bvorl$jsx("div", {
        className: paneStyles,
        children: children
    });
};
var $3d4a40b33ce1b2c0$export$2e2bcd8739ae039 = {
    Pane: $3d4a40b33ce1b2c0$export$fd2e1a4921eb839b
};
$parcel$exportWildcard($dbb9e39c35dca45e$exports, $0395c30720e61dc9$exports);
$parcel$exportWildcard($dbb9e39c35dca45e$exports, $3d4a40b33ce1b2c0$exports);
export {$97d50e48d778806e$export$86fbec116b87613f as App, $467d66ed0bb94ad0$export$edf27be85e5f6da0 as Error, $7da050e5dc1a885d$export$d8dc01b5c85a37b9 as Slide, $1911174de1b1157d$export$5beeae30d1389e5 as Outline, $3d4a40b33ce1b2c0$export$fd2e1a4921eb839b as Pane};
//# sourceMappingURL=scrowl.player.js.map
