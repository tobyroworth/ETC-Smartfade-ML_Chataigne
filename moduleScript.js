function setLevel(channelType, channelNumber, level) {

  if (channelType != 0) {
    channelNumber = channelType;
  }

  local.sendCC(local.parameters.midiChannel.send.get(), channelNumber, level);
}
