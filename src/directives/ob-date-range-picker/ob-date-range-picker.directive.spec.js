describe('directive ob-date-range-picker', function () {
  var element, moment, defaultOptions, $compile, $scope, $rootScope, picker, elem;

  beforeEach(angular.mock.module('obDateRangePicker'));

  beforeEach(inject((_$compile_, _$rootScope_, _moment_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    moment = _moment_;
    $scope = $rootScope.$new();
    defaultOptions = {
      range: {
        start: moment(),
        end: moment()
      },
      ranges: [
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
      ],
      pickerApi: {}
    };
  }));

  function prepare(options) {
    $scope.picker = options;
    element = angular.element(`
      <ob-daterangepicker
        api="picker.pickerApi"
        linked-calendars="picker.linkedCalendars()"
        week-start="picker.weekStart"
        range="picker.range"
        ranges="picker.ranges"
        week-days-name="picker.weekDaysName"
        min-day="picker.getMinDay()"
        max-day="picker.getMaxDay()"
        month-format="picker.monthFormat"
        input-format="picker.inputFormat()"
        auto-apply="picker.autoApply"
        disabled="picker.disabled"
        calendars-always-on="picker.calendarsAlwaysOn">
      </ob-daterangepicker>
    `);

    $compile(element)($scope);
    $rootScope.$digest();
    picker = element.isolateScope().obDateRangePicker;
    elem = element[0];
  }

  it('should show picker after first toggle', () => {
    prepare(defaultOptions);
    picker.togglePicker();
    $rootScope.$digest();

    expect(picker.isPickerVisible).toEqual(true);
  });

  it('should hide picker after second toggle', () => {
    prepare(defaultOptions);
    picker.togglePicker();
    picker.togglePicker();
    $rootScope.$digest();

    expect(picker.isPickerVisible).toEqual(false);
  });

  it('should show picker after first toggle using api', () => {
    prepare(defaultOptions);
    $scope.picker.pickerApi.togglePicker();
    $rootScope.$digest();

    expect(picker.isPickerVisible).toEqual(true);
  });

  it('should hide picker after second toggle using api', () => {
    prepare(defaultOptions);
    $scope.picker.pickerApi.togglePicker();
    $scope.picker.pickerApi.togglePicker();
    $rootScope.$digest();

    expect(picker.isPickerVisible).toEqual(false);
  });

  it('should show 4 predefined, when the last is custom', () => {
    prepare(defaultOptions);
    $rootScope.$digest();

    expect(picker.preRanges.length).toEqual(4);
    expect(picker.preRanges[picker.preRanges.length - 1].isCustom).toEqual(true);
  });

  it('should select yesterday from predefined', () => {
    prepare(defaultOptions);
    angular.element(elem.querySelector('.picker-dropdown')).triggerHandler('click');
    picker.predefinedRangeSelected(picker.preRanges[1]);
    $rootScope.$digest();

    expect(picker.value).toEqual('Yesterday');
  });

  it('should not show any pre-defined date ranges and custom should be visible', () => {
    let options = Object.assign({}, defaultOptions);
    options.ranges = undefined;
    prepare(options);
    picker.togglePicker();
    $rootScope.$digest();

    expect(picker.preRanges.length).toEqual(0);
    expect(picker.isPickerVisible).toEqual(true);
  });

  it('should not close the picker when not set to auto apply', () => {
    prepare(defaultOptions);
    picker.togglePicker();
    $rootScope.$digest();

    let days = elem.querySelectorAll('.day');
    let startDay = angular.element(days[15]);
    let endDay = angular.element(days[17]);

    startDay.triggerHandler('click');
    $rootScope.$digest();
    endDay.triggerHandler('click');
    $rootScope.$digest();

    expect(picker.isPickerVisible).toEqual(true);
  });

  it('should close the picker when set to auto apply', () => {
    let options = Object.assign({
      autoApply: true
    }, defaultOptions);
    prepare(options);
    picker.togglePicker();
    $rootScope.$digest();

    let days = elem.querySelectorAll('.day');
    let startDay = angular.element(days[15]);
    let endDay = angular.element(days[17]);

    startDay.triggerHandler('click');
    $rootScope.$digest();
    endDay.triggerHandler('click');
    $rootScope.$digest();

    expect(picker.isPickerVisible).toEqual(false);
  });

  it('should not open picker if set to disabled', () => {
    let options = Object.assign({
      disabled: true
    }, defaultOptions);
    prepare(options);
    picker.togglePicker();
    $rootScope.$digest();

    expect(picker.isPickerVisible).toEqual(false);
  });

  it('should not show calendars if calendars-always-on is not set to true', () => {
    prepare(defaultOptions);
    picker.togglePicker();
    $rootScope.$digest();
    expect(elem.querySelectorAll('.ranges .range').length).toEqual(4);
    expect(angular.element(elem.querySelector('.date-range')).hasClass('ng-hide')).toEqual(true);
  });

  it('should show calendars if calendars-always-on is set to true', () => {
    let options = Object.assign({
      calendarsAlwaysOn: true
    }, defaultOptions);
    prepare(options);
    picker.togglePicker();
    angular.element(elem.querySelector('.picker-dropdown')).triggerHandler('click');
    $rootScope.$digest();
    expect(elem.querySelectorAll('.ranges .range').length).toEqual(3);
    expect(angular.element(elem.querySelector('.date-range')).hasClass('ng-hide')).toEqual(false);
  });
});
