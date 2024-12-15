var activeFades = [];

var now = 0;

function init() {
  now = util.getTimestamp() * 1000;
  script.setUpdateRate(127);
}

function update(deltaTime) {
  now += deltaTime * 1000;
  for (var i = 0; i < activeFades.length; i++) {
    var fade = activeFades[i];
    if (fade) {
      var currentTime = now - fade.startTime;
      if (currentTime < 0) {
        continue;
      }
      var totalTime = Math.max(fade.endTime - fade.startTime, 1);
      var completion = Math.min(currentTime / totalTime, 1);
      var newValue = fade.startValue + (completion * (fade.endValue - fade.startValue));
      newValue = Math.round(newValue);
      if (newValue == fade.value) {
        continue;
      }
      fade.value = newValue;
      if (newValue == fade.endValue) {
        activeFades[i] = null;
      }
      setLevel(0, i, newValue);
    }
  }
}

function setLevel(channelType, channelNumber, level) {

  if (channelType != 0) {
    channelNumber = channelType;
  }

  local.sendCC(local.parameters.midiChannel.send.get(), channelNumber, level);
}

function fade(channelNumber, start, end, timeMs, delayMs) {
  var now = util.getTimestamp() * 1000;
  activeFades[channelNumber] = {
    startTime: now + delayMs,
    endTime: now + delayMs + timeMs,
    startValue: start,
    endValue: end,
    value: null
  };
}

function crossfade(fromChannel, toChannel, time) {
  var timeMs = time * 100;
  fade(toChannel, 0, 127, timeMs, 0);
  fade(fromChannel, 127, 0, timeMs, timeMs);
}