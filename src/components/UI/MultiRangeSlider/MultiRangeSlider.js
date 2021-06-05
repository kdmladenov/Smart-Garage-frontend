import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef } from 'react';
import './MultiRangeSlider.css';

const MultiRangeSlider = ({ min, max, minValue, maxValue, setMinValue, setMaxValue }) => {
  const minValueRef = useRef(minValue);
  const maxValueRef = useRef(maxValue);
  const range = useRef(null);
  const getPercent = useCallback(value => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValueRef.current);

    if (range.current) {
      console.log(maxPercent, minPercent);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue]);

  useEffect(() => {
    const minPercent = getPercent(minValueRef.current);
    const maxPercent = getPercent(maxValue);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxValue, minValue]);

  return (
    <div className="range-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={e => {
          const value = Math.min(Number(e.target.value), maxValue - 1);
          setMinValue(value);
          minValueRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minValue > max - 100 && '5' }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={e => {
          const value = Math.max(Number(e.target.value), minValue + 1);
          setMaxValue(value);
          maxValueRef.current = value;
        }}
        className="thumb thumb--right"
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minValue}</div>
        <div className="slider__right-value">{maxValue}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  setMinValue: PropTypes.func.isRequired,
  setMaxValue: PropTypes.func.isRequired
};
export default MultiRangeSlider;
