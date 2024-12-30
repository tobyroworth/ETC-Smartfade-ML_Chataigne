var activeFades = [];
var activeBumps = [];

var now = 0;

function init() {
  now = util.getTimestamp();
  script.setUpdateRate(127);
}

function update(deltaTime) {
  now += deltaTime;
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
  for (var i = 0; i < activeBumps.length; i++) {
    var bump = activeBumps[i];
    if (bump) {
      // var currentTime = now - bump.startTime;
      // if (currentTime < 0) {
      //   continue;
      // }
      if ((!bump.active) && now >= bump.startTime) {
        sendBump(i, true);
        bump.active = true;
      } else if (bump.active && now >= bump.endTime) {
        sendBump(i, false);
        bump.active = false;
        activeBumps[i] = null;
      }
    }
  }
}

function setLevel(channelType, channelNumber, level) {

  if (channelType != 0) {
    channelNumber = channelType;
  }

  local.sendCC(local.parameters.midiChannel.send.get(), channelNumber, level);
}

function sendBump(channelNumber, active) {

  var note = channelNumber - 1; // convert 1-48 to 0-47

  if (active) {
    local.sendNoteOn(local.parameters.midiChannel.send.get(), note, 127);
  } else {
    local.sendNoteOff(local.parameters.midiChannel.send.get(), note);
  }
}

function fade(channelNumber, start, end, time, delay) {
  var now = util.getTimestamp();
  activeFades[channelNumber] = {
    startTime: now + delay,
    endTime: now + delay + time,
    startValue: start,
    endValue: end,
    value: null
  };
}

function bump(channelNumber) {
  var now = util.getTimestamp();
  activeBumps[channelNumber] = {
    startTime: now,
    endTime: now + local.parameters.bumpTime.get(),
    active: false
  };
}

function crossfade(fromChannel, toChannel, time) {
  fade(toChannel, 0, 127, time, 0);
  fade(fromChannel, 127, 0, time, time);
}

function setPage(page) {
  var programNumber = page + 99; //convert 1-12 to 100-111
  local.sendProgramChange(local.parameters.midiChannel.send.get(), programNumber);
}

function resetStack() {
  var programNumber = 0;
  local.sendProgramChange(local.parameters.midiChannel.send.get(), programNumber);
}

function goStack(cue) {
  var programNumber = cue;
  local.sendProgramChange(local.parameters.midiChannel.send.get(), programNumber);
}

function pauseStack() {
  var programNumber = 124;
  local.sendProgramChange(local.parameters.midiChannel.send.get(), programNumber);
}

function startStack() {
  var programNumber = 125;
  local.sendProgramChange(local.parameters.midiChannel.send.get(), programNumber);
}

function blackout(on) {
  var programNumber = on ? 127 : 126;
  local.sendProgramChange(local.parameters.midiChannel.send.get(), programNumber);
}