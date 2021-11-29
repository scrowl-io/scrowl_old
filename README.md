# SCROWL

This is a basic "Quick Start" from Electron's Docs:
https://www.electronjs.org/docs/latest/tutorial/quick-start

TLDR;
1. We bootstrapped a Node.js application and added Electron as a dependency.
1. We created a main.js script that runs our main process, which controls our app and runs in a Node.js environment. In this script, we used Electron's app and BrowserWindow modules to create a browser window that displays web content in a separate process (the renderer).
1. In order to access certain Node.js functionality in the renderer, we attached a preload script to our BrowserWindow constructor.

---

Using Electron Forg to create the pacakge:
https://www.electronjs.org/docs/latest/tutorial/quick-start#package-and-distribute-your-application
The MacOS package is lockated: `./out/scrowl-darwin-x64/scrowl.app/Contents/MacOS/scrowl`