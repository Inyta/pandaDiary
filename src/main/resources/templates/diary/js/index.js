var eventsList = [];
var URL = {
    queryEventsList: "/diary/queryEventsList",
    queryMemoList: "/diary/queryMemoList",
    insertMemo: "/diary/insertMemo",
    updateMemoStatusById: "/diary/updateMemoStatusById",
    updateMemoContentById: "/diary/updateMemoContentById"
};
window.onload = function () {
    if($.cookie('pd_userName') == null){
        window.location.replace("../front/index.html");
    }
    Rili();
    w_getData();
   // tableStyle();
}

//日历
function Rili() {
    $('#calendar').eCalendar({
        weekDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        months: ['01', '02', '03', '04', '05', '06',
            '07', '08', '09', '10', '11', '12'
        ],
        url: "/queryEventsList",
        events: eventsList
    });
};

(function ($) {

    var eCalendar = function (options, object) {
        // Initializing global variables
        var adDay = new Date().getDate();
        var adMonth = new Date().getMonth();
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;

        var settings = $.extend({}, $.fn.eCalendar.defaults, options);

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };

        var mouseOverEvent = function () {
            $(".c-event-list").scrollTop(0);
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over1').host;
            $(".c-event-list").scrollTop($('div.c-event-item[data-event-day="' + d + '"]').position().top - $('div.c-event-item[data-event-day="' + d + '"]').height())
        };

        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-event-over1');

        };
        var mouseOverItem = function () {
            $(this).addClass('c-event-over1');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over1')
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
        };

        var clickitem = function () {
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').siblings().removeAttr("style")
            $('div.c-event-item[data-event-day="' + d + '"]').css({
                "font-weight": "700",
                "color": "#fff",
                "background": "-webkit-linear-gradient(left, #01c2e6 , #1160ff)",
                "background": " -o-linear-gradient(right, #01c2e6 , #1160ff)",
                "background": "-moz-linear-gradient(right, #01c2e6 , #1160ff)",
                "background": "linear-gradient(to right, #01c2e6 , #1160ff)"
            }).host;
            $('div.c-event-item[data-event-day="' + d + '"]').siblings().children().removeAttr("style")
            $('div.c-event-item[data-event-day="' + d + '"]').children().css("color", "white")
            $('div.c-event[data-event-day="' + d + '"]').siblings().removeAttr("style")
            $('div.c-event[data-event-day="' + d + '"]').css({
                "box-shadow": " 0 0 8px #cccccc",
                "font-weight": "700",
                "color": "#fff",
                "background": "-webkit-linear-gradient(left, #01c2e6 , #1160ff)",
                "background": " -o-linear-gradient(right, #01c2e6 , #1160ff)",
                "background": "-moz-linear-gradient(right, #01c2e6 , #1160ff)",
                "background": "linear-gradient(to right, #01c2e6 , #1160ff)"
            }).host;

        }

        var nextMonth = function () {
            if (dMonth < 11) {
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
            if ($(".c-day").is(".c-today")) {
                $(".c-month-top").html(dYear + "-" + settings.months[dMonth]);
                $(".c-month-center").html($(".c-today").text());
                //	            $(".c-month-bottom").html("有课");
            } else {
                $(".c-month-top").html(dYear);
                $(".c-month-center").html(settings.months[dMonth]);
                $(".c-month-bottom").html("");
            }

        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
            if ($(".c-day").is(".c-today")) {
                $(".c-month-top").html(dYear + "-" + settings.months[dMonth]);
                $(".c-month-center").html($(".c-today").text());
                //	            $(".c-month-bottom").html("有课");
            } else {
                $(".c-month-top").html(dYear);
                $(".c-month-center").html(settings.months[dMonth]);
                $(".c-month-bottom").html("");
            }
        };

        function loadEvents() {
            console.log(settings.url);
            // if (typeof settings.url != 'undefined' && settings.url != '') {
            $.ajax({
                url: URL.queryEventsList,
                contentType: "application/json;charset=utf-8",
                processData: false,
                type: "get",
                cache: false,
                async: false,
                success: function (result) {
                    settings.events = result.result;
                    eventsList = result.result;
                    console.log(settings.events);
                    console.log(eventsList);
                }
            });
            // }
        }

        //日期字符串格式转换Date类型
        function strToDate(strdate) {
            var str = strdate;
            var separator = "-";
            var arr = str.split(separator);
            var Tyear = parseInt(arr[0]);
            var Tmonth;
            //处理月份为04这样的情况
            if (arr[1].indexOf("0") == 0) {
                Tmonth = parseInt(arr[1].substring(1)) - 1;
            } else {
                Tmonth = parseInt(arr[1]) - 1;
            }
            var Tday = parseInt(arr[2]);
            var Tdate = new Date(Tyear, Tmonth, Tday);
            return Tdate
        }

        function print() {
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay();
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;
            var cBody = $('<div/>').addClass('c-grid');
            var cEvents = $('<div/>').addClass('c-event-grid');
            var cEventsBody = $('<div/>').addClass('c-event-body');
            var cEventsTop = $('<div/>').addClass('c-event-top clearfix');
            cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
            cPrevious.html(settings.textArrows.previous);
            cNext.html(settings.textArrows.next);
            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);
            cEventsTop.append(cPrevious);
            cEventsTop.append(cMonth);
            cEventsTop.append(cNext);
            for (var i = 0; i < settings.weekDays.length; i++) {
                var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');
                cWeekDay.html(settings.weekDays[i]);
                console.log(settings.weekDays[i]);
                cBody.append(cWeekDay);
            }
            var day = 1;
            var dayOfNextMonth = 1;
            for (var i = 0; i < 42; i++) {
                var cDay = $('<div/>');
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    //                  cDay.html(dLastDayOfPreviousMonth++);
                } else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day c-pad-top');
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');
                    }
                    for (var j = 0; j < settings.events.length; j++) {
                        var d = strToDate(settings.events[j].finishTime);
                        // var d = settings.events[j].createTime;
                        if (d.getDate() == day && (d.getMonth()) == dMonth && d.getFullYear() == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate());
                            cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent).on('click', clickitem);
                        }
                        if (d.getDate() == day && d.getMonth() == 0 && dMonth == 11 && (d.getFullYear() - 1) == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate());
                            cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent).on('click', clickitem);
                        }
                    }
                    cDay.html(day++);
                } else {
                    cDay.addClass('c-day-next-month c-pad-top');
                    //                  cDay.html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }
            console.log(settings.events)
            console.log(eventsList)
            var eventList = $('<div/>').addClass('c-event-list');
            for (var i = 0; i < settings.events.length; i++) {
                // console.log(d)
                var d = strToDate(settings.events[i].finishTime);
                // var d = settings.events[j].createTime;
                if ((d.getMonth()) == dMonth && d.getFullYear() == dYear) {
                    var date = lpad(d.getMonth() + 1, 2) + '/' + lpad(d.getDate(), 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                    var item = $('<div/>').addClass('c-event-item');
                    var a = $('<a/>').addClass('c-event-item-a').attr('href', settings.events[i].href);
                    // var title = $('<div/>').addClass('title').html(date + '  ' + settings.events[i].title);
                    var content = $('<div/>').addClass('content').html(settings.events[i].content+'---创建时间:'+ settings.events[i].createTime);
                    item.attr('data-event-day', d.getDate());
                    item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem).on('click', clickitem);
                    item.append(a);
                    // a.append(title).append(content);
                    a.append(content);
                    eventList.append(item);
                }
                if (d.getMonth() == 0 && dMonth == 11 && (d.getFullYear() - 1) == dYear) {
                    var date = lpad(12, 2) + '/' + lpad(d.getDate(), 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                    var item = $('<div/>').addClass('c-event-item');
                    var a = $('<a/>').addClass('c-event-item-a').attr('href', settings.events[i].href);
                    // var title = $('<div/>').addClass('title').html(date + '  ' + settings.events[i].title);
                    var content = $('<div/>').addClass('content').html(settings.events[i].content+'---创建时间:'+ settings.events[i].createTime);
                    item.attr('data-event-day', d.getDate());
                    item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem).on('click', clickitem);
                    item.append(a);
                    // a.append(title).append(content);
                    a.append(content);
                    eventList.append(item);
                }

            }
            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);
            $(instance).prepend(cEventsTop);
            $(".c-event-item").addClass("clearfix");
            var cMontop = $("<div/>").addClass("c-month-top");
            cMonth.append(cMontop);
            cMontop.html(dYear + "-" + settings.months[dMonth]);
            var cMoncenter = $("<div/>").addClass("c-month-center");
            cMonth.append(cMoncenter);
            cMoncenter.html($(".c-today").text());
            var cMonbottom = $("<div/>").addClass("c-month-bottom");
            cMonth.append(cMonbottom);
            if ($(".c-today").is(".c-event")) {
                // cMonbottom.html("有课");
            } else {
                cMonbottom.html(" ");
            }
        }

        return print();
    }
    $.fn.eCalendar = function (oInit) {
        return this.each(function () {
            return eCalendar(oInit, $(this));
        });
    };
    // plugin defaults
    $.fn.eCalendar.defaults = {
        weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        textArrows: {
            previous: '',
            next: ''
        },
        eventTitle: '',
        url: '',
        events: []
    };
}(jQuery));


//备忘录

//调取本地存储展示在页面 w_前缀是为了方便智能查找
function w_getData() {
    var memo;
    var data = [];
    $.ajax({
        url: URL.queryMemoList,
        contentType: "application/json;charset=utf-8",
        type: "get",
        cache: false,
        async: false,
        success: function (result) {
            data = result.result;
            console.log(data);
            //没有直接return掉
            if (data == null) {
                return
            }
            $('.todo-content').html('');
            var html = `<table class="layui-table " lay-even lay-skin="nob" lay-filter="memolist"  >
                        <colgroup>
                        <col>
                        <col width= "120">
                        <col width= "140">
                        </colgroup>
                        <thead>
                        <tr>
                        <th lay-data="{field:'content'}">事项</th>
                        <th lay-data="{field:'createTime'}">时间</th>
                        <th lay-data="{field:'do'}">操作</th>
                        </tr>
                        </thead>
                        <tbody>`
            for (var i = 0; i < data.length; i++) {

                html = html + `<tr  listid="${data[i].id}"><td>${data[i].content}</td><td>${data[i].createTime}</td><td><button id="update" class="layui-btn layui-btn-xs layui-btn-warm">修改</button><button id="done" class="layui-btn layui-btn-xs layui-btn-danger">完成</button></td></tr>`;
            }
            html = html + '</tbody></table>';
            $('.todo-content').append(html);

        }
    });
    //    layui.use('table', function(){
    //        var table = layui.table;
    //
    //        //第一个实例
    //        table.render({
    //            elem: '#todo-content'
    //            ,height: 312
    //            ,url: URL.queryMemoList //数据接口
    //            ,page: false //开启分页
    //            ,parseData: function(res){ //res 即为原始返回的数据
    //                return {
    //                    "code": res.status, //解析接口状态
    //                    "msg": res.message, //解析提示文本
    //                    "count": (res.result).length, //解析数据长度
    //                    "data": res.result.item //解析数据列表
    //                };
    //            }
    //            ,cols: [[ //表头
    //                ,{field: 'content', title: '事项', width:80}
    //                ,{field: 'createTime', title: '时间', width:80, sort: true}
    //                ,{fixed: 'right', title: '操作', width:150, align:'center', toolbar: '#todo-content-bar'}
    //                ,{field: 'id', title: 'id', width:80, fixed: 'left',hide: true}
    //                ,{field: 'updateTime',hide: true }
    //                ,{field: 'status', hide: true }
    //            ]]
    //        });
    //
    //    });
}

$(function () {
    //添加事件
    $('#add').click(function () {
        // 非空验证
        if ($('#todo').val() == '') {
            return
        }
        //获取时间
        var time = new Date().format("yyyy-MM-dd hh:mm:ss");

        $.ajax({
            url: URL.insertMemo,
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                "content": $('#todo').val(),
                "createTime": time
            }),
            success: function (result) {
                //存储完成后清空输入框
                $('#todo').val('');
                // 显示在任务列表
                w_getData();
               // tableStyle();
            }
        });
    })

    // 已完成直接划掉(采用事件委托的方式，方式新增html元素找不到事件)
    $(document).on('click', '#done', function () {
//获取时间
        var updateTime = new Date().format("yyyy-MM-dd hh:mm:ss");
        var listid = $(this).parent().parent().attr('listid');
        var listtime = $(this).parent().parent().attr('listtime');
        var status = '1';

        $.ajax({
            url: URL.updateMemoStatusById,
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                "id": listid,
                "status": status,
                "updateTime": updateTime
            }),
            success: function (result) {
                // 显示在任务列表
                w_getData();
               // tableStyle();
                Rili();
            }
        });

    })
    //update更新事件(采用事件委托的方式，方式新增html元素找不到事件)
    $(document).on('click', '#update', function () {
        let listid = $(this).parent().parent().attr('listid');
        var content = prompt("请输入修改内容");
        var updateTime = new Date().format("yyyy-MM-dd hh:mm:ss");
        if (content != null && content != "") {
            $.ajax({
                url: URL.updateMemoContentById,
                contentType: "application/json",
                method: "POST",
                data: JSON.stringify({
                    "id": listid,
                    "content": content,
                    "updateTime": updateTime
                }),
                success: function (result) {
                    w_getData();
                    //tableStyle();
                }
            });
        }
    })
    //时间函数
    Date.prototype.format = function (format) {
        var args = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var i in args) {
            var n = args[i];
            if (new RegExp("(" + i + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
        }
        return format;
    };

    //不够补零
    function w_zero(num) {
        if (num < 10) return "0" + num; else return num;
    }
})
function tableStyle() {
    layui.use('table', function(){
        var table = layui.table;

        var $ = layui.$, active = {
            parseTable: function(){
                table.init('memolist', { //转化静态表格
                    height: 'full-500'
                });
            }
        };
    });
}
// enter添加事件
$('#todo').keydown(function (event) {
    var e = event || window.event;
    if (e.keyCode == 13) {
        $('#add').click();
    }
});