const {app, BrowserWindow} = require('electron')
const osu = require('node-os-utils')



function DisplayUsuage(){
    var cpu = osu.cpu
    cpu.usage()
    .then(info => {
      document.getElementById("usuage").innerHTML = info;
    })

    
 

    
}
setInterval(DisplayUsuage, 10*100);