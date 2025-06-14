import React from 'react';

interface CircleProps {
  size?: string; // e.g. '50px', '3rem', '100%'
  color?: string; // Any valid CSS color string
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const Circle: React.FC<CircleProps> = ({
  size = '50px',
  color = 'red',
  top,
  left,
  right,
  bottom,
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: '50%',
    zIndex: -1,
    top,
    left,
    right,
    bottom,
  };

  return <div style={style} />;
};

export default Circle;
