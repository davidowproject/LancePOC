/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var myInterval;

window.beaconRef = {"counter": 0};
window.visible = "";
//   Transition to loading screen, activate scan
function welcome(){
    $("#wrap0").fadeOut(600).promise().done(function(){
        $("#wrap").fadeIn(600);
        app.onResume();
        app.mode = "explore";
        $("#currpage").val("wrap");
    });
}
//   Transition to browse screen, deactivate scan for good measure
function browse(){
    $("#wrap0").fadeOut(600).promise().done(function(){
        $("#wrap00").fadeIn(600);
        app.onPause();
        //later, this should be implemented as a changeMode function
        app.mode = "browse";
        $("#currpage").val("wrap00");
    });
}
//  TOUR
function startTour() {
    var tour = introJs();
    tour.setOption('tooltipPosition', 'top');
    tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
    tour.setOption('showBullets', false);
    tour.start();
}
//  Get window size (cross browser)
function getWinSize() {
    if (window.innerWidth != undefined) {
      return { width: window.innerWidth, height: window.innerHeight };
    } else {
      var D = document.documentElement;
      return { width: D.clientWidth, height: D.clientHeight };
    }
}
//  custom BACK functionality
function back(){
    var curr = $("#currpage").val();

    if( curr=="wrap0" ){
        app.onPause();
        return false;
    } else if( curr.indexOf("lg") != -1 ){
        curr = curr.slice(0,curr.indexOf("lg"));
        //iterate selectively instead of over all
        //$(".wrap").each(function(){ if($(this).css('display')!="none") $(this).fadeOut(600); })
        $(".wrap").fadeOut(600).promise().done(function(){
            $("#" + curr).fadeIn(600);
            $("#currpage").val(curr);
        });
    } else if( curr=="wrap" ){
        $(".wrap").fadeOut(600).promise().done(function(){
            $("#wrap0").fadeIn(600);
            $("#currpage").val("wrap0");
            app.onPause();
        });
    } else if( curr=="wrap00" ){
        $(".wrap").fadeOut(600).promise().done(function(){
            $("#wrap0").fadeIn(600);
            $("#currpage").val("wrap0");
            app.onPause();
        });
    } else if(app.mode == "browse" && curr.slice(0,4) == "wrap" && !isNaN(Number(curr.slice(4,curr.length)))){
        app.onPause();
        $(".wrap").fadeOut(600).promise().done(function(){
            $("#wrap00").fadeIn(600);
            $("#currpage").val("wrap00");
        });
    } else {
        app.onPause();
        $(".wrap").fadeOut(600).promise().done(function(){
            $("#wrap0").fadeIn(600);
            $("#currpage").val("wrap0");
        });
    }
}
//   Activate large view of current item
//function largeView( obj ){
//    var secondParent = $(obj).parent().parent();
//    $(".wrap").fadeOut(600).promise().done(function(){
//        $("#" + secondParent.attr("id") + "lg").fadeIn(600);
//        $("#currpage").val(secondParent.attr("id") + "lg");
//    });
//}
//     Activate small view (info) screen of piece selected
function smallView(n){
    var wrapStr = "wrap" + n;
    app.onPause();
    $(".wrap").fadeOut(600).promise().done(function(){
        $("#" + wrapStr).fadeIn(600);
        $("#currpage").val(wrapStr);
    });
}
function opener(){
    cordova.plugins.fileOpener2.open(
        '/sdcard/Download/Lonely_Kitty_by_Fennek69.jpg', // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
        'image/jpg', 
        { 
            error : function(e) { 
                console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
            },
            success : function () {
                console.log('file opened successfully');                
            }
        }
    );
}
//   Temporary data storage
var screenInfo = [
{ name:"BY LINES (2)" , artist:"Pomara, John" , medium:"ink jet digitized print" , image:"image1.jpg" , description:"Lorem ipsum dolor sit amet, eu nonummy libero magna at, vestibulum non libero, pretium fringilla porttitor et. Molestie et gravida a lorem duis sit, in pellentesque velit, risus etiam, ante a suspendisse in at ut nec. Laoreet wisi felis sed tortor, amet dui, ut non etiam mus odio, purus nunc dolor aliquet vestibulum curabitur dapibus. Lorem ipsum dolor sit amet, eu nonummy libero magna at, vestibulum non libero, pretium fringilla porttitor et. Molestie et gravida a lorem duis sit, in pellentesque velit, risus etiam, ante a suspendisse in at ut nec. Laoreet wisi felis sed tortor, amet dui, ut non etiam mus odio, purus nunc dolor aliquet vestibulum curabitur dapibus" , question:"How does the repetition in this print affect your visual perception?" },
{ name:"untitled" , artist:"Pomara, John" , medium:"mixed media on canvas & wood" , image:"image2.jpg" , description:"Lorem ipsum dolor sit amet, eu nonummy libero magna at, vestibulum non libero, pretium fringilla porttitor et. Molestie et gravida a lorem duis sit, in pellentesque velit, risus etiam, ante a suspendisse in at ut nec. Laoreet wisi felis sed tortor, amet dui, ut non etiam mus odio, purus nunc dolor aliquet vestibulum curabitur dapibus. Lorem ipsum dolor sit amet, eu nonummy libero magna at, vestibulum non libero, pretium fringilla porttitor et. Molestie et gravida a lorem duis sit, in pellentesque velit, risus etiam, ante a suspendisse in at ut nec. Laoreet wisi felis sed tortor, amet dui, ut non etiam mus odio, purus nunc dolor aliquet vestibulum curabitur dapibus" , question:"How do the painted & wood segments complement each other?" },
{ name:"untitled" , artist:"Pomara, John" , medium:"enamel on canvas (dyptch)" , image:"image3.jpg" , description:"Lorem ipsum dolor sit amet, eu nonummy libero magna at, vestibulum non libero, pretium fringilla porttitor et. Molestie et gravida a lorem duis sit, in pellentesque velit, risus etiam, ante a suspendisse in at ut nec. Laoreet wisi felis sed tortor, amet dui, ut non etiam mus odio, purus nunc dolor aliquet vestibulum curabitur dapibus. Lorem ipsum dolor sit amet, eu nonummy libero magna at, vestibulum non libero, pretium fringilla porttitor et. Molestie et gravida a lorem duis sit, in pellentesque velit, risus etiam, ante a suspendisse in at ut nec. Laoreet wisi felis sed tortor, amet dui, ut non etiam mus odio, purus nunc dolor aliquet vestibulum curabitur dapibus" , question:"How does this double painting (diptych) relate to the landscape?" }
];

//Set HTML content
$("#wrap1 h1,#wrap1sm h1").html(screenInfo[0].name);
$("#wrap1 h2,#wrap1sm h2").html(screenInfo[0].artist + "<br>" + screenInfo[0].medium);
$("#wrap1 p").html(screenInfo[0].description);
$("#wrap1 h3").html(screenInfo[0].question);

$("#wrap2 h1,#wrap2sm h1").html(screenInfo[1].name);
$("#wrap2 h2,#wrap2sm h2").html(screenInfo[1].artist + "<br>" + screenInfo[1].medium);
$("#wrap2 p").html(screenInfo[1].description);
$("#wrap2 h3").html(screenInfo[1].question);

$("#wrap3 h1,#wrap3sm h1").html(screenInfo[2].name);
$("#wrap3 h2,#wrap3sm h2").html(screenInfo[2].artist + "<br>" + screenInfo[2].medium);
$("#wrap3 p").html(screenInfo[2].description);
$("#wrap3 h3").html(screenInfo[2].question);

function startRangingBeaconsInRegionCallback() {
  // Every now and then get the list of beacons in range
  myInterval = setInterval(function() {
    EstimoteBeacons.getBeacons(function(beacons) {
      // data contains: proximityUUID, major, minor, rssi, macAddress and measuredPower
      var outp = "";
      for (var i=0;i<beacons.length;i++){
        outp += beacons[i].minor + " - " + beacons[i].rssi + "::::::";
      }
      console.log("Output:   " + outp);
      
      //var lowest = distance(beacons);
      dampen(beacons);
    });
  }, 1000);
}
//given an array of beacons, after being invoked 3 times, 
//will return the single beacon object with the strongest signal total over those 3 invocations
//
// 1001:{ values:[-22,-25,-30] },
// 1002:{ values:[-32,-35,-30] },
// 1003:{ values:[-42,-45,-45] },
//
//
//
//
//
function dampen(beacons){
    for (var i=0;i<beacons.length;i++){
        var theMinor = Number(beacons[i].minor);
        if (!window.beaconRef.hasOwnProperty(theMinor)){
            window.beaconRef[theMinor] = new Array();
            window.beaconRef[theMinor].values = [Number(beacons[i].rssi)];
            window.beaconRef.counter++;
        } else if(beaconRef.counter < 3){
            window.beaconRef[theMinor].values.push(Number(beacons[i].rssi));
            window.beaconRef.counter++;
        } else {
            //console.log("Begin Averaging:");
            //counter at 3, time to average
            var numbers = [];
            var keys = [];
            var holder = {};
            var highest = {
                "id":0,
                "rssi":null
            };

            for(var k in window.beaconRef) keys.push(k);
            for(x=0;x<keys.length;x++){
                if(isNaN(keys[x])) continue;
                //console.log("Keys:" + keys);
                //if(window.beaconRef[keys[x]].values.length < 2) continue;
                for (var b = 0; b < window.beaconRef[keys[x]].values.length; b++) {
                    if(!holder.hasOwnProperty(keys[x])){
                        holder[keys[x]] = window.beaconRef[keys[x]].values[b];
                    } else {
                        holder[keys[x]] += window.beaconRef[keys[x]].values[b];
                    }//holder[1001] = -150
                }
                holder[keys[x]] = holder[keys[x]] / window.beaconRef[keys[x]].values.length;
                //console.log(keys[x] + "'s average is" +  holder[keys[x]]);
            }
            //holder[1001] = -22
            //holder[1002] = -23
            //holder[1003] = -10

            //fill the numbers array
            for(x=0;x<keys.length;x++){
                if(isNaN(keys[x])) continue;
                numbers.push(Number(holder[keys[x]]));
            }
            //largest number
            var big = Number(Math.max.apply(Math,numbers));
            //pop that number out of the original array
            var idx = numbers.indexOf(big);
            if(idx != -1) numbers.splice(idx,1);
            //get largest again
            var big2 = Number(Math.max.apply(Math,numbers));
            //buffer
            if((big - app.thresh) > big2){
                //cycle again, this time looking for the key
                for(x=0;x<keys.length;x++){
                    if(isNaN(keys[x])) continue;
                    if(Number(holder[keys[x]]) == big){
                        highest.id = Number(keys[x]);
                        highest.rssi = Number(holder[keys[x]]);
                    }
                }
                var sel = transBcn(highest.id);
                if(sel != window.visible){
                    $(".wrap").fadeOut(600).promise().done(function(){
                        $("#" + sel).fadeIn(600);
                        $("#currpage").val(sel);
                    });
                    window.visible = sel;
                }
            }
            var keys = [];
            var holder = {};
            var highest = {"id":0,"rssi":null};
            window.beaconRef = {"counter": 0};
        }
    }
}
//given an array of beacons, returns the beacon object that is nearest (strongest signal)
function distance(beacons){
    var lowest;
    for (var i=0;i<beacons.length;i++){
        if (i==0){
            lowest = beacons[i];
            continue;
        } else if (beacons[i].rssi > lowest.rssi){
            lowest = beacons[i];
        }
    }
    return lowest;
}
//given a minor Number value, translate that to the beacon's color
function transBcn(minor){
    switch (minor){
        case 1001:
            return "wrap1";
            //return "Light Green";
            break;
        case 1002:
            return "wrap2";
            //return "Light Blue";
            break;
        case 1003:
            return "wrap3";
            //return "Dark Blue";
            break;
        default:
            return "Error";
            break;
    }
}
//app object
var app = {
    //Properties
    status: "paused",
    thresh: 10,
    mode: "",
    bluetoothleName: "BT",
    callbackSuccess: function() {return true},
    callbackFail: function() {return false},
    // Application Constructor
    initialize: function() {
        console.log("Scanning...");
        this.bindEvents();
    },
    //  is BT enabled on the phone?
    /*isEnabled: function() {
        cordova.exec(this.callbackSuccess, this.callbackFail, this.bluetoothleName, "isEnabled", []);
    },*/
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBack, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.removeEventListener('deviceready', app.onDeviceReady);

        if(!EstimoteBeacons){
            console.log("ERROR: No Estimote object!");
            return;
        }

        //document.addEventListener('pause', app.onPause);
        //document.addEventListener('resume', app.onResume);
    },
    // Hyjack Back button
    onBack: function() {
        var curr = $("#currpage").val();

        if( curr=="wrap0" ){
            navigator.app.exitApp();
        } else {
            back();
        }

        if(!EstimoteBeacons){
            console.log("ERROR: No Estimote object!");
            return;
        }
    },

    onPause: function() {
        EstimoteBeacons.stopRangingBeaconsInRegion(function() {
          console.log("PAUSED");
        });
        clearInterval(myInterval);
        this.status = "paused";
    },

    onResume: function() {
        EstimoteBeacons.startRangingBeaconsInRegion(startRangingBeaconsInRegionCallback);
        console.log("Go!");
        this.status = "running";
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/*$(function(){
    var menuStatus=false;
    
    $("a.showMenu").click(function(){
        if(menuStatus != true){                
        $(".pages").animate({
            marginLeft: "175px",
          }, 300, function(){menuStatus = true});
          return false;
          } else {
            $(".pages").animate({
            marginLeft: "0px",
          }, 300, function(){menuStatus = false});
            return false;
          }
    });
 
    $(document).on("swipeleft", null, function(){
        if (menuStatus){    
        $(".pages").animate({
            marginLeft: "0px",
          }, 300, function(){menuStatus = false});
          }
    });
    
    $(document).on("swiperight", null, function(){
        if (!menuStatus){    
        $(".pages").animate({
            marginLeft: "175px",
          }, 300, function(){menuStatus = true});
          }
    });

    var winSize = getWinSize();
    $("#menubox").css("height", winSize.height - 15);
        
});*/

app.initialize();
$("#wrap0").show();