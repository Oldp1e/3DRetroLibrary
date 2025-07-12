# Audio Files

This directory should contain the following audio files:

## Required Audio Files:

### retro-theme.mp3
- **Purpose**: Background music that plays in loop
- **Format**: MP3
- **Recommended**: Retro/synthwave theme music
- **Duration**: 2-4 minutes (will loop automatically)
- **Volume**: Will be played at 30% of user volume setting

### start.mp3
- **Purpose**: Sound effect when cartridge is inserted
- **Format**: MP3
- **Recommended**: Classic arcade/console startup sound
- **Duration**: 1-3 seconds
- **Volume**: Will be played at user volume setting

## How to add audio files:

1. Place your MP3 files in this directory (`public/audio/`)
2. Make sure the filenames match exactly: `retro-theme.mp3` and `start.mp3`
3. The audio system will automatically load and play them

## Audio System Features:

- **Background Music**: Automatically starts playing and loops
- **Sound Effects**: Triggered by game interactions
- **Volume Control**: User can adjust volume with the retro volume knob
- **Browser Compatibility**: Works with modern browsers (requires user interaction to start)

## Recommended Audio Sources:

- **Free Music**: YouTube Audio Library, Freesound.org, Zapsplat
- **Retro Sounds**: Classic arcade game sounds, synthwave music
- **File Size**: Keep files under 5MB for better loading performance

## Troubleshooting:

- If audio doesn't play, check browser autoplay policies
- Ensure files are in MP3 format
- Check file paths and names match exactly
- Test with user interaction (click/keyboard) to trigger autoplay
