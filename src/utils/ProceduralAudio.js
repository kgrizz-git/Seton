// Simple procedural audio generator for placeholder music
export class ProceduralAudio {
  constructor() {
    this.audioContext = null;
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playRetroTitleMusic() {
    this.init();
    
    if (this.isPlaying) {
      return;
    }
    
    this.isPlaying = true;
    
    // Simple retro melody pattern
    const melody = [
      { freq: 523.25, duration: 0.3 }, // C5
      { freq: 659.25, duration: 0.3 }, // E5
      { freq: 783.99, duration: 0.3 }, // G5
      { freq: 659.25, duration: 0.3 }, // E5
      { freq: 523.25, duration: 0.6 }, // C5
      { freq: 587.33, duration: 0.3 }, // D5
      { freq: 659.25, duration: 0.3 }, // E5
      { freq: 523.25, duration: 0.6 }, // C5
    ];
    
    let time = this.audioContext.currentTime;
    
    const playMelody = () => {
      if (!this.isPlaying) return;
      
      melody.forEach((note, index) => {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'square'; // Retro square wave
        oscillator.frequency.setValueAtTime(note.freq, time);
        
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.1, time + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, time + note.duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start(time);
        oscillator.stop(time + note.duration);
        
        time += note.duration;
      });
      
      // Loop the melody
      setTimeout(() => {
        if (this.isPlaying) {
          playMelody();
        }
      }, (time - this.audioContext.currentTime) * 1000);
    };
    
    playMelody();
  }

  stop() {
    this.isPlaying = false;
    
    // Stop all oscillators
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    
    this.oscillators = [];
    this.gainNodes = [];
  }

  playSimpleBeep(frequency = 440, duration = 0.1) {
    this.init();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}

export default new ProceduralAudio();
