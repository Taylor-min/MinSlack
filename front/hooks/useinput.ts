import {Dispatch, SetStateAction, useCallback, useState} from 'react';

type ReturnTypes<T = any> = [T,(e:any) => void, Dispatch<SetStateAction<T>>];
const useInput = <T =any>(initalData: T) : ReturnTypes => {
    const [value, setValue] = useState(initalData);
    const handler = useCallback((e:any)=>{
        setValue(e.target.value);
    },[]);
    return[value, handler, setValue];
};

export default useInput;
