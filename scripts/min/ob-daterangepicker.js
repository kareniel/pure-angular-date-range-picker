!function(e){function t(n){if(a[n])return a[n].exports;var i=a[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){a(1),e.exports=a(8)},function(e,t,a){"use strict";var n=a(2),i=a(3),r=a(4),s=a(5),o=a(6),d=a(7);angular.module("obDateRangePicker",[]).constant("moment",moment).provider("dateRangePickerConf",n.DateRangePickerProvider).provider("datePickerConf",i.DatePickerProvider).directive("dateRangePicker",r.DateRangePicker).directive("obDaterangepicker",o.ObDateRangePicker).directive("calendar",s.Calendar).directive("obDaypicker",d.ObDayPicker)},function(e,t){"use strict";function a(){var e={};return{setConfig:function(t){e=t},$get:function(){return e}}}Object.defineProperty(t,"__esModule",{value:!0}),t.DateRangePickerProvider=a},function(e,t){"use strict";function a(){var e={};return{setConfig:function(t){e=t},$get:function(){return e}}}Object.defineProperty(t,"__esModule",{value:!0}),t.DatePickerProvider=a},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(){"ngInject";var e={restrict:"E",scope:{weekStart:"&",range:"=?",minDay:"&",maxDay:"&",api:"&",monthFormat:"&",inputFormat:"&",weekDaysName:"&",linkedCalendars:"&",interceptors:"&",rangeWindow:"&"},templateUrl:"app/directives/date-range-picker/date-range-picker.html",controller:s,controllerAs:"picker",bindToController:!0,link:function(e,t,a,n){n.init()}};return e}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};t.DateRangePicker=n;var s=function(){function e(t,n){"ngInject";a(this,e),this.Moment=t,this.Scope=n,this.endCalendarApi={},this.startCalendarApi={},this.setInterceptors()}return e.$inject=["moment","$scope"],i(e,[{key:"init",value:function(){this.range=this.range||{},this.setConfigurations(),this.setListeners(),this.setApi(),this.watchRangeChange(),this.interceptors=this.interceptors()||{}}},{key:"setApi",value:function(){var e=this,t=this.api()||{};r(t,{setCalendarPosition:function(t,a){e.startCalendar=t,e.linkedCalendars()||t.isSame(a,"M")?e.endCalendar=e.startCalendar.clone().add(1,"M"):e.endCalendar=a},render:function(){e.startCalendarApi.render(),e.endCalendarApi.render()}})}},{key:"setListeners",value:function(){var e=this;this.Scope.$watchGroup([function(){return e.range.start},function(){return e.range.end}],function(t){t[0]&&t[1]&&e.setConfigurations()})}},{key:"setConfigurations",value:function(){var e=void 0,t=void 0;this.isMomentRange(this.range)?(e=this.range.start,t=this.range.end):(e=this.Moment(this.range.start,this.getFormat()),t=this.Moment(this.range.end,this.getFormat())),t=t.diff(e)>=0?t:e.clone(),this.rangeStart=e,this.rangeEnd=t,this.daysSelected=2,this.updateRange()}},{key:"updateRange",value:function(){this.isMomentRange(this.range)?(this.range.start=this.rangeStart,this.range.end=this.rangeEnd):(this.range.start=this.rangeStart?this.rangeStart.format(this.getFormat()):null,this.range.end=this.rangeEnd?this.rangeEnd.format(this.getFormat()):null)}},{key:"setInterceptors",value:function(){var e=this;this.startCalendarInterceptors={moveToPrevClicked:function(){e.moveCalenders(-1,"start")},moveToNextClicked:function(){e.moveCalenders(1,"start")},daySelected:function(t){e.dayInStartSelected(t),e.daySelected(t),2==e.daysSelected&&e.interceptors.rangeSelectedByClick&&e.interceptors.rangeSelectedByClick()},inputSelected:function(t){e.inputInStartSelected(t)}},this.endCalendarInterceptors={moveToPrevClicked:function(){e.moveCalenders(-1,"end")},moveToNextClicked:function(){e.moveCalenders(1,"end")},daySelected:function(t){e.dayInEndSelected(t),e.daySelected(t),2==e.daysSelected&&e.interceptors.rangeSelectedByClick&&e.interceptors.rangeSelectedByClick()},inputSelected:function(t){e.inputInEndSelected(t)}}}},{key:"inputInStartSelected",value:function(e){switch(this.daysSelected){case 0:case 1:this.rangeStart=e,this.daysSelected=1,this.rangeWindow()&&(this._maxDate=e.clone().add(this.rangeWindow(),"days"));break;case 2:if(this.rangeWindow()&&this.rangeEnd.diff(e,"days")>this.rangeWindow()){this._maxDate=e.clone().add(this.rangeWindow(),"days"),this.rangeStart=e,this.rangeEnd=null,this.daysSelected=1;break}e.diff(this.rangeStart,"days")<0?this.rangeStart=e:e.isBetween(this.rangeStart,this.rangeEnd)?this.rangeStart=e:e.diff(this.rangeEnd,"days")>=0&&(this.rangeStart=e,this.rangeEnd=e),this.daysSelected=2,this._maxDate=null,this.updateRange()}}},{key:"inputInEndSelected",value:function(e){switch(this.daysSelected){case 0:this.rangeStart=e,this.daysSelected=1,this.rangeWindow()&&(this._maxDate=e.clone().add(this.rangeWindow(),"days"));break;case 1:case 2:if(this.rangeWindow()&&e.diff(this.rangeStart,"days")>this.rangeWindow()){this._maxDate=e.clone().add(this.rangeWindow(),"days"),this.rangeStart=e,this.rangeEnd=null,this.daysSelected=1;break}e.diff(this.rangeStart,"days")<=0?(this.rangeStart=e,this.rangeEnd=e):e.isSame(this.startCalendar,"months")||e.isSame(this.endCalendar,"months")?this.rangeEnd=e:e.isSame(this.endCalendar,"months")||(this.rangeEnd=e),this.daysSelected=2,this._maxDate=null,this.updateRange(),this._maxDate=null}}},{key:"dayInStartSelected",value:function(e){var t=this.startCalendar.clone().add(1,"M");e.isSame(t,"month")&&this.dayInEndSelected(e)}},{key:"dayInEndSelected",value:function(e){var t=this.endCalendar.clone().subtract(1,"M");e.isSame(t,"month")&&this.dayInStartSelected(e)}},{key:"daySelected",value:function(e){switch(this.daysSelected){case 0:this.rangeStart=e,this.daysSelected=1;break;case 1:e.diff(this.rangeStart,"days")<0?(this.rangeStart=e,this.rangeWindow()&&(this._maxDate=e.clone().add(this.rangeWindow(),"days"))):(this.rangeEnd=e,this.daysSelected=2,this.updateRange(),this._maxDate=null);break;case 2:this.daysSelected=1,this.rangeStart=e,this.rangeEnd=null,this.rangeWindow()&&(this._maxDate=e.clone().add(this.rangeWindow(),"days"))}}},{key:"moveCalenders",value:function(e,t){this.areCalendarsLinked()?(this.startCalendar=this.startCalendar.clone().add(e,"M"),this.endCalendar=this.endCalendar.clone().add(e,"M")):"start"===t?this.startCalendar=this.startCalendar.clone().add(e,"M"):this.endCalendar=this.endCalendar.clone().add(e,"M")}},{key:"isMomentRange",value:function(e){var t=!1;return e&&e.start&&e.end&&(t=this.Moment.isMoment(this.range.start)&&this.Moment.isMoment(this.range.end)),t}},{key:"watchRangeChange",value:function(){var e=this;this.Scope.$watchGroup([function(){return e.rangeStart},function(){return e.rangeEnd}],function(t,a){var n=t[0],i=t[1],r=a[0],s=a[1];e.maxDay()&&n.isSame(e.maxDay(),"M")&&(n=n.clone().subtract(1,"M")),e.startCalendar||e.endCalendar||(e.startCalendar=n,e.endCalendar=n.clone().add(1,"M")),e.areCalendarsLinked()?n.isSame(e.startCalendar,"M")||n.isSame(e.endCalendar,"M")?i&&i.isAfter(e.endCalendar,"M")?(e.startCalendar=i,e.endCalendar=i.clone().add(1,"M")):n.isSame(e.endCalendar,"M")||(e.startCalendar=n,e.endCalendar=n.clone().add(1,"M")):n.isSame(r,"M")&&i&&!i.isSame(s,"M")?(e.startCalendar=i.clone().subtract(1,"M"),e.endCalendar=i):(e.startCalendar=n,e.endCalendar=n.clone().add(1,"M")):n.isSame(e.startCalendar,"M")||n.isSame(e.endCalendar,"M")?i&&i.isAfter(e.endCalendar,"M")&&(e.endCalendar=i):n.isBefore(e.startCalendar,"M")?(e.startCalendar=n,i&&!i.isSame(e.endCalendar,"M")&&(n.isSame(i,"M")?e.endCalendar=n.clone().add(1,"M"):e.endCalendar=i)):n.isAfter(e.endCalendar)&&(e.startCalendar=n,e.endCalendar=n.clone().add(1,"M"))})}},{key:"areCalendarsLinked",value:function(){return angular.isDefined(this.linkedCalendars())?this.linkedCalendars():!0}},{key:"getMinDate",value:function(){return this._minDate&&this.minDay()?this.Moment.min(this._minDate,this.minDay()):this._minDate||this.minDay()}},{key:"getMaxDate",value:function(){return this._maxDate&&this.maxDay()?this.Moment.max(this._maxDate,this.maxDay()):this._maxDate||this.maxDay()}}]),e}()},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(){"ngInject";var e={restrict:"E",scope:{minDay:"&",maxDay:"&",weekStart:"&",getMonth:"&month",getInterceptors:"&interceptors",rangeStart:"&",rangeEnd:"&",selectedDay:"&",minMonth:"&",maxMonth:"&",weekDaysName:"&",monthFormat:"&",inputFormat:"&",showInput:"&",api:"=?"},templateUrl:"app/directives/calendar/calendar.html",controller:s,controllerAs:"month",bindToController:!0,link:function(e,t,a,n){n.init()}};return e}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};t.Calendar=n;var s=function(){function e(t,n,i){"ngInject";a(this,e),this.Moment=t,this.Scope=n,this.Attrs=i}return e.$inject=["moment","$scope","$attrs"],i(e,[{key:"init",value:function(){this.api&&this.setApi(),this.render()}},{key:"setApi",value:function(){r(this.api,{render:this.render.bind(this),moveToNext:this.moveToNext.bind(this),showLeftArrow:this.showLeftArrow.bind(this)})}},{key:"render",value:function(){this.defaultWeekDaysNames=this.weekDaysName()||["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],this.firstDayOfWeek=this.weekStart()||"su",this.daysOfWeek=this.buildWeek(this.firstDayOfWeek),this.calendar=this.buildCalendar(this.getMonth()),this.interceptors=this.getInterceptors()||{},this.setListeners(),this.daysName=this.setWeekDaysNames(this.daysOfWeek)}},{key:"setValue",value:function(){this.selectedDay()&&(this.value=this.selectedDay().format(this.getInputFormat()))}},{key:"setWeekDaysNames",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?this.defaultWeekDaysNames:arguments[1],a=[],n=this.Moment.weekdaysMin().reduce(function(e,t,a){return e[t.toLowerCase()]=a,e},{});return e.forEach(function(e,i){var r=n[e];a[i]=t[r]}),a}},{key:"setListeners",value:function(){var e=this;this.Scope.$watch(function(){return e.getMonth()},function(t){e.calendar=e.buildCalendar(t)}),this.Scope.$watchGroup([function(){return e.rangeStart()},function(){return e.rangeEnd()}],function(){e.setValue(),e.updateDaysProperties(e.calendar.monthWeeks)})}},{key:"updateDaysProperties",value:function(e){var t=this,a=this.minDay(),n=this.maxDay(),i=this.selectedDay(),r=this.rangeStart(),s=this.rangeEnd();e.forEach(function(e){e.forEach(function(e){e.selected=e.mo.isSame(i||null,"day"),e.inRange=t.isInRange(e.mo),e.rangeStart=e.mo.isSame(r||null,"day"),e.rangeEnd=e.mo.isSame(s||null,"day"),e.disabled=!1,a&&(e.disabled=e.mo.isBefore(a,"day")),n&&!e.disabled&&(e.disabled=e.mo.isAfter(n,"day"))})})}},{key:"buildWeek",value:function(e){var t=this.Moment.weekdaysMin().map(function(e){return e.toLowerCase()}),a=t.indexOf(e.toLowerCase()),n=t.slice(0,a),i=t.slice(a,t.length),r=i.concat(n);return r}},{key:"buildCalendar",value:function(){for(var e=arguments.length<=0||void 0===arguments[0]?this.Moment():arguments[0],t=[[],[],[],[],[],[]],a=this.getMonthDateRange(e.year(),e.month()+1),n=a.start,i=this.daysOfWeek.indexOf(n.format("dd").toLowerCase()),r=n.clone().subtract(i,"d"),s=0;6>s;s++)for(var o=0;7>o;o++)t[s][o]={mo:r,currentDay:r.isSame(this.Moment(),"day"),currentMonth:r.isSame(e,"month")},r=r.clone().add(1,"d");return this.updateDaysProperties(t),{currentCalendar:e,selectedDate:e,firstDayOfMonth:a.start.format("D"),lastDayOfMonth:a.end.format("D"),monthWeeks:t}}},{key:"moveCalenderByMonth",value:function(e){var t=this.calendar.currentCalendar;this.month=t.clone().add(e,"M"),this.calendar=this.buildCalendar(this.month.clone())}},{key:"moveToNext",value:function(){this.interceptors.moveToNextClicked?this.interceptors.moveToNextClicked.call(this.interceptors.context):this.moveCalenderByMonth(1)}},{key:"moveToPrev",value:function(){this.interceptors.moveToPrevClicked?this.interceptors.moveToPrevClicked.call(this.interceptors.context):this.moveCalenderByMonth(-1)}},{key:"getMonthDateRange",value:function(e,t){var a=this.Moment([e,t-1]),n=this.Moment(a).endOf("month");return{start:a,end:n}}},{key:"isInRange",value:function(e){var t=!1,a=this.rangeStart()||null,n=this.rangeEnd()||null;return t=e.isBetween(a,n)||e.isSame(a,"day")||t||e.isSame(n,"day")}},{key:"daySelected",value:function(e){e.disabled||this.interceptors.daySelected&&this.interceptors.daySelected.call(this.interceptors.context,e.mo)}},{key:"dateInputEntered",value:function(e,t){13==e.keyCode&&(this.dateInputSelected(e,t),e.preventDefault())}},{key:"dateInputSelected",value:function(e,t){var a=this.Moment(t,this.getInputFormat(),!0);if(a.isValid()){var n=this.minDay(),i=this.maxDay();a=n&&a.isBefore(n,"day")?n:a,a=i&&a.isAfter(i,"day")?i:a,this.selectedDay()&&this.selectedDay().isSame(a,"day")||(this.interceptors.inputSelected?this.interceptors.inputSelected(a):this.daySelected({mo:a}))}}},{key:"getFormattedMonth",value:function(e){return this.Moment(e).format(this.getMonthFormat())}},{key:"getMonthFormat",value:function(){return this.monthFormat()||"MMMM YYYY"}},{key:"getInputFormat",value:function(){return this.inputFormat()||"MMM DD, YYYY"}},{key:"showLeftArrow",value:function(){return this.minMonth()?!this.minMonth().isSame(this.calendar.currentCalendar.clone().subtract(1,"M"),"M"):this.minDay()?!this.minDay().isSame(this.calendar.currentCalendar,"M"):!0}},{key:"showRightArrow",value:function(){return this.maxMonth()?!this.maxMonth().isSame(this.getMonth().clone().add(1,"M"),"M"):this.maxDay()?!this.maxDay().isSame(this.getMonth(),"M"):!0}},{key:"_showInput",value:function(){return angular.isDefined(this.showInput())?this.showInput():!0}}]),e}()},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(){"ngInject";var e={restrict:"E",scope:{weekStart:"&",range:"=?",weekDaysName:"&",format:"&",ranges:"&",minDay:"&",maxDay:"&",monthFormat:"&",inputFormat:"&",onApply:"&",linkedCalendars:"&",autoApply:"&",disabled:"&",calendarsAlwaysOn:"&",rangeWindow:"&",api:"=?"},controller:o,templateUrl:"app/directives/ob-date-range-picker/ob-date-range-picker.html",controllerAs:"obDateRangePicker",bindToController:!0,link:function(e,t,a,n){n.init()}};return e}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){var a=[],n=!0,i=!1,r=void 0;try{for(var s,o=e[Symbol.iterator]();!(n=(s=o.next()).done)&&(a.push(s.value),!t||a.length!==t);n=!0);}catch(d){i=!0,r=d}finally{try{!n&&o["return"]&&o["return"]()}finally{if(i)throw r}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};t.ObDateRangePicker=n;var o=function(){function e(t,n,i,r,s){"ngInject";var o=this;a(this,e),this.Element=n,this.Document=t,this.Scope=i,this.Moment=r,this.dateRangePickerConf=s,this.pickerApi={},this.events={documentClick:function(){o.elemClickFlag?o.elemClickFlag=!1:o.isPickerVisible&&(o.discardChanges(),o.Scope.$apply())},documentEsc:function(e){27==e.keyCode&&o.isPickerVisible&&(o.discardChanges(),o.hidePicker(),o.Scope.$apply())},pickerClick:function(){o.elemClickFlag=!0,o.Scope.$apply()}}}return e.$inject=["$document","$element","$scope","moment","dateRangePickerConf"],r(e,[{key:"init",value:function(){var e=this;this.range=this.range||this.dateRangePickerConf.range||{},this.weekStart=this.weekStart()?this.weekStart:function(){return e.dateRangePickerConf.weekStart},this.weekDaysName=this.weekDaysName()?this.weekDaysName:function(){return e.dateRangePickerConf.weekDaysName},this.format=this.format()?this.format:function(){return e.dateRangePickerConf.format},this.ranges=this.ranges()?this.ranges:function(){return e.dateRangePickerConf.ranges},this.minDay=this.minDay()?this.minDay:function(){return e.dateRangePickerConf.minDay},this.maxDay=this.maxDay()?this.maxDay:function(){return e.dateRangePickerConf.maxDay},this.monthFormat=this.monthFormat()?this.monthFormat:function(){return e.dateRangePickerConf.monthFormat},this.inputFormat=this.inputFormat()?this.inputFormat:function(){return e.dateRangePickerConf.inputFormat},this.linkedCalendars=angular.isDefined(this.linkedCalendars())?this.linkedCalendars:function(){return e.dateRangePickerConf.linkedCalendars},this.autoApply=angular.isDefined(this.autoApply())?this.autoApply:function(){return e.dateRangePickerConf.autoApply},this.disabled=angular.isDefined(this.disabled())?this.disabled:function(){return e.dateRangePickerConf.disabled},this.calendarsAlwaysOn=angular.isDefined(this.calendarsAlwaysOn())?this.calendarsAlwaysOn:function(){return e.dateRangePickerConf.calendarsAlwaysOn},this.rangeWindow=angular.isDefined(this.rangeWindow())?this.rangeWindow:function(){return e.dateRangePickerConf.rangeWindow},this.isCustomVisible=this.calendarsAlwaysOn(),this.setOpenCloseLogic(),this.setWatchers(),this.value="Select a Range",this.api&&s(this.api,{setDateRange:this.setDateRange.bind(this),togglePicker:this.togglePicker.bind(this),render:function(){e.render(),e.pickerApi.render()}}),this.preRanges=this.ranges()||[],this.preRanges.length?this.preRanges.push({name:"Custom",isCustom:!0}):this.isCustomVisible=!0,this.render(),this.setListeners()}},{key:"render",value:function(){if(this._range={start:this.Moment(),end:this.Moment()},this.setPredefinedStatus(),this.range.start&&this.range.end&&!this.Moment.isMoment(this.range.start)&&!this.Moment.isMoment(this.range.end)&&this.format())this._range={start:this.Moment(this.range.start,this.getFormat()),end:this.Moment(this.range.end,this.getFormat())};else if(this.Moment.isMoment(this.range.start)&&this.Moment.isMoment(this.range.end))this._range={start:this.range.start,end:this.range.end};else if(this.preRanges.length>1){var e=this.preRanges[0];this._range.start=e.start,this._range.end=e.end}this._range.start.isAfter(this._range.end)?this._range.start=this._range.end.clone():this._range.end.isBefore(this._range.start)&&(this._range.end=this._range.start.clone()),this.applyMinMaxDaysToRange(),this.setRange(),this.markPredefined(this._range.start,this._range.end),this.setPickerInterceptors(),this.isCustomVisible=this.calendarsAlwaysOn()}},{key:"applyMinMaxDaysToRange",value:function(){if(this.minDay()){var e=this._getMinDay();this._range.start=this._range.start.isBefore(e,"d")?e:this._range.start,this._range.end=this._range.end.isBefore(e,"d")?e:this._range.end}if(this.maxDay()){var t=this._getMaxDay();this._range.start=this._range.start.isAfter(t)?t:this._range.start,this._range.end=this._range.end.isAfter(t)?t:this._range.end}}},{key:"setPickerInterceptors",value:function(){var e=this;this.pickerInterceptors={rangeSelectedByClick:function(){e.autoApply()&&e.applyChanges()}}}},{key:"setPredefinedStatus",value:function(){var e=this;this.preRanges.forEach(function(t){if(!t.isCustom){if(t.disabled=!1,e.minDay()){var a=e._getMinDay();t.disabled=t.start.isBefore(a,"d")}if(!t.disabled&&e.maxDay()){var n=e._getMaxDay();t.disabled=t.end.isAfter(n,"d")}}})}},{key:"setWatchers",value:function(){var e=this;this.Scope.$watchGroup([function(){return e._range.start},function(){return e._range.end}],function(t){var a=i(t,2),n=a[0],r=a[1];e.selfChange||n&&r&&(e.preRanges.length&&(e.preRanges[e.preRanges.length-1].start=n,e.preRanges[e.preRanges.length-1].end=r,e.markPredefined(n,r)),e.value=e.getRangeValue()),e.selfChange=!1})}},{key:"setOpenCloseLogic",value:function(){this.isPickerVisible=!1,this.pickerPopup=angular.element(this.Element[0].querySelector(".picker")),this.elemClickFlag=!1}},{key:"setListeners",value:function(){var e=this;this.pickerPopup.on("click",this.events.pickerClick.bind(this)),this.Scope.$on("$destroy",function(){e.pickerPopup.off("click",e.events.pickerClick)})}},{key:"togglePicker",value:function(){var e=angular.isDefined(this.disabled())?this.disabled():!1;e||this.isPickerVisible?this.hidePicker():(this.isPickerVisible=!0,this.elemClickFlag=!0,this.Document.on("click",this.events.documentClick),this.Document.on("keydown",this.events.documentEsc))}},{key:"hidePicker",value:function(){this.isPickerVisible=!1,this.Document.off("click",this.events.documentClick),this.Document.off("keydown",this.events.documentClick)}},{key:"setRange",value:function(){var e=arguments.length<=0||void 0===arguments[0]?this._range:arguments[0];this.format()?(this.range.start=e.start.format(this.getFormat()),this.range.end=e.end.format(this.getFormat())):(this.range.start=e.start,this.range.end=e.end)}},{key:"predefinedRangeSelected",value:function(e,t){e.disabled||(e.isCustom?this.isCustomVisible=!0:(this.selfChange=!0,this.selectedRengeIndex=t,this.value=e.name,this._range.start=e.start,this._range.end=e.end,this.isCustomVisible=this.calendarsAlwaysOn()||!1,this.applyChanges()))}},{key:"getFormat",value:function(){return this.format()||"MM-DD-YYYY"}},{key:"discardChanges",value:function(){var e=this.getFormat(),t=this.Moment(this.range.start,e),a=this.Moment(this.range.end,e);this._range.start=t,this._range.end=a,this.value=this.getRangeValue(),this.pickerApi.setCalendarPosition(t,a),this.hidePicker()}},{key:"markPredefined",value:function(e,t){this.selectedRengeIndex=this.preRanges.findIndex(function(a){return e.isSame(a.start,"day")&&t.isSame(a.end,"day")})}},{key:"getRangeValue",value:function(){var e=this,t=void 0,a=this.getInputFormat();if(this.preRanges.length){var n=this.preRanges.findIndex(function(t){return e._range.start.isSame(t.start,"day")&&e._range.end.isSame(t.end,"day")});-1!==n&&(t=this.preRanges[n].isCustom?this.preRanges[n].start.format(a)+" - "+this.preRanges[n].end.format(a):this.preRanges[n].name)}else t=this._range.start.format(a)+" - "+this._range.end.format(a);return t}},{key:"applyChanges",value:function(){var e=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this.setRange(),this.hidePicker(),this.pickerApi.setCalendarPosition&&this.pickerApi.setCalendarPosition(this._range.start,this._range.end),e&&this.onApply&&this.onApply({start:this._range.start,end:this._range.end})}},{key:"getInputFormat",value:function(){return this.inputFormat()||"MMM DD, YYYY"}},{key:"setDateRange",value:function(e){this._range.start=e.start,this._range.end=e.end,this.applyChanges(!1)}},{key:"_getMinDay",value:function(){return this.minDay()?this.Moment(this.minDay(),this.getFormat()):void 0}},{key:"_getMaxDay",value:function(){return this.maxDay()?this.Moment(this.maxDay(),this.getFormat()):void 0}}]),e}()},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(){"ngInject";var e={restrict:"E",scope:{weekStart:"&",selectedDay:"=?",weekDaysName:"&",format:"&",minDay:"&",maxDay:"&",monthFormat:"&",inputFormat:"&",onApply:"&",disabled:"&",formName:"@name",isValidDateEnabled:"&validDay",autoApply:"&",api:"=?"},controller:s,templateUrl:"app/directives/ob-day-picker/ob-day-picker.html",controllerAs:"dayPicker",bindToController:!0,link:function(e,t,a,n){n.init()}};return e}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};t.ObDayPicker=n;var s=function(){function e(t,n,i,r,s,o){"ngInject";var d=this;a(this,e),this.Element=n,this.Document=t,this.Scope=i,this.$timeout=r,this.Moment=s,this.datePickerConf=o,this.events={documentClick:function(){d.elemClickFlag?d.elemClickFlag=!1:(d.onBlur(),d.Scope.$digest())},pickerClick:function(){d.elemClickFlag=!0,d.Scope.$digest()}}}return e.$inject=["$document","$element","$scope","$timeout","moment","datePickerConf"],i(e,[{key:"init",value:function(){var e=this;this.weekStart=this.weekStart()?this.weekStart:function(){return e.datePickerConf.weekStart},this.weekDaysName=this.weekDaysName()?this.weekDaysName:function(){return e.datePickerConf.weekDaysName},this.format=this.format()?this.format:function(){return e.datePickerConf.format},this.minDay=this.minDay()?this.minDay:function(){return e.datePickerConf.minDay},this.maxDay=this.maxDay()?this.maxDay:function(){return e.datePickerConf.maxDay},this.monthFormat=this.monthFormat()?this.monthFormat:function(){return e.datePickerConf.monthFormat},this.inputFormat=this.inputFormat()?this.inputFormat:function(){return e.datePickerConf.inputFormat},this.autoApply=angular.isDefined(this.autoApply())?this.autoApply:function(){return e.datePickerConf.autoApply},this.disabled=angular.isDefined(this.disabled())?this.disabled:function(){return e.datePickerConf.disabled},this.isValidDateEnabled=angular.isDefined(this.isValidDateEnabled())?this.isValidDateEnabled:function(){return e.datePickerConf.isValidDateEnabled},this.formName=this.formName||"dayPickerInput",this.setOpenCloseLogic(),this._selectedDay=this.getSelectedDay(),this.value=this.Moment(this._selectedDay).format(this.getFormat()),this.setCalendarInterceptors(),this.calendarApi={},this.api&&r(this.api,{render:function(){e.render()}}),this.setListeners(),this.dayValidity=this.checkIfDayIsValid(this._selectedDay),this.$timeout(function(){e.applyValidity(e.dayValidity)})}},{key:"render",value:function(){this.dayValidity=this.checkIfDayIsValid(this._selectedDay),this.applyValidity(this.dayValidity),this.calendarApi.render&&this.calendarApi.render()}},{key:"setOpenCloseLogic",value:function(){this.isPickerVisible=!1,this.pickerPopup=angular.element(this.Element[0].querySelector(".picker")),this.elemClickFlag=!1}},{key:"setCalendarInterceptors",value:function(){this.calendarInterceptors={daySelected:this.daySelected.bind(this)}}},{key:"setListeners",value:function(){var e=this;this.pickerPopup.on("click",this.events.pickerClick.bind(this)),this.Scope.$on("$destroy",function(){e.pickerPopup.off("click",e.events.pickerClick),e.Document.off("click",e.events.documentClick)}),this.Scope.$watchGroup([function(){return e.Moment(e.minDay(),e.getFormat()).format()},function(){return e.Moment(e.maxDay(),e.getFormat()).format()}],function(t,a){(t&&t[0]||a&&a[0])&&e.render()}),this.Scope.$watch(function(){return e.selectedDay},function(){e.value=e.Moment(e.getSelectedDay()).format(e.getFormat())})}},{key:"showPicker",value:function(){var e=angular.isDefined(this.disabled())?this.disabled():!1;e||this.isPickerVisible||(this.isPickerVisible=!0,this.Document.on("click",this.events.documentClick)),this.elemClickFlag=!0}},{key:"hidePicker",value:function(){this.isPickerVisible=!1,this.Document.off("click",this.events.documentClick)}},{key:"daySelected",value:function(e){var t=this,a=arguments.length<=1||void 0===arguments[1]?100:arguments[1];this.applyValidity(this.checkIfDayIsValid(e)),e.isSame(this._selectedDay,"day")?this.hidePicker():(this.calendarApi.render(),this.value=this.Moment(e).format(this.getFormat()),this._selectedDay=e,this.$timeout(function(){t.hidePicker(),t.updateSelectedDate(e)},a))}},{key:"dateInputEntered",value:function(e,t){var a=this.checkIfDayIsValid(t);switch(e.keyCode){case 9:case 13:var n=this.getInputValue();a?this.daySelected(n,0):(this.hidePicker(),13===e.keyCode&&e.preventDefault());break;case 40:this.isPickerVisible=!0;break;case 27:this.isPickerVisible=!1,this.value=this._selectedDay.format(this.getFormat())}}},{key:"getInputValue",value:function(){return this.Moment(this.value,this.getFormat(),!0)}},{key:"onBlur",value:function(){var e=this.getInputValue(),t=this.checkIfDayIsValid(e);t?this.daySelected(e):this.hidePicker()}},{key:"updateValidity",value:function(){var e=this.getInputValue(),t=this.checkIfDayIsValid(e);this.applyValidity(t),t&&this.autoApply()&&!e.isSame(this._selectedDay,"day")&&(this._selectedDay=e,this.updateSelectedDate(e))}},{key:"checkIfDayIsValid",value:function(e){var t=this.Moment(e,this.getFormat(),!0),a=this._getMinDay(),n=this._getMaxDay(),i=t.isValid();return i&&a&&(i=t.isAfter(a,"day")||t.isSame(a,"day")),i&&n&&(i=t.isBefore(n,"day")||t.isSame(n,"day")),i}},{key:"applyValidity",value:function(e){this.Scope[this.formName]&&(this.disabled&&this.disabled()?(this.Scope[this.formName].$setValidity("validDay",!0),this.dayValidity=!0):this.isValidDateEnabled()&&this.Scope[this.formName]&&(this.Scope[this.formName].$setValidity("validDay",e),this.dayValidity=e))}},{key:"updateSelectedDate",value:function(){var e=arguments.length<=0||void 0===arguments[0]?this._selectedDay:arguments[0];this.format()?this.selectedDay=e.format(this.getFormat()):this.selectedDay=e,this.onApply({day:this.selectedDay})}},{key:"getSelectedDay",value:function(){return this.Moment(this.selectedDay||this.Moment(),this.getFormat())}},{key:"getFormat",value:function(){return this.format()||"MMM DD, YYYY"}},{key:"_getMinDay",value:function(){return this.minDay()?this.Moment(this.minDay(),this.getFormat()):void 0}},{key:"_getMaxDay",value:function(){return this.maxDay()?this.Moment(this.maxDay(),this.getFormat()):void 0}}]),e}()},function(e,t){"use strict";Array.prototype.findIndex||(Array.prototype.findIndex=function(e){if(null===this)throw new TypeError("Array.prototype.findIndex called on null or undefined");if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var t,a=Object(this),n=a.length>>>0,i=arguments[1],r=0;n>r;r++)if(t=a[r],e.call(i,t,r,a))return r;return-1})}]),angular.module("obDateRangePicker").run(["$templateCache",function(e){e.put("app/directives/calendar/calendar.html",'<div class="input-container" ng-if="month._showInput()"><label>{{month.Attrs.label}}</label> <input type="text" ng-model="month.value" ng-keypress="month.dateInputEntered($event, month.value)" ng-blur="month.dateInputSelected($event, month.value)"></div><div class="header"><span class="arrow-btn left" ng-if="month.showLeftArrow()" ng-click="month.moveToPrev()"></span> <span class="date">{{month.getFormattedMonth(month.calendar.currentCalendar)}}</span> <span class="arrow-btn right" ng-if="month.showRightArrow()" ng-click="month.moveToNext(1)"></span></div><div class="board"><div class="days-of-week"><span class="day-name" ng-repeat="day in month.daysName track by $index">{{day}}</span></div><div class="weeks"><div ng-repeat="week in month.calendar.monthWeeks track by $index"><span class="day" ng-repeat="day in week track by $index" ng-class="{ \'selected\': day.selected, \'current\': day.currentDay, \'other-month\': !day.currentMonth, \'in-range\': day.inRange, \'range-start\': day.rangeStart, \'range-end\': day.rangeEnd, \'disabled\': day.disabled }" ng-click="month.daySelected(day)">{{day.mo.format(\'D\')}}</span></div></div></div>'),e.put("app/directives/date-range-picker/date-range-picker.html",'<calendar class="calendar" api="picker.startCalendarApi" min-day="picker.getMinDate()" max-day="picker.getMaxDate()" week-start="picker.weekStart()" month="picker.startCalendar" interceptors="picker.startCalendarInterceptors" range-start="picker.rangeStart" range-end="picker.rangeEnd" selected-day="picker.rangeStart" max-month="picker.endCalendar" week-days-name="picker.weekDaysName()" month-format="picker.monthFormat()" input-format="picker.inputFormat()" label="Start Date"></calendar><calendar class="calendar" api="picker.endCalendarApi" min-day="picker.getMinDate()" max-day="picker.getMaxDate()" week-start="picker.weekStart()" month="picker.endCalendar" interceptors="picker.endCalendarInterceptors" range-start="picker.rangeStart" range-end="picker.rangeEnd" selected-day="picker.rangeEnd" min-month="picker.startCalendar" week-days-name="picker.weekDaysName()" month-format="picker.monthFormat()" input-format="picker.inputFormat()" label="End Date"></calendar>'),
e.put("app/directives/ob-date-range-picker/ob-date-range-picker.html",'<div class="picker-dropdown-container" ng-class="{\'disabled\': obDateRangePicker.disabled()}"><div class="picker-dropdown" ng-class="{\'open\': obDateRangePicker.isPickerVisible}" ng-click="obDateRangePicker.togglePicker()"><span>{{obDateRangePicker.value}}</span></div><div class="picker" ng-class="{\'open\': obDateRangePicker.isPickerVisible}" ng-show="obDateRangePicker.isPickerVisible"><div class="date-range" ng-show="obDateRangePicker.isCustomVisible"><date-range-picker ng-if="obDateRangePicker.isPickerVisible" api="obDateRangePicker.pickerApi" interceptors="obDateRangePicker.pickerInterceptors" linked-calendars="obDateRangePicker.linkedCalendars()" week-start="obDateRangePicker.weekStart()" range="obDateRangePicker._range" week-days-name="obDateRangePicker.weekDaysName()" min-day="obDateRangePicker._getMinDay()" max-day="obDateRangePicker._getMaxDay()" month-format="obDateRangePicker.monthFormat()" input-format="obDateRangePicker.inputFormat()" range-window="obDateRangePicker.rangeWindow()"></date-range-picker></div><div class="ranges-actions" ng-class="{\'custom-open\': obDateRangePicker.isCustomVisible}"><div class="ranges"><div class="range" ng-repeat="range in obDateRangePicker.preRanges track by $index" ng-class="{\'selected\': obDateRangePicker.selectedRengeIndex === $index, \'disabled\': range.disabled}" ng-click="obDateRangePicker.predefinedRangeSelected(range, $index)" ng-if="!$last || ($last && !obDateRangePicker.calendarsAlwaysOn())">{{range.name}}</div></div><div class="actions" ng-if="!obDateRangePicker.autoApply()"><div class="drp_btn cancel" ng-click="obDateRangePicker.discardChanges()">Cancel</div><div class="drp_btn apply" ng-click="obDateRangePicker.applyChanges()">APPLY</div></div></div></div></div>'),e.put("app/directives/ob-day-picker/ob-day-picker.html",'<div ng-form="{{::dayPicker.formName}}" class="picker-dropdown-container" ng-class="{\'open\': dayPicker.isPickerVisible, \'disabled\': dayPicker.disabled(), \'invalid\': !dayPicker.dayValidity}"><input class="picker-input" ng-model="dayPicker.value" ng-change="dayPicker.updateValidity()" ng-keydown="dayPicker.dateInputEntered($event, dayPicker.value)" ng-click="dayPicker.showPicker()" ng-disabled="dayPicker.disabled()"><div class="picker" ng-show="dayPicker.isPickerVisible"><calendar class="calendar" api="dayPicker.calendarApi" min-day="dayPicker._getMinDay()" max-day="dayPicker._getMaxDay()" week-start="dayPicker.weekStart()" month="dayPicker._selectedDay" interceptors="dayPicker.calendarInterceptors" selected-day="dayPicker._selectedDay" min-month="dayPicker.startCalendar" week-days-name="dayPicker.weekDaysName()" month-format="dayPicker.monthFormat()" show-input="false"></calendar></div></div>')}]);
//# sourceMappingURL=maps/ob-daterangepicker.js.map
