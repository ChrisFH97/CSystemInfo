const {app, BrowserWindow} = require('electron')
const qr = require('qr-image');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const { dialog } = require('electron')
const udp = require('./udp');

let mainWindow
/*
  Creates electron window with the Width:630px and the Height:553px with node integration enabled.
*/
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 635,
    height: 553,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('views/index.html')
  mainWindow.setResizable(false)
  mainWindow.setMenu(null)


  //Creates a QR Code containing a UUID that is by used by the mobile app.
  createUUIDQR();

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  udp.startListen("Josua");

}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

/*
 * Function for creating  QR Code using the qr-image module. 
 */
function createUUIDQR(){

try {
  const storage = 'views/storage/';

  if (!fs.existsSync(storage)){
    fs.mkdirSync(storage);
  }

  fs.readdir(storage, function(err, files) {
    if (err) {
    } else {
       if (parseInt(files.length,10) > 0) {

       }else{
        var uuid = uuidv1();
        qr.image("PC-"+ uuid,{type:'png',size:14}).pipe(fs.createWriteStream( storage + "PC-"+ uuid +".png"));
       }
    }
});
} catch(err) {
  console.error(err)
}

}