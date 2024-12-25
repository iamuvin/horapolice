import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  isMuted: boolean;
  onToggle: () => void;
}

export function AudioController({ isMuted, onToggle }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.play().catch(() => {
          // Ignore autoplay errors
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  return (
    <>
      <audio ref={audioRef}>
        <source src="/game-music.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={onToggle}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </>
  );
}