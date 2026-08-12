const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

// The device artwork is a fixed-width column, so the window is sized to fit it
// snugly rather than letting the user stretch it into empty space.
const WIDTH = 480;
const HEIGHT = 860;

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    minWidth: 420,
    minHeight: 640,
    backgroundColor: "#211F35",        // matches the page so there's no white flash
    titleBarStyle: "hiddenInset",      // keeps the traffic lights, drops the title bar
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, "pomo-01.html"));
  win.once("ready-to-show", () => win.show());
}

app.whenReady().then(() => {
  // A single-purpose app doesn't need Edit/View/Help menus, but keep the
  // app menu so Cmd-Q and Cmd-W still behave the way macOS expects.
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      { role: "appMenu" },
      { role: "windowMenu" }
    ])
  );

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
