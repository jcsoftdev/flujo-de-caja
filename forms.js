
function createInput(id, placeholder = "", type = "text", clase = "") {
  const $inputContainer = document.createElement("div");
  $inputContainer.setAttribute("class", "mb-3");
  const $label = document.createElement("label");
  $label.setAttribute("class", "form-label");
  $label.setAttribute("for", id);
  $label.textContent = placeholder;
  const $input = document.createElement("input");
  $input.setAttribute("class", `form-control ${clase}`);
  $input.setAttribute("id", id);
  $input.setAttribute("type", type);
  $input.setAttribute("placeholder", placeholder);
  $inputContainer.appendChild($label);
  $inputContainer.appendChild($input);
  return {
    html: $inputContainer,
    getValue: function () {
      return $input.value;
    },
    onChange: function (call) {
      $input.addEventListener("keyup", call);
    },
  };
}

function createCheckbox(id, textOn, textOff, className = "") {
  const $inputContainer = document.createElement("div");
  $inputContainer.setAttribute("class", "mb-3");
  const $checkbox = document.createElement("input");
  $checkbox.setAttribute("class", `tgl tgl-flip ${className}`);
  $checkbox.setAttribute("type", "checkbox");
  $checkbox.setAttribute("id", id);
  const $labelCheckbox = document.createElement("span");
  $labelCheckbox.setAttribute("class", "tgl-btn");
  $labelCheckbox.setAttribute("data-tg-off", textOff);
  $labelCheckbox.setAttribute("data-tg-on", textOn);
  $labelCheckbox.setAttribute("for", id);
  $inputContainer.appendChild($checkbox);
  $inputContainer.appendChild($labelCheckbox);
  $labelCheckbox.addEventListener("click", (e) => {
    $checkbox.checked = !$checkbox.checked;
    // console.log($checkbox.checked);
  });
  return {
    html: $inputContainer,
    checkbox: $checkbox,
    isChecked: function () {
      return $checkbox.checked;
    },
    onClick: function (call) {
      $labelCheckbox.addEventListener("click", call);
    },
  };
}

function createDiv(className) {
  const $div = document.createElement("div");
  $div.setAttribute("class", className);
  return $div;
}


function createButton(text, className='btn btn-success') {
  const button = document.createElement('button')
  button.setAttribute('class', className)
  button.textContent=text
  return {
    html: button,
    onClick: function (call) {
      button.addEventListener("click", call);
    },
  };
}


function createSelects(path, items=[], text, className, thereIsDisabled) {
  
  items.forEach((element, index) => {
    const $li = document.createElement("li");
    $li.setAttribute("class", "list-group-item "+className);
    $li.setAttribute("data-value", index);
    $li.style.cursor = "pointer";
    $li.textContent = element[text];
    $li.addEventListener("click", (e) => {
      $li.classList.toggle("active");
    });
    if (thereIsDisabled) {
      if (element.isDisabled) {
        $li.setAttribute("class", "disabled list-group-item inversiones");
      }
    }
    path.appendChild($li)
  });
  
}

export {createInput, createCheckbox, createDiv, createButton, createSelects}