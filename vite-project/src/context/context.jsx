import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");

    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowresult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nxtWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nxtWord)

        }, 75 * index)

    }

    const newChat = () => {
        setLoading(false);
        setShowresult(false);

    }
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowresult(true);
        // 
        // setPreviousPrompts(prev => [...prev, input])
        let response;
        if (prompt !== undefined) {
            response = await run(prompt)
            setRecentPrompt(prompt)

        } else {
            setPreviousPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input)
        }

        // const;
        const responseArray = response.split("**")
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i]
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</hr>")
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nxtWord = newResponseArray[i];
            delayPara(i, nxtWord + " ")

        }
        // setResultData(newResponse2);
        setLoading(false);
        setInput("");




    }


    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        recentPrompt, setRecentPrompt,
        showResult, setShowresult,
        loading, setLoading,
        resultData, setResultData,
        input, setInput,
        newChat

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>

    )

}
export default ContextProvider;