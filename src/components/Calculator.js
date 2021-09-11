import React, { useState } from 'react';
import '../style/Calculator.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
function Calculator() {
    const classes = useStyles();
    const [result, setResult] = useState('');
    const [error, setError] = useState(false);
    const [bracketPart, setBracketPart] = useState([]);
    const [bracketStart, setBracketStart] = useState('');
    const [remaining, setRemaining] = useState('');
    const [brackets, setBrackets] = useState([]);

    const btns = [
        { nam: '(' }, { nam: 'CE' }, { nam: ')' }, { nam: 'C' },
        { nam: '1' }, { nam: '2' }, { nam: '3' }, { nam: '+' },
        { nam: '4' }, { nam: '5' }, { nam: '6' }, { nam: '-' },
        { nam: '7' }, { nam: '8' }, { nam: '9' }, { nam: 'X' },
        { nam: '.' }, { nam: '0' }, { nam: '=' }, { nam: '/' },

    ];

    const evaluateResult = () => {
        var first = '0', second = '', op = '';
        var calResult = 0;
        var j = 0;
        var checkPoint = false;

        // BRACKET PART IS INCOMPLETE, ITS A KIND OF HECTIC AND LENGTHY ASSIGNMENT FOR A JOB

        for (var i = 0; i < result.length; i++) {
            if (result[i] === '.') {
                checkPoint = true;
            }

            if (j !== 0) {
                op = result[j];

                i = j + 1;
                first = calResult;
                calResult = '';
                second = '';
            }

            if (j === 0 && result[i] !== '+' && result[i] !== '-' && result[i] !== 'X' && result[i] !== '/' && result[i] !== '(') {

                first = first + result[i];

            }
            else {
                if (result[i] !== '(') {
                    if (op === '') {
                        op = result[i];
                        j = i + 1;
                    }
                    else
                        j = i;

                    while (j < result.length && result[j] !== '+' && result[j] !== '-' && result[j] !== 'X' && result[j] !== '/') {
                        second = second + result[j];
                        j = j + 1;
                    }



                    if (checkPoint === true) {
                        if (op === '+')
                            calResult = (parseFloat(first) + parseFloat(second));
                        else if (op === '-')
                            calResult = (parseFloat(first, 10) - parseFloat(second));
                        if (op === '/')
                            calResult = (parseFloat(first, 10) / parseFloat(second));
                        if (op === 'X')
                            calResult = (parseFloat(first) * parseFloat(second));
                    }
                    else {
                        if (op === '+')
                            calResult = (parseInt(first) + parseInt(second));
                        else if (op === '-')
                            calResult = (parseInt(first, 10) - parseInt(second));
                        if (op === '/')
                            calResult = (parseInt(first, 10) / parseInt(second));
                        if (op === 'X')
                            calResult = (parseInt(first) * parseInt(second));
                    }
                    console.log('cal', calResult);

                    i = j;
                }
            }
            

        }
        // console.log('cal', calResult.toString());

        setResult(calResult.toString());
        setBrackets([]);
        setBracketPart([]);
        setRemaining('');

    }

    const handleResult = (e) => {
        if (e.target.innerText === 'C') {
            setResult('');
            setError(false);
            setBrackets([]);
        }
        else if (e.target.innerText === 'CE') {
            if (result.at(-1) === '(') {

                brackets.splice(brackets.length - 1, 1);
                setBrackets(brackets);

            }
            setResult(result.slice(0, -1));

            setError(false);
        }
        else if (e.target.innerText === '=') {
            evaluateResult();
        }
        else {

            if (e.target.innerText === '.' || e.target.innerText === '+' || e.target.innerText === '-' || e.target.innerText === 'X' || e.target.innerText === '/' || e.target.innerText === ')') {
                var lastChar = result.charAt(result.length - 1);
                if (e.target.innerText === ')') {
                    if (brackets.length === 0) {
                        setError(true);
                    }
                    else {
                        brackets.splice(brackets.length - 1, 1);
                        setBrackets(brackets);
                        setResult(result.concat(e.target.innerText));
                        bracketPart.push(bracketStart);
                        setBracketStart('');
                        setRemaining(remaining.concat('b'));
                    }

                }

                else if (lastChar === '+' || lastChar === '-' || lastChar === 'X' || lastChar === '/' || lastChar === '.') {
                    setError(true);
                }
                else {


                    if (result.length === 0 && e.target.innerText !== '(') {

                        setResult(result.concat('0' + e.target.innerText));
                    }
                    else {

                        setResult(result.concat(e.target.innerText));
                        if (bracketStart.length > 0)
                            setRemaining(remaining.concat(e.target.innerText));
                    }

                }


            }
            else {
                if (error === true)
                    setError(false);

                if (e.target.innerText === '(') {
                    setBracketStart(bracketStart.concat(e.target.innerText));
                    brackets.push(')');
                }


                if (bracketStart.length > 0)
                    setRemaining(remaining.concat(e.target.innerText));
                setResult(result.concat(e.target.innerText));
            }



        }

    }
    return (
        <div className='calc'>
            <div className='calc__result' style={error ? { borderColor: 'red' } : null}>
                {brackets.length > 0 ?
                    <TextField value={result + brackets.join('')} disabled /> :
                    <TextField value={result} disabled />
                }
            </div>
            <div className='calc__body'>
                {btns.map((item, key) => {
                    if (item.nam === '(' || item.nam === ')')
                        return (
                            <Button variant="contained" color="primary" key={key} className={classes.root} className='calcBtn' onClick={handleResult} disabled>
                                {item.nam}
                            </Button>
                        )
                    else
                        return (
                            <Button variant="contained" color="primary" key={key} className={classes.root} className='calcBtn' onClick={handleResult}>
                                {item.nam}
                            </Button>
                        )
                })}

            </div>

        </div>
    )
}

export default Calculator
