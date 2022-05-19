import { ITag, Label, Position, PrimaryButton, SpinButton, Stack, TagPicker, TextField, Toggle } from '@fluentui/react';
import React, { useState } from 'react';

const AlphaLowerChars: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const AlphaUpperChars: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const NumericChars: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const SpecialChars: string[] = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', '\'', '"', ',', '<', '.', '>', '/', '?'];

const DefaultSpecialChars: string[] = ['.', '-'];

const MaxLength: number = 500000;

const DefaultNumberOfCharacters = 20;

const DefaultNumberOfMilliseconds = 10000;

const getOccurrences = (value: string, char: string) => {
    let retVal = 0;
    if (typeof value === 'string' && typeof char === 'string') {
        for (var i = 0; i < value.length; i++) {
            if (value[i] === char) {
                retVal++;
            }
        }
    }
    return retVal;
};

const Generators: React.FunctionComponent = () => {

    const [includeAlphaLower, setIncludeAlphaLower] = useState(true);

    const [includeAlphaUpper, setIncludeAlphaUpper] = useState(true);

    const [includeNumeric, setIncludeNumeric] = useState(true);

    const [includeSpecial, setIncludeSpecial] = useState(true);

    const [allowedSpecialChars, setAllowedSpecialChars] = useState<string[]>(DefaultSpecialChars);

    const [numberOfCharacters, setNumberOfCharacters] = useState(DefaultNumberOfCharacters);

    const [numberOfMilliseconds, setNumberOfMilliseconds] = useState(DefaultNumberOfMilliseconds);

    const [generatedValue, setGeneratedValue] = useState('');

    const [isGenerating, setIsGenerating] = useState(false);

    //#region Event Handlers

    const onIncludeAlphaLowerChanged = (ev?: any, checked?: boolean) => {
        setIncludeAlphaLower(true === checked);
    }

    const onIncludeAlphaUpperChanged = (ev?: any, checked?: boolean) => {
        setIncludeAlphaUpper(true === checked);
    }

    const onIncludeNumericChanged = (ev?: any, checked?: boolean) => {
        setIncludeNumeric(true === checked);
    }

    const onIncludeSpecialChanged = (ev?: any, checked?: boolean) => {
        setIncludeSpecial(true === checked);
    }

    const onNumberOfCharactersChanged = (ev?: any, value?: string) => {
        const newValue = Number(value);
        setNumberOfCharacters(Number.isNaN(newValue) ? DefaultNumberOfCharacters : newValue);
    }

    const onNumberOfMillisecondsChanged = (ev?: any, value?: string) => {
        const newValue = Number(value?.replace(/[^\d]/g, ''));
        setNumberOfMilliseconds(Number.isNaN(newValue) ? DefaultNumberOfMilliseconds : newValue);
    }

    const onGenerateClicked = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const randomValue = generate();
            setGeneratedValue(randomValue);
            setIsGenerating(false);
        }, 1);
    }

    //#endregion Event Handlers

    const getAllowedChars = (): string[] => {
        let retVal: string[] = [];
        if (includeSpecial && allowedSpecialChars) {
            retVal = retVal.concat(allowedSpecialChars);
        }
        if (includeAlphaLower || includeAlphaUpper) {
            if (includeAlphaLower === includeAlphaUpper) {
                let alphaChars: string[] = [];
                for (var i = 0; i < AlphaLowerChars.length; i++) {
                    const lowerChar = AlphaLowerChars[i];
                    if (lowerChar) {
                        alphaChars.push(lowerChar);
                    }
                    const upperChar = AlphaUpperChars[i];
                    if (upperChar) {
                        alphaChars.push(upperChar);
                    }
                }
                retVal = retVal.concat(alphaChars);
            }
            else if (includeAlphaLower) {
                retVal = retVal.concat(AlphaLowerChars);
            }
            else if (includeAlphaUpper) {
                retVal = retVal.concat(AlphaUpperChars);
            }
        }
        if (includeNumeric) {
            retVal = retVal.concat(NumericChars);
        }
        return retVal;
    }

    const generate = (): string => {
        let length = numberOfCharacters;
        const timeout = numberOfMilliseconds;
        const allowedChars = getAllowedChars();
        if (length > MaxLength) {
            length = MaxLength;
            console.warn(`Generating random strings longer than ${MaxLength.toLocaleString()} characters is not supported.`);

        }
        let retVal = '';
        const endTime = new Date();
        endTime.setMilliseconds(endTime.getMilliseconds() + timeout || 1000);
        let forceBreak = false;
        while (retVal.length < length && !forceBreak) {
            const charIndex = Math.floor(Math.random() * allowedChars.length);
            const char = allowedChars[charIndex];
            const occurrences = getOccurrences(retVal, char);
            if ((occurrences === 0 || (occurrences > 0 && occurrences <= Math.round(length / allowedChars.length))) && retVal[retVal.length - 1] !== char) {
                retVal += char;
            }
            const newTime = new Date();
            if (newTime.getTime() >= endTime.getTime()) {
                forceBreak = true;
                console.warn(`Ran out of time generating random string. Successfully generated ${retVal.length.toLocaleString()} characters.`);
            }
        }
        return retVal;
    }

    const onResolveSpecialChars = (filterText: string) => new Promise<ITag[]>((resolve) => {
        resolve(SpecialChars.filter(c => filterText.includes(c) && !allowedSpecialChars.includes(c)).map(c => ({ name: c, key: c })));
    })

    const onAllowedSpecialCharsChanged = (items?: ITag[]) => {
        setAllowedSpecialChars((items || []).map(x => `${x.key}`));
    }

    return <Stack className="Generators" horizontalAlign="start" tokens={{ childrenGap: 20 }}>
        <Toggle label="Lower Case" onText='Included' offText='Not Included' checked={includeAlphaLower} onChange={onIncludeAlphaLowerChanged} />
        <Toggle label="Upper Case" onText='Included' offText='Not Included' checked={includeAlphaUpper} onChange={onIncludeAlphaUpperChanged} />
        <Toggle label="Numeric" onText='Included' offText='Not Included' checked={includeNumeric} onChange={onIncludeNumericChanged} />
        <Toggle label="Special" onText='Included' offText='Not Included' checked={includeSpecial} onChange={onIncludeSpecialChanged} />
        {includeSpecial && <>
            <Label>
                <span style={{ marginBottom: 5 }}>Allowed Special Characters</span>
                <TagPicker selectedItems={allowedSpecialChars.map(c => ({ name: c, key: c }))} onResolveSuggestions={onResolveSpecialChars} onChange={onAllowedSpecialCharsChanged} />
            </Label>
        </>}
        <SpinButton
            label="Number of Characters"
            labelPosition={Position.top}
            min={0}
            value={numberOfCharacters.toLocaleString()}
            onChange={onNumberOfCharactersChanged} />
        <SpinButton
            label="Time to Wait"
            labelPosition={Position.top}
            min={500}
            step={100}
            value={numberOfMilliseconds.toLocaleString()}
            onChange={onNumberOfMillisecondsChanged} />
        <PrimaryButton disabled={isGenerating || !(includeAlphaLower || includeAlphaUpper || includeNumeric || includeSpecial)} onClick={onGenerateClicked}>Generate</PrimaryButton>
        <TextField
            label="Generated Value"
            readOnly
            multiline
            styles={{ root: { resize: "vertical", width: "100%" }, field: { minHeight: 250 } }}
            value={generatedValue} />
    </Stack>;
}

export default Generators;