import { SongTrack, giftConfig } from '../config/giftConfig';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private currentProgress: number = 0; // in seconds
  private noteIndex: number = 0;
  private intervalId: number | null = null;
  private progressTimerId: number | null = null;
  private htmlAudio: HTMLAudioElement | null = null;
  private listeners: Set<() => void> = new Set();

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public getState() {
    const track = giftConfig.songs[this.currentTrackIndex] || giftConfig.songs[0];
    return {
      isMuted: this.isMuted,
      volume: this.volume,
      isPlaying: this.isPlaying,
      currentTrackIndex: this.currentTrackIndex,
      currentTrack: track,
      currentProgress: this.currentProgress,
      duration: track.duration,
    };
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.htmlAudio) {
      this.htmlAudio.muted = muted;
    }
    this.notify();
  }

  public toggleMute() {
    this.setMuted(!this.isMuted);
    if (!this.isMuted && !this.isPlaying) {
      this.play();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.htmlAudio) {
      this.htmlAudio.volume = this.volume;
    }
    this.notify();
  }

  public playTrack(index: number) {
    if (index < 0 || index >= giftConfig.songs.length) return;
    const changed = this.currentTrackIndex !== index;
    this.currentTrackIndex = index;
    if (changed) {
      this.currentProgress = 0;
      this.noteIndex = 0;
    }
    this.stopTimers();
    this.isPlaying = true;
    this.startPlaybackLoop();
    this.notify();
  }

  public play() {
    if (this.isPlaying) return;
    this.ensureContext();
    this.isPlaying = true;
    this.startPlaybackLoop();
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    this.stopTimers();
    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % giftConfig.songs.length;
    this.currentProgress = 0;
    this.noteIndex = 0;
    this.playTrack(nextIdx);
  }

  public prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + giftConfig.songs.length) % giftConfig.songs.length;
    this.currentProgress = 0;
    this.noteIndex = 0;
    this.playTrack(prevIdx);
  }

  public seek(seconds: number) {
    const track = giftConfig.songs[this.currentTrackIndex];
    this.currentProgress = Math.max(0, Math.min(track.duration, seconds));
    if (this.htmlAudio && track.audioUrl) {
      this.htmlAudio.currentTime = this.currentProgress;
    }
    this.notify();
  }

  private stopTimers() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.progressTimerId !== null) {
      window.clearInterval(this.progressTimerId);
      this.progressTimerId = null;
    }
  }

  private startPlaybackLoop() {
    this.stopTimers();
    const track: SongTrack = giftConfig.songs[this.currentTrackIndex];

    // If user configured an external valid audioUrl, use HTML5 Audio with fallback to Music Box synth
    if (track.audioUrl) {
      if (!this.htmlAudio) {
        this.htmlAudio = new Audio();
      }
      if (this.htmlAudio.src !== track.audioUrl) {
        this.htmlAudio.src = track.audioUrl;
        this.htmlAudio.currentTime = this.currentProgress;
      }
      this.htmlAudio.volume = this.volume;
      this.htmlAudio.muted = this.isMuted;
      this.htmlAudio.play().catch(() => {
        // Fallback to synth if audioUrl fails
      });
    }

    // Play first note gently
    this.triggerMusicBoxNote(track);

    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.triggerMusicBoxNote(track);
    }, track.tempo);

    this.progressTimerId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.currentProgress += 0.25;
      if (this.currentProgress >= track.duration) {
        this.nextTrack();
      } else {
        this.notify();
      }
    }, 250);
  }

  private triggerMusicBoxNote(track: SongTrack) {
    if (this.isMuted || this.volume <= 0.01) return;
    if (track.audioUrl && this.htmlAudio && !this.htmlAudio.paused) return;

    const ctx = this.ensureContext();
    if (!ctx) return;

    const freq = track.notes[this.noteIndex % track.notes.length];
    const isDownbeat = this.noteIndex % 4 === 0;
    this.noteIndex++;

    const now = ctx.currentTime;

    // Main warm celesta / music-box tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle bell harmonic overtone
    const overtone = ctx.createOscillator();
    const overtoneGain = ctx.createGain();
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, now);

    const peakGain = 0.08 * this.volume;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.45);

    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(peakGain * 0.18, now + 0.015);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    overtone.connect(overtoneGain);
    overtoneGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
    overtone.start(now);
    overtone.stop(now + 0.5);

    // Warm bass root note on every 4th beat
    if (isDownbeat) {
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(freq * 0.5, now);

      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.exponentialRampToValueAtTime(peakGain * 0.55, now + 0.05);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.1);

      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 2.15);
    }
  }

  // Gentle interactive UI sound effects
  public playChime(type: 'sparkle' | 'flip' | 'heart' | 'bloom' | 'unlock' = 'sparkle') {
    if (this.isMuted || this.volume <= 0.01) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs: Record<string, number[]> = {
      sparkle: [587.33, 880, 1174.66],
      flip: [523.25, 659.25],
      heart: [659.25, 987.77],
      bloom: [440, 554.37, 659.25, 880],
      unlock: [523.25, 659.25, 783.99, 1046.5]
    };

    const notes = freqs[type] || freqs.sparkle;
    notes.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.065);

      const maxG = 0.055 * this.volume;
      gain.gain.setValueAtTime(0.0001, now + idx * 0.065);
      gain.gain.exponentialRampToValueAtTime(maxG, now + idx * 0.065 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.065 + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.065);
      osc.stop(now + idx * 0.065 + 0.6);
    });
  }
}

export const soundEngine = new SoundEngine();
