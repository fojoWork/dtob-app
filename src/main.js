const { invoke } = window.__TAURI__.core;

document.addEventListener('DOMContentLoaded', () => {
  const textInputField = document.getElementById('textInputField');
  const selectedProtocol = document.getElementById('inputSelectionProtocols');
  const convertButton = document.getElementById('convertButton');
  const outputContainer = document.getElementById('output-container');
  const clearButton = document.getElementById('clearButton');

  let past_updation = null;

  selectedProtocol.addEventListener('change', function(event) {
    const selectedValue = event.target.value;

    function create_header() {
      switch(selectedValue) {
        case 'dtob':
          return "DTOB CONVERTOR";
        case 'btod':
          return "BTOD CONVERTOR";
        case 'dtoa':
          return "DTOA CONVERTOR";
        default:
          return "your arent supposed to see this";
      }
    }

    document.querySelector('h1').textContent = create_header();

  })

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
          if (parseInt(inputValue) > 255) {
            return "Please enter a number between 0-255";
          }

          document.title = 'DTOB';
          return await invoke('dtob_conversion', { input: inputValue });
      case 'btod':
        document.title = 'BTOD';
        return await invoke('btod_conversion', { input: inputValue });
      case 'dtoa':
        if (parseInt(inputValue) < 65 ) {
          return "Please enter a value that is within 65-255";
        }

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

          resultRow.innerText = "System:~$ " + result;
          resultRow.style.color = "orange";
          resultRow.style.textShadow = "0px 0px 10px rgb(255, 119, 0)";
        }

        else {
          resultRow.innerText = "System:~$ " + result;
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
      textInputField.value = "";
      outputContainer.replaceChildren();
  })
});
