module.exports = function DateRangePickerProvider () {
  var config = {}

  return {
    setConfig: function (userConfig) {
      config = userConfig
    },
    $get: function () {
      return config
    }
  }
}
