import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Create a static audio context and source mapping to be shared across all instances
const audioContextMap = new Map();

function MusicVisualizer({ audioElement, isPlaying, type = 'bars' }) {
  const canvasRef = useRef(null);
  const [visualizerReady, setVisualizerReady] = useState(false);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  
  // Set up audio analyzer when audio element is available
  useEffect(() => {
    if (!audioElement) return;
    
    let audioContext;
    let analyser;
    let source;
    
    try {
      // Check if we already have a context for this audio element
      if (!audioContextMap.has(audioElement)) {
        // Create new audio context if one doesn't exist for this element
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Power of 2, between 32-2048
        
        // Create source and connect it
        source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // Store the context, source, and analyzer for this audio element
        audioContextMap.set(audioElement, { audioContext, analyser, source });
      } else {
        // Reuse the existing audio context and analyzer
        const existingAudio = audioContextMap.get(audioElement);
        audioContext = existingAudio.audioContext;
        analyser = existingAudio.analyser;
      }
      
      // Store the analyzer in a ref for use in animation
      analyserRef.current = analyser;
      setVisualizerReady(true);
      
    } catch (error) {
      console.error('Error initializing audio analyzer:', error);
    }
    
    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioElement]);
  
  // Draw visualization based on the selected type
  useEffect(() => {
    if (!visualizerReady || !isPlaying || !analyserRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Animation loop
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      
      if (!analyser) return;
      
      // Get frequency data
      analyser.getByteFrequencyData(dataArray);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Choose visualization type
      switch (type) {
        case 'bars':
          drawBars(ctx, dataArray, bufferLength, canvas);
          break;
        case 'waves':
          drawWaves(ctx, dataArray, bufferLength, canvas);
          break;
        case 'circle':
          drawCircle(ctx, dataArray, bufferLength, canvas);
          break;
        default:
          drawBars(ctx, dataArray, bufferLength, canvas);
      }
    };
    
    // Start animation
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [visualizerReady, isPlaying, type]);
  
  // Bar visualization (traditional equalizer)
  const drawBars = (ctx, dataArray, bufferLength, canvas) => {
    const barWidth = canvas.width / bufferLength * 2;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] / 255 * canvas.height;
      
      // Create gradient with transparency for more aesthetic look
      const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
      
      // Add multiple color stops with transparency for a more vibrant effect
      gradient.addColorStop(0, 'rgba(29, 185, 84, 0.8)'); // Spotify green with transparency at top
      gradient.addColorStop(0.5, 'rgba(29, 185, 84, 0.6)');
      gradient.addColorStop(1, 'rgba(25, 20, 20, 0.4)'); // Darker with higher transparency at bottom
      
      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(29, 185, 84, 0.5)';
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
      
      // Reset shadow for next element
      ctx.shadowBlur = 0;
      
      x += barWidth;
    }
  };
  
  // Wave visualization - also enhance with transparency
  const drawWaves = (ctx, dataArray, bufferLength, canvas) => {
    // Create gradient for wave
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(29, 185, 84, 0.8)');
    gradient.addColorStop(1, 'rgba(29, 185, 84, 0.4)');
    
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#1DB954';
    
    // Fill area under the wave with gradient
    ctx.beginPath();
    
    const sliceWidth = canvas.width / bufferLength;
    let x = 0;
    
    // First point starts at bottom
    ctx.moveTo(0, canvas.height / 2);
    
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;
      
      ctx.lineTo(x, y);
      x += sliceWidth;
    }
    
    // Complete the shape by drawing to bottom right corner, then bottom left
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    
    // Fill with transparent gradient
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw the line on top
    ctx.beginPath();
    x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    // Add glow effect to the line
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(29, 185, 84, 0.7)';
    ctx.strokeStyle = '#1DB954';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };
  
  // Circular visualization with improved transparency
  const drawCircle = (ctx, dataArray, bufferLength, canvas) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Draw base circle with glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(51, 51, 51, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add inner glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(29, 185, 84, 0.1)';
    ctx.fill();
    
    for (let i = 0; i < bufferLength; i++) {
      const amplitude = dataArray[i] / 255;
      const angle = (i / bufferLength) * 2 * Math.PI;
      const barLength = radius * amplitude;
      
      const x1 = centerX + radius * Math.cos(angle);
      const y1 = centerY + radius * Math.sin(angle);
      const x2 = centerX + (radius + barLength) * Math.cos(angle);
      const y2 = centerY + (radius + barLength) * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      
      // Use HSL with transparency for vibrant colors
      ctx.strokeStyle = `hsla(${(i / bufferLength) * 360 + 100}, 100%, 50%, 0.7)`;
      ctx.lineWidth = 2;
      
      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsla(${(i / bufferLength) * 360 + 100}, 100%, 50%, 0.5)`;
      
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  };
  
  return (
    <div className={`relative w-full h-full min-h-[80px] ${!visualizerReady || !isPlaying ? 'bg-neutral-900' : ''} rounded-lg overflow-hidden`}>
      {!visualizerReady && (
        <div className="flex items-center justify-center h-full text-white">
          <p>Initializing visualizer...</p>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full ${!visualizerReady || !isPlaying ? 'opacity-0' : 'opacity-100'}`}
      />
      {visualizerReady && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p>Play music to start visualization</p>
        </div>
      )}
    </div>
  );
}

MusicVisualizer.propTypes = {
  audioElement: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['bars', 'waves', 'circle'])
};

export default MusicVisualizer;
