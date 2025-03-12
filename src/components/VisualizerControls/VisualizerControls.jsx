import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BarChartIcon from '@mui/icons-material/BarChart';
import WavesIcon from '@mui/icons-material/Waves';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';

function VisualizerControls({ 
  onTypeChange, 
  currentType, 
  onToggleFullscreen,
  onClose,
  isFullscreen
}) {
  return (
    <div className="flex items-center justify-between p-2 bg-black rounded-md bg-opacity-60">
      <div>
        <ButtonGroup variant="contained" size="small" color="primary">
          <Button 
            onClick={() => onTypeChange('bars')} 
            variant={currentType === 'bars' ? 'contained' : 'outlined'}
            startIcon={<BarChartIcon />}
          >
            Bars
          </Button>
          <Button 
            onClick={() => onTypeChange('waves')} 
            variant={currentType === 'waves' ? 'contained' : 'outlined'}
            startIcon={<WavesIcon />}
          >
            Waves
          </Button>
          <Button 
            onClick={() => onTypeChange('circle')} 
            variant={currentType === 'circle' ? 'contained' : 'outlined'}
            startIcon={<RadioButtonCheckedIcon />}
          >
            Circle
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small"
          onClick={onToggleFullscreen}
          startIcon={<FullscreenIcon />}
          sx={{ mr: 1 }}
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
        <Button 
          variant="outlined" 
          color="error" 
          size="small"
          onClick={onClose}
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

VisualizerControls.propTypes = {
  onTypeChange: PropTypes.func.isRequired,
  currentType: PropTypes.string.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool.isRequired
};

export default VisualizerControls;
