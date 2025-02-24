import React from "react";
import ReactSlider from "react-slider";
import PropTypes from 'prop-types';

export default function Slider({ handleSliderChange, sliderValue = [0, 100], minMaxShownValues = [0, 100], step = 1 }) {
    return (
        <div className="slider-wrapper">
            <div className="date-range">
                <p>From</p>
                <p className="date-range-value">{sliderValue?.[0]}</p>
            </div>
            <div className="slider ">
                <ReactSlider
                    value={sliderValue}
                    // key={minMaxShownValues.join(',')}
                    className="horizontal-slider"
                    thumbClassName="slide-thumb"
                    trackClassName="slide-track"
                    min={minMaxShownValues?.[0]}
                    max={minMaxShownValues?.[1]}
                    defaultValue={[minMaxShownValues?.[0], minMaxShownValues?.[1]]}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                    // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    pearling
                    minDistance={0}
                    onChange={handleSliderChange}
                    step={step}
                />
            </div>
            <div className="date-range">
                <p>To</p>
                <p className="date-range-value">{sliderValue?.[1]}</p>
            </div>
        </div>
    );
}
Slider.propTypes = {
    handleSliderChange: PropTypes.func.isRequired,
    sliderValue: PropTypes.array,
    minMaxShownValues: PropTypes.array,
    step: PropTypes.number
}