const os = require('os');
const si = require('systeminformation');
module.exports = {

  initCPU: function(){


    si.currentLoad(function(data){
      var cpuPercentage = data.currentload;
      if(parseInt(cpuPercentage, 10) < 35){
        document.getElementById("usuage").style.color = '#35ff86'
      }else if(parseInt(cpuPercentage, 10) < 50){
        document.getElementById("usuage").style.color = '#ffd333'
      }else if(parseInt(cpuPercentage, 10) < 60){
        document.getElementById("usuage").style.color = '#ffbb32'
      }else if(parseInt(cpuPercentage, 10) < 80){
        document.getElementById("usuage").style.color = '#ff4800'
      }

      document.getElementById("usuage").innerHTML = (cpuPercentage.toFixed(2)  + "%");
    })

    si.cpu(function(data) {
      var cores = data.physicalCores;
      document.getElementById("cores").innerHTML = cores;
  })

  si.cpu(function(data){
    var speed = data.speed;
    document.getElementById("speed").innerHTML = speed + " GHz";
  })

  },

  initMemory: function(){

    si.mem(function(data){
      var used = parseInt(data.used, 10);
      var available = parseInt(data.available, 10);
      for(var i = 0; i < 3; i++){
        var used = used / 1024;
        var available = available / 1024;
      }

      if(used < (available * 0.45) ){
        document.getElementById("used").style.color = '#35ff86'
        document.getElementById("available").style.color = '#35ff86'
      }else if(used < (available * 0.60) ){
        document.getElementById("used").style.color = '#ffd333'
        document.getElementById("available").style.color = '#ffd333'
      }else if(used < (available * 0.75) ){
        document.getElementById("used").style.color = '#ffbb32'
        document.getElementById("available").style.color = '#ffbb32'
      }else if(used < (available * 0.90) ){
        document.getElementById("used").style.color = '#ff4800'
        document.getElementById("available").style.color = '#ff4800'
      }

      
      document.getElementById("used").innerHTML = used.toFixed(2) + " GB";
      document.getElementById("available").innerHTML = available.toFixed(2) + " GB";
    })


    

  }
  
  
};


