class AudioManager {
  private static instance: AudioManager;
  private backgroundMusic: HTMLAudioElement | null = null;
  private soundEffects: { [key: string]: HTMLAudioElement } = {};
  private volume: number = 0.5;

  // Base path para GitHub Pages
  private readonly BASE_PATH = '/3DRetroLibrary';

  private constructor() {
    this.initializeAudio();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private initializeAudio() {
    // Música de fundo
    this.backgroundMusic = new Audio(`${this.BASE_PATH}/audio/retro-theme.mp3`);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = this.volume * 0.3; // Música mais baixa que efeitos
    
    // Efeitos sonoros
    this.soundEffects['start'] = new Audio(`${this.BASE_PATH}/audio/start.mp3`);
    this.soundEffects['start'].volume = this.volume;

    // Configurar áudio para funcionar com interação do usuário
    this.setupAudioContext();
  }

  private setupAudioContext() {
    // Aguardar primeira interação do usuário para permitir autoplay
    const enableAudio = () => {
      if (this.backgroundMusic) {
        this.backgroundMusic.play().catch(console.error);
      }
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = this.volume * 0.3;
    }
    
    Object.values(this.soundEffects).forEach(audio => {
      audio.volume = this.volume;
    });
  }

  public getVolume(): number {
    return this.volume;
  }

  public playSound(soundName: string) {
    const sound = this.soundEffects[soundName];
    if (sound) {
      sound.currentTime = 0; // Reiniciar o som
      sound.play().catch(console.error);
    }
  }

  public startBackgroundMusic() {
    if (this.backgroundMusic && this.backgroundMusic.paused) {
      this.backgroundMusic.play().catch(console.error);
    }
  }

  public stopBackgroundMusic() {
    if (this.backgroundMusic && !this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
    }
  }

  public toggleBackgroundMusic() {
    if (this.backgroundMusic) {
      if (this.backgroundMusic.paused) {
        this.startBackgroundMusic();
      } else {
        this.stopBackgroundMusic();
      }
    }
  }
}

export default AudioManager;
