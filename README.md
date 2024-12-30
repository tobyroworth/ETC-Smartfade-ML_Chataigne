# ETC Smartfade ML module for Chataigne

Adds support for [ETC Smartfade ML](https://www.etcconnect.com/Products/Legacy/Console/Smart-Family/SmartFade-ML/Features.aspx) to [Chataigne](https://benjamin.kuperberg.fr/chataigne) using MIDI in/out.

Based on the "Basic MIDI Implementation" documentation in the [User Manual](https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737461284)

## Usage

### Setup

Plug MIDI cable from computer to console. _Note that MIDI inputs should be used, not USB._

Set In / Out devices (will usually be the same device).

Set MIDI channel on console (see [User Manual](https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737461284)

Set matching send/receive channel in parameters (will usually be the same).

### Values

Values will follow fader movements on the console (values shown in Chataigne are readonly for now).

The four masters, and 24 memory faders are available.

### Commands

- __Memory > Level__ set fader level.
- __Memory > Bump__ Bump a memory. Time bump button is "held down" is set by `Bump Time` parameter.
- __Memory > Crossfade__ fade `To` memory in, followed by fading `From` memory out. `Time` is applied to _each_ fade.
- __Memory > Memory Page__ set memory page.

- __Stack > Reset__ Reset the cue stack to before first cue.
- __Stack > Goto__ Set cue in stack.
- __Stack > Pause__
- __Stack > Start/GO__
- __Stack > Blackout__
