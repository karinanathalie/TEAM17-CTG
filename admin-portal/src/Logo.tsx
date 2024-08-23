import React from 'react';
import zubinImage from './zubin.png';  // Adjust the path as necessary

const Logo: React.FC = () => (
    <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg" style={{margin: 10, marginTop: -30}}>
        <image href={zubinImage} height="120" width="120"/>
    </svg>
);
export default Logo;