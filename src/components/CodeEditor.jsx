import { useRef, useState, useEffect } from "react";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import "./App.css";
import { sendPromptToOpenAI } from "../utils/utils";
import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: "sk-proj-jjYw63pr49e2sVzOc3LHT3BlbkFJQZVCyIHOCwyhcbRiSlqF",
  dangerouslyAllowBrowser: true,
});

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [promptInput, setPromptInput] = useState("");
  const [data, setData] = useState("");
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  const handleKeyPress = (event) => {
    // Show prompt on Ctrl + G
    if (event.ctrlKey && event.key.toLowerCase() === "i") {
      setShowPrompt(true);
    }

    // Hide prompt on Escape
    if (event.key === "Escape") {
      setShowPrompt(false);
    }
  };

  useEffect(() => {
    // Add keydown event listener
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handlePromptSubmit = async (prompt) => {
    const options = {
      method: "GET",
      url: "https://chatgpt4-api.p.rapidapi.com/gpt",
      params: {
        content: `we are using ${language} and send code wrapp in , ${prompt}`,
      },
      headers: {
        "X-RapidAPI-Key": "01b8f016a8msh01231014e8653f0p126d1djsn0d94bf2547da",
        "X-RapidAPI-Host": "chatgpt4-api.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
      const extractedCode =
        (response.data.content.match(/```([\s\S]*?)```/) || [])[1]?.trim() ||
        "";
      console.log(extractedCode);
      setValue(extractedCode);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>

      <Box width="60vw" marginTop={"1rem"}>
        <HStack spacing={4}>
          {/* Input field */}
          <Input
            placeholder="To generate code you can type here"
            onChange={(e) => setPromptInput(e.target.value)}
            bg="#36313e"
            borderRadius="10px"
            height="50px"
            color="white"
          />

          {/* Button */}
          <Button
            bg="green"
            color="white"
            padding={"1.5rem 2rem"}
            onClick={() => handlePromptSubmit(promptInput)}
          >
            Generate
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
export default CodeEditor;
