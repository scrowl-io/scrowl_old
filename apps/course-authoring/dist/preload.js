var e=require("electron");e.contextBridge.exposeInMainWorld("electron",{ipcRenderer:{myPing(){e.ipcRenderer.send("ipc-example","ping")},on(n,r){if(["ipc-example"].includes(n)){const i=(e,...n)=>r(...n);return e.ipcRenderer.on(n,i),()=>e.ipcRenderer.removeListener(n,i)}},once(n,r){["ipc-example"].includes(n)&&e.ipcRenderer.once(n,((e,...n)=>r(...n)))}}});
//# sourceMappingURL=preload.js.map
