import React, {useEffect} from 'react';
import ReactContentEditable from 'react-contenteditable';


type Props = {
    onChange,
    onInput,
    onBlur,
    onKeyPress,
    onKeyDown,
}

export default function ContentEditable({}) {
    const onChangeRef = React.useRef(onChange);
    const onInputRef = React.useRef(onInput);
    const onBlurRef = React.useRef(onBlur);
    const onKeyPressRef = React.useRef(onKeyPress);
    const onKeyDownRef = React.useRef(onKeyDown);

   useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);
    useEffect(() => {
        onInputRef.current = onInput;
    }, [onInput]);
    useEffect(() => {
        onBlurRef.current = onBlur;
    }, [onBlur]);
    useEffect(() => {
        onKeyPressRef.current = onKeyPress;
    }, [onKeyPress]);
    useEffect(() => {
        onKeyDownRef.current = onKeyDown;
    }, [onKeyDown]);

    return (
        <ReactContentEditable
            {...props}
            onChange={
                onChange
                    ? (...args) => {
                        if (onChangeRef.current) {
                            onChangeRef.current(...args);
                        }
                    }
                    : undefined
            }
            onInput={
                onInput
                    ? (...args) => {
                        if (onInputRef.current) {
                            onInputRef.current(...args);
                        }
                    }
                    : undefined
            }
            onBlur={
                onBlur
                    ? (...args) => {
                        if (onBlurRef.current) {
                            onBlurRef.current(...args);
                        }
                    }
                    : undefined
            }
            onKeyPress={
                onKeyPress
                    ? (...args) => {
                        if (onKeyPressRef.current) {
                            onKeyPressRef.current(...args);
                        }
                    }
                    : undefined
            }
            onKeyDown={
                onKeyDown
                    ? (...args) => {
                        if (onKeyDownRef.current) {
                            onKeyDownRef.current(...args);
                        }
                    }
                    : undefined
            }
        />
    );
}