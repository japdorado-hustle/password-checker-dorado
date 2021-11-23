import React, { useState, useEffect }from 'react';
import useBEM from '../../hooks/useBem'
import axios from 'axios';
import Result from './components/Result';
import Score from './components/Score';

const PasswordChecker = () => {
    // VARIABLES
    const api = 'https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength'

    // HOOKS
    const [B, E] = useBEM('password-checker')
    const [checkerState, setCheckerState] = useState({
        value: '',
        guessTimeSeconds: 0,
        guessTimeString: '',
        score: 0,
        warning: '',
        suggestions: [],
        hideValue: true
    })
    const [mask, setMask] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            checkAPI(checkerState.value)
        }, 1000);
        return () => clearTimeout(timeout);
    }, [checkerState.value]);

    // METHODS
    const onChange = (e) => {
        const value = e.target.value

        setCheckerState({
            ...checkerState,
            value: value
        })
    }

    const checkAPI = async (value) => {
        if(value !== ''){
            await axios.post(api, { password: value }).then((res) => {            
                if(res){
                    const { guessTimeSeconds, guessTimeString, score, suggestions, warning } = res.data
    
                    setCheckerState({
                        guessTimeSeconds: guessTimeSeconds,
                        guessTimeString: guessTimeString,
                        score: score,
                        warning: warning || '',
                        suggestions: suggestions || []
                    })
                }   
            }).catch((res) => console.log('error', res));
        }
    }

    const hideInput = () => {
        setMask(!mask)
    }

    // RETURN
    return (
        <div className={B()}>
            <input type={mask ? 'password' : 'text'} className={E('input')} onChange={onChange} value={checkerState.value}/>
            <span className={E('mask')} onClick={hideInput}>{mask ? 'SHOW' : 'HIDE'}</span>
            {
                checkerState.value !== '' ? 
                <>
                    <Score 
                        score={checkerState.score}
                    />
                    <Result
                        score={checkerState.score}
                        guessTimeString={checkerState.guessTimeString}
                        warning={checkerState.warning}
                        suggestions={checkerState.suggestions}
                    /> 
                </> : <></>
            }
        </div>
    )
}

export default PasswordChecker;