import React from 'react';
import useBEM from '../../../hooks/useBem';

const Score = ({
    score
}) => {
    const [B, E] = useBEM('score')

    const evaluateClassName = (stepNumber) => {
        return score >= stepNumber ? E('step', 'active') : E('step', '')
    }

    return (
        <div className={B()}>
            <div className={evaluateClassName(0)}></div>
            <div className={evaluateClassName(1)}></div>
            <div className={evaluateClassName(2)}></div>
            <div className={evaluateClassName(3)}></div>
            <div className={evaluateClassName(4)}></div>
        </div>
    )
}

export default Score