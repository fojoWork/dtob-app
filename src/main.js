const { invoke } = window.__TAURI__.core;

document.addEventListener('DOMContentLoaded', () => {
  const textInputField = document.getElementById('textInputField');
  const selectedProtocol = document.getElementById('inputSelectionProtocols');
  const convertButton = document.getElementById('convertButton');
  const outputContainer = document.getElementById('output-container');

  function readProtocol(x) {
    return x.value;
  }

  function readInput(x) {
    return x.value;
  }

  async function invokeRustConversion() {
    const protocol = readProtocol(selectedProtocol);
    const inputValue = readInput(textInputField);

    switch (protocol) {
      case 'dtob':
        document.title = 'DTOB';
        return await invoke('dtob_conversion', { input: inputValue });
      default:
        return "Couldn't recognize that protocol yet!";
    }
  }

  convertButton.addEventListener('click', async () => {
    outputContainer.innerText = "Converting...";
    try {
      const result = await invokeRustConversion();
      outputContainer.innerText = result;
    } catch (error) {
      console.error("Error:", error);
      outputContainer.innerText = "An error occurred during conversion.";
    }
  });
});