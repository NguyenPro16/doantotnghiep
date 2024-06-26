
//---------------------liên kết với firebase----------------------
const firebaseConfig = {
    apiKey: "AIzaSyBws1ko6w6n8uIQEJRwjLat2KQL9xmMAYM",
    authDomain: "website-to-firebase-ce93c.firebaseapp.com",
    databaseURL: "https://website-to-firebase-ce93c-default-rtdb.firebaseio.com",
    projectId: "website-to-firebase-ce93c",
    storageBucket: "website-to-firebase-ce93c.appspot.com",
    messagingSenderId: "153252597805",
    appId: "1:153252597805:web:22ec3e073e04a3972968a4",
    measurementId: "G-1P2T8YRH2K"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

//------------------realtime----------------
  var time = document.getElementById("current_time");
  setInterval(()=>{
    var d = new Date();
    time.innerHTML = d.toLocaleTimeString();
  },1000)
  // Gọi hàm function_gsdk ngay khi trang web được tải lên
setTimeout(function() {
    function_gsdk();
}, 5000);
// -----------------modal_valve -------------------------
var btnsopen = document.querySelectorAll('.open_modal_btn');
var modal = document.querySelector('.modal');
var iconclose = document.querySelector('.modal_header i');

function toggleModal() {
    modal.classList.toggle('hide');
}

btnsopen.forEach(function(btn) {
    btn.addEventListener('click', toggleModal);
});

iconclose.addEventListener('click', toggleModal);
modal.addEventListener('click', function(e) {
    if (e.target == e.currentTarget) {
        toggleModal();
    }
})
// -----------------modal_valve_bypass-------------------------
var btnopen_bypass = document.querySelector('.open_modal_btnbypass');
var modal_bypass = document.querySelector('.modalbypass');
var iconclose_bypass = document.querySelector('.modalbypass_header i');

function toggleModalBypass() {
    modal_bypass.classList.toggle('hide');
}

btnopen_bypass.addEventListener('click', toggleModalBypass);
iconclose_bypass.addEventListener('click', toggleModalBypass);
modal_bypass.addEventListener('click', function(e) {
    if (e.target == e.currentTarget) {
        toggleModalBypass()
    }
})
// -------------------------modal_fan-------------------------------------
var btnopen_fan = document.querySelector('.open_fan')
var modal_fan = document.querySelector('.modal_fan')
var iconclose_fan = document.querySelector('.modal_header_fan i')

function toggleModalFan() {
    modal_fan.classList.toggle('hide'); // Sử dụng toggle để thêm hoặc xóa lớp hide
}

btnopen_fan.addEventListener('click', toggleModalFan)
iconclose_fan.addEventListener('click', toggleModalFan)
modal_fan.addEventListener('click', function(e){
    if(e.target == e.currentTarget){
        toggleModalFan()
    }
})
//----------manual-off-auto------------------------
var btnManual = document.getElementById("btnmanual");
var btnOff = document.getElementById("btnoff");
var btnAuto = document.getElementById("btnauto");
var btnset = document.querySelector("#set");

btnManual.onclick = function(){
    database.ref("Monitor/TT Manual").update({"data" : 1})
    database.ref("Monitor/TT OFF").update({"data" : 1})
    database.ref("Monitor/TT Auto").update({"data" : 0})
    database.ref("control").update({"manual" : 1})
    database.ref("control").update({"auto" : 0})
}

btnOff.onclick = function(){
    database.ref("Monitor/TT Manual").update({"data" : 0})
    database.ref("Monitor/TT OFF").update({"data" : 0})
    database.ref("Monitor/TT Auto").update({"data" : 0})
    database.ref("control").update({"manual" : 0})
    database.ref("control").update({"auto" : 0})
    database.ref("Monitor/TT FAN").update({"data" : 1})
}

btnAuto.onclick = function(){
    database.ref("Monitor/TT Manual").update({"data" : 0})
    database.ref("Monitor/TT OFF").update({"data" : 1})
    database.ref("Monitor/TT Auto").update({"data" : 1})
    database.ref("control").update({"manual" : 0})
    database.ref("control").update({"auto" : 1})
    database.ref("Monitor/TT FAN").update({"data" : 2})
}

// get Manual from firebase (auto update when data change)
database.ref("Monitor/TT Manual/data").on("value", function(snapshot){
    var manualVal = snapshot.val();
    if(manualVal==1){
        document.getElementById("manualid").src = "hinh/on.png" 
        document.getElementById("offid").src = "hinh/off.png"  
        document.getElementById("autoid").src = "hinh/off.png"
    }
})

// get Off from firebase (auto update when data change)
database.ref("Monitor/TT OFF/data").on("value", function(snapshot){
    var offVal = snapshot.val();   
    if(offVal==0){
        document.getElementById("manualid").src = "hinh/off.png" 
        document.getElementById("offid").src = "hinh/on.png"  
        document.getElementById("autoid").src = "hinh/off.png"
    }    
})
// get Auto from firebase (auto update when data change)
database.ref("Monitor/TT Auto/data").on("value", function(snapshot){
    var autoVal = snapshot.val();
    if(autoVal==1){
        document.getElementById("manualid").src = "hinh/off.png" 
        document.getElementById("offid").src = "hinh/off.png"  
        document.getElementById("autoid").src = "hinh/on.png"
    } 
})

database.ref("control/manual").on("value", function(snapshot){
    var manualValcontrol = snapshot.val();
    if(manualValcontrol==1){
        document.querySelectorAll('.open_modal_btn').disabled = false
        document.querySelector(".open_modal_btnbypass").disabled = false
        document.getElementById("overenablebientan").disabled = false 
        document.getElementById("Over_Value").disabled = false
        document.getElementById("setoverenable").disabled = false
    }
})

// get Auto from firebase (auto update when data change)
database.ref("control/auto").on("value", function(snapshot){
    var autoValcontrol = snapshot.val();
    if(autoValcontrol==1){
        document.querySelectorAll('.open_modal_btn').disabled = true
        document.querySelector(".open_modal_btnbypass").disabled = true
        document.getElementById("overenablebientan").disabled = true
        document.getElementById("Over_Value").disabled = true
        document.getElementById("setoverenable").disabled = true
        // Đặt giá trị của phần tử select về 0
        document.getElementById('overenablebientan').value = '0';           
        // Đặt giá trị của phần tử input về chuỗi trống
        document.getElementById('Over_Value').value = '';
    } 
})


  //-------web to firebse------------funtion button 01----------------------------------

var btnOn01 = document.getElementById("btnOnId_01");
var btnOff01 = document.getElementById("btnOffId_01");

btnOn01.onclick = function(){
    document.getElementById("close_open_supply").src = "hinh/on.png"  
    database.ref("Monitor/Status Valve 1").update({"data" : 1})
    database.ref("control").update({"van1" : 1})  
}

btnOff01.onclick = function(){
    document.getElementById("close_open_supply").src = "hinh/off.png" 
    database.ref("Monitor/Status Valve 1").update({"data" : 0})
    database.ref("control").update({"van1" : 0})
}

// //--------web to firebse------------funtion button 02----------------------------------

var btnOn02 = document.getElementById("btnOnId_02");
var btnOff02 = document.getElementById("btnOffId_02");

btnOn02.onclick = function(){
    document.getElementById("close_open_return").src = "hinh/on.png"   
    database.ref("Monitor/Status Valve 2").update({"data" : 1})
    database.ref("control").update({"van2" : 1})
    valve2.style.display = "block"
    
}

btnOff02.onclick = function(){
    document.getElementById("close_open_return").src = "hinh/off.png" 
    database.ref("Monitor/Status Valve 2").update({"data" : 0})
    database.ref("control").update({"van2" : 0})
    valve2.style.display = "none"
}

// get overenable from firebase (auto update when data change)
var btnsave = document.getElementById("save")
database.ref("control/over enable ao2").on("value", function(snapshot){
    var enable = snapshot.val();
    if(enable ==0){
        btnsave.disabled = true;
    }
    else{
        btnsave.disabled =false;       
    }

})

function updateFirebase() {
    var selectvalve = document.getElementById('overenable').value;    
        database.ref("control").update({"over enable ao2" : selectvalve})
  }
// get fan from firebase (auto update when data change)
database.ref("Monitor/Voltage/data").on("value", function(snapshot){
    var Voltage = snapshot.val();
    document.getElementById("value-voltage-monitor").innerHTML = Voltage + " V";
    // document.getElementById("volt").innerHTML = Voltage + " V";
})

database.ref("Monitor/Curent/data").on("value", function(snapshot){
    var Current = snapshot.val();
    document.getElementById("value-current-monitor").innerHTML = Current + " A";
})

database.ref("Monitor/Frequency/data").on("value", function(snapshot){
    var Frequency = snapshot.val();
    document.getElementById("value-frequency-monitor").innerHTML = Frequency + " Hz";
})

database.ref("Monitor/RPM/data").on("value", function(snapshot){
    var Speed = snapshot.val();
    document.getElementById("value-speed-monitor").innerHTML = Speed + " rpm";
})

// get Tempsupply from firebase (auto update when data change)
database.ref("Monitor/Temperature Output/data").on("value", function(snapshot){
    var TempSupply = snapshot.val();
    document.getElementById("nhietdosupply").innerHTML = TempSupply;
})

// get Tempreturn from firebase (auto update when data change)
database.ref("Monitor/Temperature Return/data").on("value", function(snapshot){
    var TempReturn = snapshot.val();
    document.getElementById("nhietdoreturn").innerHTML = TempReturn;
})

// get PresSupply from firebase (auto update when data change)
var canhbaoapsuatcao = document.getElementById("canhbaoapsuatcao") 
database.ref("Monitor/Pressure Output/data").on("value", function(snapshot){
    var PresSupply = snapshot.val();
    document.getElementById("apsuatsupply").innerHTML = PresSupply;
    if (PresSupply >= 1.49) {
        canhbaoapsuatcao.style.display = "block";
        locSound.play();
    } else {
        canhbaoapsuatcao.style.display = "none";
        locSound.pause();
        locSound.currentTime = 0;
    }
})

var fanhead = document.getElementById("fanhead");
var fanheadoff = document.getElementById("fanheadoff")
var flow = document.getElementById("flow")
database.ref("Monitor/TT FAN/data").on("value", function(snapshot){
    var TTFAN = snapshot.val();
    if (TTFAN == 1) {
        fanhead.style.display = "none"
        fanheadoff.style.display = "block"   
        flow.style.display = "none"
    } else {
        fanhead.style.display = "block"
        fanheadoff.style.display = "none" 
        flow.style.display = "block"
    }
})
// get PresReturn from firebase (auto update when data change)
database.ref("Monitor/Pressure Return/data").on("value", function(snapshot){
    var PresReturn = snapshot.val();
    document.getElementById("apsuatreturn").innerHTML = PresReturn;
})

// get TempOut from firebase (auto update when data change)
database.ref("Monitor/Temperature Room/data").on("value", function(snapshot){
    var TempOut = snapshot.val();
    document.getElementById("nhietdodaura").innerHTML = TempOut + " °C";

    database.ref("control/set temp").once("value", function(snapshot){
        var setVal = snapshot.val();
        document.getElementById("nhietdoset").innerHTML = setVal + " °C";
        if (setVal >= TempOut ) {
            document.getElementById('canhbaonhietdo').textContent = 'Temperature OK';
            document.getElementById('canhbaonhietdo').style.color = 'green';
            document.getElementById('canhbaonhietdo').classList.remove('blink');
        } else {
            document.getElementById('canhbaonhietdo').textContent = 'Temperature not OK';
            document.getElementById('canhbaonhietdo').style.color = 'red';
            document.getElementById('canhbaonhietdo').classList.add('blink');
        }
    })
})

function checkcheck(){
    database.ref("Monitor/Temperature Room/data").on("value", function(snapshot){
        var TempOut = snapshot.val();
        document.getElementById("nhietdodaura").innerHTML = TempOut + " °C";
        // Lấy giá trị của 'Set_Point' từ Firebase
        database.ref("control/set temp").once("value", function(snapshot){
            var setVal = snapshot.val();
            document.getElementById("nhietdoset").innerHTML = setVal + " °C";
            if (setVal >= TempOut ) {
                document.getElementById('canhbaonhietdo').textContent = 'Temperature OK';
                document.getElementById('canhbaonhietdo').style.color = 'green';
                document.getElementById('canhbaonhietdo').classList.remove('blink');
            } else {
                document.getElementById('canhbaonhietdo').textContent = 'Temperature not OK';
                document.getElementById('canhbaonhietdo').style.color = 'red';
                document.getElementById('canhbaonhietdo').classList.add('blink');
            }
        })
    })
}

// Gọi hàm checkTemperature mỗi khi giá trị của trường nhập liệu 'tempset' thay đổi
document.getElementById('tempset').addEventListener('change', function() {
    checkcheck(); // Gọi hàm kiểm tra điều kiện
});

// get CPS-A from firebase (auto update when data change)
database.ref("Monitor/CPS-A/data").on("value", function(snapshot){
    var chenhap = snapshot.val();
    document.getElementById("chenhap").innerHTML = chenhap + " Pa";
})

// get SUPPLY from firebase (auto update when data change)
database.ref("Monitor/Status Valve 1/data").on("value", function(snapshot){
    var supply = snapshot.val();
    if(supply==1){
        document.getElementById("supply_valve").innerHTML = "OPEN";
        document.getElementById("close_open_supply").src = "hinh/on.png";
        document.getElementById("close_open_supply_ngoai").src = "hinh/on.png";
        valve1.style.display = "block";
    }
    else{
        document.getElementById("supply_valve").innerHTML = "CLOSE";
        document.getElementById("close_open_supply").src = "hinh/off.png"; 
        document.getElementById("close_open_supply_ngoai").src = "hinh/off.png"; 
        valve1.style.display = "none";
    } 
})

// get RETURN from firebase (auto update when data change)
database.ref("Monitor/Status Valve 2/data").on("value", function(snapshot){
    var return1 = snapshot.val();
    if(return1==1){
        document.getElementById("return_valve").innerHTML = "OPEN";
        document.getElementById("close_open_return").src = "hinh/on.png";
        document.getElementById("close_open_return_ngoai").src = "hinh/on.png";
        valve2.style.display = "block";
    }
    else{
        document.getElementById("return_valve").innerHTML = "CLOSE";
        document.getElementById("close_open_return").src = "hinh/off.png"; 
        document.getElementById("close_open_return_ngoai").src = "hinh/off.png"; 
        valve2.style.display = "none";
    }
})

// get SUPPLY from firebase (auto update when data change)
database.ref("control/van1").on("value", function(snapshot){
    var supply = snapshot.val();
    if(supply==1){
        valve1.style.display = "block";
    }
    else{
        valve1.style.display = "none";
    } 
})

// get RETURN from firebase (auto update when data change)
database.ref("control/van2").on("value", function(snapshot){
    var return1 = snapshot.val();
    if(return1==1){
        valve2.style.display = "block";
    }
    else{
        valve2.style.display = "none";
    }
})

// get BYPASS from firebase (auto update when data change)
database.ref("Monitor/Status Van Bypass/data").on("value", function(snapshot){
    var bypass = snapshot.val();
    if(bypass > 0 && bypass <= 100){
        valve3_1.style.display = "block";
        valve3_2.style.display = "block";
        valve3_3.style.display = "block";
        updateCircle_ngoai(bypass);
        updateCircle(bypass);
        document.getElementById("bypass_valve").innerHTML = "OPEN " + bypass + "%";
    }
    else if(bypass == 0){
        valve3_1.style.display = "none";
        valve3_2.style.display = "none";
        valve3_3.style.display = "none";
        updateCircle_ngoai(bypass);
        updateCircle(bypass);
        document.getElementById("bypass_valve").innerHTML = "OFF";
        document.getElementById("close_open_bypass").src = "hinh/off.png"; 
        document.getElementById("close_open_bypass_ngoai").src = "hinh/off.png";
    }   
})
    function updateCircle_ngoai(value) {
        var fill_ngoai = document.getElementById("fill_ngoai");
        fill_ngoai.style.height = value + "%";
    }
    function updateCircle(value) {
        var fill= document.getElementById("fill");
        fill.style.height = value + "%";
    }
//--------------------------control---------------
var warning = document.getElementById("canhbaonhapsaibypass") 
document.getElementById('save').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var bypassVal = document.getElementById('giatribypass').value;
    // Gửi dữ liệu mới qua Firebase
    if (bypassVal >= 15 && bypassVal <= 100) {
        database.ref("control").update({
            "over value ao2": bypassVal,
        });
        warning.style.display = "none"
    } else if(bypassVal > 0 && bypassVal < 15) {
        warning.style.display = "block"       
    }else if(bypassVal == 0) {
        database.ref("control").update({
            "over value ao2": bypassVal,
        });
        warning.style.display = "none"       
    }else{
        warning.style.display = "block"      
    }  
});

//ĐƯA DỮ LIỆU SETPOINT TỪ FIREBASE VỀ HIỂN THỊ TRÊN KHUNG SETPOINT NHIỆT ĐỘ
firebase.database().ref("control/set temp").on("value", (snapshot) => {
    var setpointValuetemphienthi = snapshot.val();
    updateSetpointDisplay(setpointValuetemphienthi);
});

///// LẤY GIÁ TRỊ SETPOINT TỪ FIREBASE VỀ HIỂN THỊ TRÊN WEB
function updateSetpointDisplay(value) {
    var setpointElement = document.getElementById("tempset");
    var setpointElement1 = document.getElementById("Set_Point");
    setpointElement.value = value;
    setpointElement1.value = value;
}

// Lắng nghe sự kiện khi người dùng nhấn nút "Set"
document.getElementById('set').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var tempsetVal = document.getElementById('tempset').value;
    // Gửi dữ liệu mới qua Firebase
    if (tempsetVal >= 0 && tempsetVal <= 50) {
        warning.style.display = "none"
        database.ref("control").update({
            "set temp": tempsetVal
        });
        checkcheck()
    }else{
        warning.style.display = "block"      
    }
});

document.getElementById('setoverenable').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var selectoveranable = document.getElementById('overenablebientan').value;
    var overValueVal = document.getElementById('Over_Value').value;
    // Gửi dữ liệu mới qua Firebase
    database.ref("control").update({
        "over enable ao1" : selectoveranable,
        "over value ao1": overValueVal,
    });
});

 //--------------------------biến--------------
 var mohinh = document.getElementById("mohinh");
 var giamsatdienap = document.getElementById("giamsatdienap");
 var giamsatdongdien = document.getElementById("giamsatdongdien");
 var giamsattanso = document.getElementById("giamsattanso");
 var giamsattocdo = document.getElementById("giamsattocdo");
 var valve3_1 = document.getElementById("valve1");
 var valve1 = document.getElementById("valve2");
 var valve2 = document.getElementById("valve3");
 var valve3_3 = document.getElementById("valve4");
 var valve3_2 = document.getElementById("valve5");

 function getArr(arr, newItem) {
    if (arr.length >= 3600) {
        arr.shift();
    }
    arr.push(newItem);
    return arr;
}
function function_voltage() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "block";
    giamsatdienap.style.opacity = 1;
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "none"
    giamsattocdo.style.display = "none"   
    giamsatcongsuat.style.display = "none"     
}
function function_gsdk() {        
    mohinh.style.display = "block";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "none"
    giamsattocdo.style.display = "none" 
    giamsatcongsuat.style.display = "none"       
}
function function_current() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "block";
    giamsatdongdien.style.opacity = 1;
    giamsattanso.style.display = "none"
    giamsattocdo.style.display = "none" 
    giamsatcongsuat.style.display = "none"    
}
function function_frequency() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "block" 
    giamsattanso.style.opacity = 1;
    giamsattocdo.style.display = "none"  
    giamsatcongsuat.style.display = "none"    
}
function function_speed() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "none"
    giamsattocdo.style.display = "block"
    giamsattocdo.style.opacity = 1;
    giamsatcongsuat.style.display = "none"      
}

var khoaweb = document.getElementById("khoaweb")
var moweb = document.getElementById("moweb")
database.ref("Monitor/cam web/data").on("value", function(snapshot){
    var camweb = snapshot.val();
    if(camweb==1){
        khoaweb.style.display = "block"
        moweb.style.display = "none"
        btnwrite.disabled = true;
        btnset.disabled = true;
        btnopen_bypass.disabled = true;
        btnsopen.forEach(function(btn) {
            btn.disabled = true;
        });
    }
    else{
        khoaweb.style.display = "none" 
        moweb.style.display = "block"
        setTimeout(() => {
            moweb.style.display = "none";
          }, 3000);
          btnwrite.disabled = false;
          btnset.disabled = false;
          btnopen_bypass.disabled = false;
          btnsopen.forEach(function(btn) {
              btn.disabled = false;
          });
    }
})


//-------------------------------------------Filter----------------------------------------
var opts_filter = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};
var canhbaolocban = document.getElementById("canhbaolocban")
var locSound = document.getElementById("loc_sound");
    database.ref("Monitor/CPS-A/data").on("value", function (snapshot) {
//         //----------------------------- Gauge ----------------------------
        filter_out = snapshot.val();   
        var target_filter = document.getElementById('gauge-filter'); // your canvas element
        var ctx = target_filter.getContext('2d');
        var gauge_filter = new Gauge(target_filter).setOptions(opts_filter); // create sexy gauge!
        gauge_filter.animationSpeed = 32;   
        gauge_filter.maxValue = 100; // set max gauge value
        gauge_filter.set(filter_out);
        if (filter_out <= 50 ) {
            document.getElementById('filter').textContent = 'Clean';
            document.getElementById('filter').style.color = 'green';
            document.getElementById('filter').classList.remove('blink');
            canhbaolocban.style.display = "none"
            locSound.pause();
            locSound.currentTime = 0;
        } else{
            document.getElementById('filter').textContent = 'Dirty';
            document.getElementById('filter').style.color = 'red';
            document.getElementById('filter').classList.add('blink');
            canhbaolocban.style.display = "block";
            document.getElementById('textwarningloc').classList.add('blink');
            locSound.play();
        }
    });
        
//--------------------------------------------ĐIENAP------------------------
var opts_voltage = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};

var voltage = document.getElementById('chart-voltage').getContext('2d');
var chart_voltage = new Chart(voltage, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Voltage',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            fill: false,
            pointRadius: 0 
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            // x: {
            //     type: 'time',
            //     time: {
            //         displayFormats: {
            //             second: 'h:mm:ss a'
            //         }
            //     }
            // },
            y: {
                min: 0,
                max: 400,
                ticks: {
                    stepSize: 40
                }
            }
        }
    }
});

var content_row_voltage = document.querySelectorAll(".content-row-voltage");
var time_voltage = [];
var value_voltage = [];
var j = 0;
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalvoltage, historyIntervalvoltage;
    database.ref("Monitor/Voltage/data").on("value", function (snapshot) {
//         //----------------------------- Gauge ----------------------------
        voltage_out = snapshot.val();
        document.getElementById("voltage").innerHTML = voltage_out + " V";    
        
        var target_voltage = document.getElementById('gauge-voltage'); // your canvas element
        var ctx = target_voltage.getContext('2d');
        var gauge_voltage = new Gauge(target_voltage).setOptions(opts_voltage); // create sexy gauge!
        gauge_voltage.animationSpeed = 32;
    
        gauge_voltage.maxValue = 400; // set max gauge value
        gauge_voltage.set(voltage_out);
        //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartvoltage(voltage_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatavoltage(voltage_out);
        // Bắt đầu cập nhật biểu đồ mỗi giây
        if (!chartIntervalvoltage) {
            chartInterval = setInterval(() => {
                updateChartvoltage(voltage_out);
            }, 1000);
        }

        // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây
        if (!historyIntervalvoltage) {
            historyInterval = setInterval(() => {
                updateHistoryDatavoltage(voltage_out);
            }, 1000);
        }
    });
        function updateChartvoltage(voltage_out){
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_voltage.data.datasets[0].data, voltage_out);
            const labels = getArr(chart_voltage.data.labels, time);
            chart_voltage.data.labels = labels
            chart_voltage.data.datasets[0].data = data
            chart_voltage.update();
       }
        
//         

       function updateHistoryDatavoltage(voltage_out){
            var time_now = new Date();
            if (j <= 6) {
                time_voltage[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_voltage[j] = voltage_out;
                j++;
            }
            else {
                time_voltage[0] = time_voltage[1];
                value_voltage[0] = value_voltage[1];
                time_voltage[1] = time_voltage[2];
                value_voltage[1] = value_voltage[2];
                time_voltage[2] = time_voltage[3];
                value_voltage[2] = value_voltage[3];
                time_voltage[3] = time_voltage[4];
                value_voltage[3] = value_voltage[4];
                time_voltage[4] = time_voltage[5];
                value_voltage[4] = value_voltage[5];
                time_voltage[5] = time_voltage[6];
                value_voltage[5] = value_voltage[6];
                time_voltage[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_voltage[6] = voltage_out;
            }
            content_row_voltage[2].innerHTML = time_voltage[0];
            content_row_voltage[3].innerHTML = value_voltage[0] + " V";
            content_row_voltage[4].innerHTML = time_voltage[1];
            content_row_voltage[5].innerHTML = value_voltage[1] + " V";
            content_row_voltage[6].innerHTML = time_voltage[2];
            content_row_voltage[7].innerHTML = value_voltage[2] + " V";
            content_row_voltage[8].innerHTML = time_voltage[3];
            content_row_voltage[9].innerHTML = value_voltage[3] + " V";
            content_row_voltage[10].innerHTML = time_voltage[4];
            content_row_voltage[11].innerHTML = value_voltage[4] + " V";
            content_row_voltage[12].innerHTML = time_voltage[5];
            content_row_voltage[13].innerHTML = value_voltage[5] + " V";
            content_row_voltage[14].innerHTML = time_voltage[6];
            content_row_voltage[15].innerHTML = value_voltage[6] + " V";
        }
// ----------------------------------------DONGDIEN---------------------------------------------------------
    var opts_current = {
        angle: -0.2,
        lineWidth: 0.2,
        radiusScale: 1,
        pointer: {
            length: 0.6,
            strokeWidth: 0.04,
            color: '#000000'
        },
        renderTicks: false,
        limitMax: false,
        limitMin: false,
        percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
        strokeColor: '#E0E0E0',
        generateGradient: true
    };
    
    var current = document.getElementById('chart-current').getContext('2d');
    var chart_current = new Chart(current, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Current',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
                fill: false,
                pointRadius: 0 
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 0
            },
            scales: {
                y: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            }
        }
    });
    
    var content_row_current = document.querySelectorAll(".content-row-current");
    var time_current = [];
    var value_current = [];
    var j = 0;
    // Đảm bảo rằng setInterval chỉ được tạo một lần
    var chartIntervalcurrent, historyIntervalcurrent;
    
    database.ref("Monitor/Curent/data").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        current_out = snapshot.val();
        document.getElementById("current").innerHTML = current_out + " A";
    
        var target_current = document.getElementById('gauge-current');
        var ctx = target_current.getContext('2d');
        var gauge_current = new Gauge(target_current).setOptions(opts_current);
        gauge_current.animationSpeed = 32;
        gauge_current.maxValue = 5;
        gauge_current.set(current_out);
        //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartcurrent(current_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatacurrent(current_out);
        // Bắt đầu cập nhật biểu đồ mỗi giây
        if (!chartIntervalcurrent) {
            chartInterval = setInterval(() => {
                updateChartcurrent(current_out);
            }, 1000);
        }
        
        // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây
        if (!historyIntervalcurrent) {
            historyInterval = setInterval(() => {
                updateHistoryDatacurrent(current_out);
            }, 1000);
        }
    });
    
    function updateChartcurrent(current_out) {
        var time = new Date().toLocaleTimeString();
        const data = getArr(chart_current.data.datasets[0].data, current_out);
        const labels = getArr(chart_current.data.labels, time);
        chart_current.data.labels = labels;
        chart_current.data.datasets[0].data = data;
        chart_current.update();
    }
    
    function updateHistoryDatacurrent(current_out) {
        var time_now = new Date();
        if (j <= 6) {
            time_current[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
            value_current[j] = current_out;
            j++;
        } else {
            time_current[0] = time_current[1];
            value_current[0] = value_current[1];
            time_current[1] = time_current[2];
            value_current[1] = value_current[2];
            time_current[2] = time_current[3];
            value_current[2] = value_current[3];
            time_current[3] = time_current[4];
            value_current[3] = value_current[4];
            time_current[4] = time_current[5];
            value_current[4] = value_current[5];
            time_current[5] = time_current[6];
            value_current[5] = value_current[6];
            time_current[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
            value_current[6] = current_out;
        }
        content_row_current[2].innerHTML = time_current[0];
        content_row_current[3].innerHTML = value_current[0] + " A";
        content_row_current[4].innerHTML = time_current[1];
        content_row_current[5].innerHTML = value_current[1] + " A";
        content_row_current[6].innerHTML = time_current[2];
        content_row_current[7].innerHTML = value_current[2] + " A";
        content_row_current[8].innerHTML = time_current[3];
        content_row_current[9].innerHTML = value_current[3] + " A";
        content_row_current[10].innerHTML = time_current[4];
        content_row_current[11].innerHTML = value_current[4] + " A";
        content_row_current[12].innerHTML = time_current[5];
        content_row_current[13].innerHTML = value_current[5] + " A";
        content_row_current[14].innerHTML = time_current[6];
        content_row_current[15].innerHTML = value_current[6] + " A";
    }  
// ----------------------------------------TANSO---------------------------------------------------------
var opts_frequency = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};

var frequency = document.getElementById('chart-frequency').getContext('2d');
var chart_frequency = new Chart(frequency, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Frequency',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            fill: false,
            pointRadius: 0 
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            // x: {
            //     type: 'time',
            //     time: {
            //         displayFormats: {
            //             second: 'h:mm:ss a'
            //         }
            //     }
            // },
            y: {
                min: 0,
                max: 60,
                ticks: {
                    stepSize: 10
                }
            }
        }
    }
});

var content_row_frequency = document.querySelectorAll(".content-row-frequency");
var time_frequency = [];
var value_frequency = [];
var j = 0;
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalfrequency, historyIntervalfrequency;
    database.ref("Monitor/Frequency/data").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        frequency_out = snapshot.val();
        document.getElementById("frequency").innerHTML = frequency_out + " Hz";    
        
        var target_frequency = document.getElementById('gauge-frequency'); // your canvas element
        var ctx = target_frequency.getContext('2d');
        var gauge_frequency = new Gauge(target_frequency).setOptions(opts_frequency); // create sexy gauge!
        gauge_frequency.animationSpeed = 32;
    
        gauge_frequency.maxValue = 60; // set max gauge value
        gauge_frequency.set(frequency_out);
        //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartfrequency(frequency_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatafrequency(frequency_out);
        // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
        if (!chartIntervalfrequency) {
            chartInterval = setInterval(() => {
                updateChartfrequency(frequency_out);
            }, 1000);
        }
        
        // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
        if (!historyIntervalfrequency) {
            historyInterval = setInterval(() => {
                updateHistoryDatafrequency(frequency_out);
            }, 1000);
        }      
    });
        function updateChartfrequency(frequency_out){
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_frequency.data.datasets[0].data, frequency_out);
            const labels = getArr(chart_frequency.data.labels, time);
            chart_frequency.data.labels = labels
            chart_frequency.data.datasets[0].data = data
            chart_frequency.update();
        }

        function updateHistoryDatafrequency(frequency_out) {
            var time_now = new Date();
            if (j <= 6) {
                time_frequency[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_frequency[j] = frequency_out;
                j++;
            }
            else {
                time_frequency[0] = time_frequency[1];
                value_frequency[0] = value_frequency[1];
                time_frequency[1] = time_frequency[2];
                value_frequency[1] = value_frequency[2];
                time_frequency[2] = time_frequency[3];
                value_frequency[2] = value_frequency[3];
                time_frequency[3] = time_frequency[4];
                value_frequency[3] = value_frequency[4];
                time_frequency[4] = time_frequency[5];
                value_frequency[4] = value_frequency[5];
                time_frequency[5] = time_frequency[6];
                value_frequency[5] = value_frequency[6];
                time_frequency[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_frequency[6] = frequency_out;
            }
            content_row_frequency[2].innerHTML = time_frequency[0];
            content_row_frequency[3].innerHTML = value_frequency[0] + " Hz";
            content_row_frequency[4].innerHTML = time_frequency[1];
            content_row_frequency[5].innerHTML = value_frequency[1] + " Hz";
            content_row_frequency[6].innerHTML = time_frequency[2];
            content_row_frequency[7].innerHTML = value_frequency[2] + " Hz";
            content_row_frequency[8].innerHTML = time_frequency[3];
            content_row_frequency[9].innerHTML = value_frequency[3] + " Hz";
            content_row_frequency[10].innerHTML = time_frequency[4];
            content_row_frequency[11].innerHTML = value_frequency[4] + " Hz";
            content_row_frequency[12].innerHTML = time_frequency[5];
            content_row_frequency[13].innerHTML = value_frequency[5] + " Hz";
            content_row_frequency[14].innerHTML = time_frequency[6];
            content_row_frequency[15].innerHTML = value_frequency[6] + " Hz";
        }
// ----------------------------------------TOCDO---------------------------------------------------------
var opts_speed = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};

var speed = document.getElementById('chart-speed').getContext('2d');
var chart_speed = new Chart(speed, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Speed',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            fill: false,
            pointRadius: 0 
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            // x: {
            //     type: 'time',
            //     time: {
            //         displayFormats: {
            //             second: 'h:mm:ss a'
            //         }
            //     }
            // },
            y: {
                min: 0,
                max: 3000,
                ticks: {
                    stepSize: 300
                }
            }
        }
    }
});

var content_row_speed = document.querySelectorAll(".content-row-speed");
var time_speed = [];
var value_speed = [];
var j = 0;
// Đảm bảo rằng setInterval chỉ được tạo một lần
var chartIntervalspeed, historyIntervalspeed;
    database.ref("Monitor/RPM/data").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        speed_out = snapshot.val();
        document.getElementById("speed").innerHTML = speed_out + " rpm";    
        
        var target_speed = document.getElementById('gauge-speed'); // your canvas element
        var ctx = target_speed.getContext('2d');
        var gauge_speed = new Gauge(target_speed).setOptions(opts_speed); // create sexy gauge!
        gauge_speed.animationSpeed = 32;
    
        gauge_speed.maxValue = 3000; // set max gauge value
        gauge_speed.set(speed_out);
             //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartspeed(speed_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDataspeed(speed_out);
        // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
        if (!chartIntervalspeed) {
            chartInterval = setInterval(() => {
                updateChartspeed(speed_out);
            }, 1000);
        }
        
        // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
        if (!historyIntervalspeed) {
            historyInterval = setInterval(() => {
                updateHistoryDataspeed(speed_out);
            }, 1000);
        }
    });
    function updateChartspeed(speed_out) {
        var time = new Date().toLocaleTimeString();
        const data = getArr(chart_speed.data.datasets[0].data, speed_out);
        const labels = getArr(chart_speed.data.labels, time);
        chart_speed.data.labels = labels
        chart_speed.data.datasets[0].data = data
        chart_speed.update();
    }    

    function updateHistoryDataspeed(speed_out) {
            var time_now = new Date();
            if (j <= 6) {
                time_speed[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_speed[j] = speed_out;
                j++;
            }
            else {
                time_speed[0] = time_speed[1];
                value_speed[0] = value_speed[1];
                time_speed[1] = time_speed[2];
                value_speed[1] = value_speed[2];
                time_speed[2] = time_speed[3];
                value_speed[2] = value_speed[3];
                time_speed[3] = time_speed[4];
                value_speed[3] = value_speed[4];
                time_speed[4] = time_speed[5];
                value_speed[4] = value_speed[5];
                time_speed[5] = time_speed[6];
                value_speed[5] = value_speed[6];
                time_speed[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_speed[6] = speed_out;
            }
            content_row_speed[2].innerHTML = time_speed[0];
            content_row_speed[3].innerHTML = value_speed[0] + " rpm";
            content_row_speed[4].innerHTML = time_speed[1];
            content_row_speed[5].innerHTML = value_speed[1] + " rpm";
            content_row_speed[6].innerHTML = time_speed[2];
            content_row_speed[7].innerHTML = value_speed[2] + " rpm";
            content_row_speed[8].innerHTML = time_speed[3];
            content_row_speed[9].innerHTML = value_speed[3] + " rpm";
            content_row_speed[10].innerHTML = time_speed[4];
            content_row_speed[11].innerHTML = value_speed[4] + " rpm";
            content_row_speed[12].innerHTML = time_speed[5];
            content_row_speed[13].innerHTML = value_speed[5] + " rpm";
            content_row_speed[14].innerHTML = time_speed[6];
            content_row_speed[15].innerHTML = value_speed[6] + " rpm";
        }
//-----------------------------------------------------------REPORT EXCEL-----------------------------------------------------------
function exportVoltageToExcel() {
    // Prepare chart data
    const chartData = chart_voltage.data.datasets[0].data;
    const chartLabels = chart_voltage.data.labels;

    // Prepare historical voltage data
    const historyData = [];
    for (let i = 0; i < 86400; i++) {
        if (time_voltage[i] && value_voltage[i] !== undefined) {
            historyData.push([time_voltage[i], value_voltage[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Voltage'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Voltage'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'VoltageData.xlsx');
}

function exportCurrentToExcel() {
    // Prepare chart data
    const chartData = chart_current.data.datasets[0].data;
    const chartLabels = chart_current.data.labels;

    // Prepare historical voltage data
    const historyData = [];
    for (let i = 0; i < 86400; i++) {
        if (time_current[i] && value_current[i] !== undefined) {
            historyData.push([time_current[i], value_current[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Current'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Current'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'CurrentData.xlsx');
}

function exportFrequencyToExcel() {
    // Prepare chart data
    const chartData = chart_frequency.data.datasets[0].data;
    const chartLabels = chart_frequency.data.labels;

    // Prepare historical voltage data
    const historyData = [];
    for (let i = 0; i < 86400; i++) {
        if (time_frequency[i] && value_frequency[i] !== undefined) {
            historyData.push([time_frequency[i], value_frequency[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Frequency'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Frequency'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'FrequencyData.xlsx');
}

function exportSpeedToExcel() {
    // Prepare chart data
    const chartData = chart_speed.data.datasets[0].data;
    const chartLabels = chart_speed.data.labels;

    // Prepare historical voltage data
    const historyData = [];
    for (let i = 0; i < 86400; i++) {
        if (time_speed[i] && value_speed[i] !== undefined) {
            historyData.push([time_speed[i], value_speed[i]]);
        }
    }

    // Create a new workbook and worksheets
    const workbook = XLSX.utils.book_new();

    // Chart Data Worksheet
    const chartDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Speed'],
        ...chartLabels.map((label, index) => [label, chartData[index]])
    ]);
    XLSX.utils.book_append_sheet(workbook, chartDataWorksheet, 'Chart Data');

    // Historical Data Worksheet
    const historyDataWorksheet = XLSX.utils.aoa_to_sheet([
        ['Time', 'Speed'],
        ...historyData
    ]);
    XLSX.utils.book_append_sheet(workbook, historyDataWorksheet, 'Historical Data');

    // Save the workbook
    XLSX.writeFile(workbook, 'SpeedData.xlsx');
}
