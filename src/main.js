const { invoke } = window.__TAURI__.core;

document.addEventListener('DOMContentLoaded', () => {
  const textInputField = document.getElementById('textInputField');
  const selectedProtocol = document.getElementById('inputSelectionProtocols');
  const convertButton = document.getElementById('convertButton');
  const outputContainer = document.getElementById('output-container');
  const clearButton = document.getElementById('clearButton');

  let past_updation = null;

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
      case 'btod':
        document.title = 'BTOD';
        return await invoke('btod_conversion', { input: inputValue });
      case 'dtoa':
        document.title = 'DTOA';
        return await invoke('dtoa_conversion', { input: inputValue })
      default:
        return "Couldn't recognize that protocol yet!";
    }
  }

  convertButton.addEventListener('click', async () => {
    const resultRow = document.createElement('div');
    resultRow.className = 'result-row';
    resultRow.innerText = "Converting...";
    
    
    outputContainer.appendChild(resultRow);

    try {
      const result = await invokeRustConversion();
        if (result === past_updation) {

          resultRow.innerText = result;
          resultRow.style.color = "orange";
        }

        else {
          resultRow.innerText = result;
          past_updation = result;
        }
      }
      
      catch (error) {
      console.error("Error:", error);
        resultRow.innerText = "An error occurred during conversion.";
    }
  });


  clearButton.addEventListener('click', () => {
      past_updation = null;
      outputContainer.replaceChildren();
  })
});
