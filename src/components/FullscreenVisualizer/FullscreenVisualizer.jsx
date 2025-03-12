import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MusicVisualizer from '../MusicVisualizer';
import BarChartIcon from '@mui/icons-material/BarChart';
import WavesIcon from '@mui/icons-material/Waves';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function FullscreenVisualizer({ audioElement, isPlaying, onClose }) {
  const [visualizerType, setVisualizerType] = useState('bars');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [mouseMovement, setMouseMovement] = useState(null);

  // Handle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Exit fullscreen when component unmounts
  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit full-screen mode: ${err.message}`);
        });
      }
    };
  }, []);

  // Hide controls after inactivity
  useEffect(() => {
    // Clear any existing timeout
    if (mouseMovement) {
      clearTimeout(mouseMovement);
    }
    
    // Show controls when mouse moves
    setControlsVisible(true);
    
    // Set a new timeout to hide controls after 3 seconds of inactivity
    const timeout = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
    
    setMouseMovement(timeout);
    
    return () => {
      if (mouseMovement) {
        clearTimeout(mouseMovement);
      }
    };
  }, [mouseMovement]);

  const handleMouseMove = () => {
    // Trigger effect to show controls and reset timeout
    setMouseMovement(Date.now());
  };

  const song = audioElement?.dataset || {};

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-black" 
      onMouseMove={handleMouseMove}
    >
      {/* Controls overlay - fade in/out based on mouse movement */}
      <div 
        className={`absolute inset-x-0 top-4 z-50 flex justify-center transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="px-4 py-2 bg-black rounded-lg bg-opacity-60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Tooltip title="Bar Visualization">
              <IconButton 
                color={visualizerType === 'bars' ? 'primary' : 'default'}
                onClick={() => setVisualizerType('bars')}
              >
                <BarChartIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Wave Visualization">
              <IconButton 
                color={visualizerType === 'waves' ? 'primary' : 'default'}
                onClick={() => setVisualizerType('waves')}
              >
                <WavesIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Circle Visualization">
              <IconButton 
                color={visualizerType === 'circle' ? 'primary' : 'default'}
                onClick={() => setVisualizerType('circle')}
              >
                <RadioButtonCheckedIcon />
              </IconButton>
            </Tooltip>
            
            <div className="w-px h-6 mx-2 bg-gray-600"></div>
            
            <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
              <IconButton onClick={toggleFullscreen}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Close Visualizer">
              <IconButton onClick={onClose} color="error">
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      
      {/* Visualizer */}
      <div className="flex-grow">
        <MusicVisualizer 
          audioElement={audioElement}
          isPlaying={isPlaying}
          type={visualizerType}
        />
      </div>
      
      {/* Song info overlay */}
      <div className={`absolute inset-x-0 bottom-8 text-center text-white transition-opacity duration-300 ${
        controlsVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-2xl font-bold drop-shadow-lg">
          {song.title || audioElement?.title || 'Now Playing'}
        </div>
        <div className="text-lg text-neutral-300 drop-shadow-md">
          {song.artist || audioElement?.artist || 'Unknown Artist'}
        </div>
      </div>
    </div>
  );
}

FullscreenVisualizer.propTypes = {
  audioElement: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default FullscreenVisualizer;
