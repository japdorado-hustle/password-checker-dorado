import React from 'react';
import useBEM from '../../../hooks/useBem';

const Result = ({
    score,
    guessTimeString,
    warning,
    suggestions
}) => {
    const [B, E] = useBEM('result')

    const renderSuggestions = () => {
        return suggestions.map((s,e)=>{
            return <span key={e}>{s}</span>
        })
    }

    const evaluateScore = () => {
        const staticText = 'Your password is'

        switch(score){
            case 0: return `${staticText} very weak`
            case 1: return `${staticText} weak`
            case 2: return `${staticText} medium`
            case 3: return `${staticText} strong`
            case 4: return `${staticText} very strong`
            default: return ''
        }
    }

    return (
        <div className={B()}>
            <p className={E('strength')}>
                {evaluateScore()}
            </p>
            <p className={E('time-warning')}>
                {`It will take ${guessTimeString} to guess your password. ${warning}`}
            </p>
            <p className={E('suggestions')}>
                {renderSuggestions()}
            </p>
        </div>
    )
}

export default Result