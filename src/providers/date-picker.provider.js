module.exports = function DatePickerProvider () {
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
