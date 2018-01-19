var angular = require('angular')
var moment = require('moment')

require('../src')

angular.module('demo', ['angularjs-daterange'])
  .config(config)
  .controller('RangeController', RangeCtrl)
  .controller('DayController', DayCtrl)

function config (dateRangePickerConfProvider) {
  dateRangePickerConfProvider.setConfig({
    weekStart: 'mo'
  })
}

function RangeCtrl () {
  var _this = this
  // this.weekStart = 'su';
  this.dateRangeApi = {}
  this.dropsUp = false
  this.opens = 'left'
  this.disabled = false
  this.format = 'DD-MM-YYYY'
  this.autoApply = false
  this.linked = true
  this.calendarsAlwaysOn = true
  this.postfix = ''

  this.range = {
    start: moment(),
    end: moment()
  }
  this.rangeWindow = null

  this.ranges = [
    {
      name: 'Today',
      start: moment(),
      end: moment()
    },
    {
      name: 'Yesterday',
      start: moment().subtract(1, 'd'),
      end: moment().subtract(1, 'd')
    },
    {
      name: 'Current Month',
      start: moment().startOf('month'),
      end: moment()
    }
  ]

  this.rangeApplied = function (start, end) {
    console.log(start, end)
  }

  this.setDateRange = function () {
    _this.dateRangeApi.setDateRange({
      start: moment(),
      end: moment().add(2, 'd')
    })
  }

  this.render = function (e) {
    console.log(this.calendarsAlwaysOn)
    if (e) {
      e.keyCode == 13 && this.dateRangeApi.render()
    } else {
      _this.dateRangeApi.render()
    }
  }

  this.setRange = function () {
    this.dateRangeApi.setDateRange({
      start: moment().subtract(1, 'd'),
      end: moment().subtract(1, 'd')
    })
  }
}

function DayCtrl () {
  var _this = this
  this.weekStart = 'su'
  this.dayPickerApi = {}
  this.opens = 'left'
  this.format = 'MMM DD, YYYY'
  this.selectedDay = moment().add(-10, 'd').format(this.format)
  this.min = moment().subtract(5, 'd').format(this.format)
  this.disabled = true
  this.validateInput = true
  this.autoApply = true

  this.render = function (e) {
    if (e) {
      e.keyCode == 13 && this.dayPickerApi.render()
    } else {
      _this.dayPickerApi.render()
    }
  }

  this.onApply = function (day) {
    console.log(day)
  }
}
