new Vue({
    el: '#myapp',
    data:{
        ip_num: '',
        sip1:  '',
        sip2:  '',
        dip1:  '',
        dip2:  '',
        ip_sport: '',
        ip_dport: '',
        ip_proto: '',
        mask_sip1: '',
        mask_sip2: '',
        mask_dip1: '',
        mask_dip2: '',
        mask_proto: '',
        actid:      '',
        action_num: '',
        vlan_table_num: '',
        isShowStatus: true,
        isShowSetting: false,
        isShowTime: false,
        isShowUser:false,
        pie_data: [20, 80]

    },

    mounted:function () {
        // this.A();
    },
    methods :{
        show: isshow,
        submitsetting: submit,
        getinfo: getinfo,
        A: function() {
             setInterval(this.getinfo, 3000)
        },
        B: function() {
            console.log('func B')
        }
    },
});



function isshow(tag) {

    switch(tag){
        case "status":
            this.isShowStatus = true;
            this.isShowSetting = false;
            this.isShowTime = false;
            this.isShowUser = false;
            break;
        case "set":
            this.isShowStatus = false;
            this.isShowSetting = true;
            this.isShowTime = false;
            this.isShowUser = false;
            break;
        case "time":
            this.isShowStatus = false;
            this.isShowSetting = false;
            this.isShowTime = true;
            this.isShowUser = false;
            break;
        case "user":
            this.isShowStatus = false;
            this.isShowSetting = false;
            this.isShowTime = false;
            this.isShowUser = true;
            break;
    }
}

function init() {

    console.log("hi chart");
    var ctx = document.getElementById("myChart");
    var pie_data = [20, 80];
    var myChart = new Chart(ctx, {type: 'pie',
        data: {
            labels: ["used", "avial"],
            datasets: [{
                data: pie_data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

function test() {
    console.log('hi!!!!')
}

function submit() {
    axios({
        method: 'post',
        url: '/setting/',
        data: {
            ip_num:('0x' + this.ip_num),
            sip1: ('0x' + this.sip1),
            sip2: ('0x' + this.sip2),
            dip1: ('0x' + this.dip1),
            dip2: ('0x' + this.dip2),
            ip_sport: ('0x' + this.ip_sport),
            ip_dport: ('0x' + this.ip_dport),
            ip_proto: ('0x' + this.ip_proto),
            mask_sip1: ('0x' + this.mask_sip1),
            mask_sip2: ('0x' + this.mask_sip2),
            mask_dip1: ('0x' + this.mask_dip1),
            mask_dip2:('0x' + this.mask_dip2),
            mask_proto: ('0x' + this.mask_proto),
            actid: ('0x' + this.actid),
            action_num: ('0x' + this.action_num),
            vlan_table_num:('0x' + this.vlan_table_num)
        }
    })
}

var ctx = document.getElementById("myChart");
var ctx1 = document.getElementById("myChart1");
var ctx2 = document.getElementById("myChart2");

function getinfo() {
    axios.get('/user_data/')
        .then(function (response) {
            var pie_data_cpu = [response.cpu_rate, 100 - response.cpu_rate];
            var pie_data_mem = [response.mem_rate, 100 - response.mem_rate];
            var pie_data_speed = [response.speed, 100 - response.speed];
            paniting(ctx, pie_data_cpu);
            paniting(ctx1, pie_data_mem);
            paniting(ctx2, pie_data_speed);
        })
        .catch(function (error) {
            var num = Math.random() * 100;
            pie_data = [num, 100-num];
            paniting(ctx, pie_data);
            paniting(ctx1, pie_data);
            paniting(ctx2, pie_data);
        });
}



function paniting(ctx, ctx_data){
    new Chart(ctx, {type: 'pie',
        data: {
            labels: ["used", "avial"],
            datasets: [{
                data: ctx_data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}