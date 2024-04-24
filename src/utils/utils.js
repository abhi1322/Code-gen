import OpenAI from "openai";

const openAIAPIKey = "sk-proj-Bs21PEv9EpN9pYcR6mOST3BlbkFJz4u8nSytMs0JdofJf8ry"; // Replace with your OpenAI API key
// const openai = new OpenAI();

export const sendPromptToOpenAI = async (prompt) => {
  //   try {
  //     // Send a POST request to OpenAI API
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/completions",
  //       {
  //         model: "text-davinci-003", // Choose the model you want to use
  //         prompt: prompt,
  //         max_tokens: 500, // Adjust the maximum number of tokens as needed
  //         temperature: 0.7, // Adjust the temperature for the desired level of creativity
  //         stop: ["\n"], // You can specify stop sequences if you want the response to stop after the first code snippet
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${openAIAPIKey}`,
  //         },
  //       }
  //     );
  //     // Parse the response and return the generated code
  //     const codeOutput = response.data.choices[0].text.trim();
  //     return codeOutput;
  //   } catch (error) {
  //     console.error("Error sending prompt to OpenAI:", error);
  //     throw error;
  //   }
};

// Example usage
const examplePrompt =
  "Write a function in JavaScript that calculates the sum of an array of numbers.";
