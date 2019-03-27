const os = require('os');
const si = require('systeminformation');
const notifier = require('node-notifier');

module.exports = {

  initCPU: function(last){
    /* 
      This grabs the current load of the cpu using the systeminformation node module and assigns a color 
      dependant on the usage of the cpu at that time. It also rounds the total usage to 2 decimal places.
     */
    si.currentLoad(function(data){
      var cpuPercentage = data.currentload;
      var cpuPercentage = parseInt(cpuPercentage, 10);

      if(cpuPercentage> 0 & cpuPercentage < 35){
        document.getElementById("usuage").style.color = '#35ff86'
      }else if(cpuPercentage > 35 & cpuPercentage < 50){
        document.getElementById("usuage").style.color = '#ffd333'
      }else if(cpuPercentage > 50 & cpuPercentage < 60){
        document.getElementById("usuage").style.color = '#ffbb32'
      }else if(cpuPercentage > 60 & cpuPercentage < 100){
        document.getElementById("usuage").style.color = '#ff4800'
      }

      /*
      Sets the cpu usage percentage.
      */
      document.getElementById("usuage").innerHTML = (cpuPercentage.toFixed(2)  + "%");
    })

    /*
    This grabs the physical core count of the system and displays it to the user. (Does not change)
    */

    si.cpu(function(data) {
      var cores = data.physicalCores;
      /*
      Sets the cpu cores count.
      */
      document.getElementById("cores").innerHTML = cores;
    })

    /*
    This grabs the speed of the systems processor and displays it to the user. (Does not change)
    */

    si.cpu(function(data){
    var speed = data.speed;
    /*
      Sets the cpu speed in GHz.
      */
    document.getElementById("speed").innerHTML = speed + " GHz";
    })

  },

  /* 
    This grabs the available memory and available memory from the system and color codes the used memory depending on usage.
  */
  initMemory: function(){

    si.mem(function(data){
      var used = parseInt(data.used, 10);
      var available = parseInt(data.available, 10);

      /* 
      Divides the used and availble by 1024, 3 times to get the used and available in gigabytes instead of bytes.
      */
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

      /*
      Set's the data.
      */
      document.getElementById("used").innerHTML = used.toFixed(2) + " GB";
      document.getElementById("available").innerHTML = available.toFixed(2) + " GB";
    })
  },

  /*
    This dipsplays the name of the process the cpu usage of that process, memory usage of that process and also the PID for that
    process.
  */

  initProcess: function(){

    si.processes(function(data){
      // Removes all previous table rows.
      var Processes = document.getElementById("Processes");
      while (Processes.firstChild) {
        Processes.removeChild(Processes.firstChild);
      }


      var reverse = data.list.reverse();
      reverse.forEach(function(value){
        var name  = value.name;
        var pid = value.pid;
        var cpuusage = value.pcpu;
        var memusage = value.pmem;

        if(cpuusage != 0){
          var row = Processes.insertRow(0);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
  
          cell1.innerHTML = name;
          cell2.innerHTML = cpuusage + "%";
          cell3.innerHTML = memusage + " GB";
          cell4.innerHTML = pid;
        }

        
      });
      
    })

  }

};

