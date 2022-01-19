import { Wave } from 'react-animated-text';
import React from 'react';

export const AnimatedText = ({input, effect, effectChange}) => (
    <div>
        <Wave text={input} effect={effect} effectChange={effectChange} />
    </div>
)
export default AnimatedText;