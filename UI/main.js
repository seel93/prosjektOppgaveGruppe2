const {app, BrowserWindow, ipcMain} = require('electron')
  const path = require('path')
  const url = require('url')
  //const {getCurrentWindow, globalShortcut} = require('electron').remote;
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})
  
    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true,
      icon: path.join(__dirname, 'assets/icons/bike-21-512.png')
    }))
  
    // Open the DevTools.
    win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
    new Notification('hello'); console.log('Hello')
  })

  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

/*   var reload = ()=>{
    getCurrentWindow().reload()
  }
  
  globalShortcut.register('F5', reload);
  globalShortcut.register('CommandOrControl+R', reload);
  // here is the fix bug #3778, if you know alternative ways, please write them
  window.addEventListener('beforeunload', ()=>{
    globalShortcut.unregister('F5', reload);
    globalShortcut.unregister('CommandOrControl+R', reload);
  }) */