import {
  createButton,
  createCheckbox,
  createDiv,
  createInput,
  createSelects,
} from "./forms.js";
import table from "./table.js";

console.log();
const {
  $table,
  generateIngresosRow,
  generatePeriodosHeader,
  generateInversion,
  generateInversionTotal,
  generateCostos,
  generateDepreciacion,
  generateDepreciacionTotal,
  generateTotalCost,
  generateImpuestos,
  generateFlujoDeCajaEconomico,
  generateTitleContainer,
  generateColum0,
  generateTableContent,
  generateTableContentWith0,
} = table();

const caja = {
  periodos: 6,
  inversiones: [
    { name: "sw y hw", quantity: 8000, isDisabled: true },
    { name: "Personal", quantity: 5500, isDisabled: false },
    { name: "Tramite", quantity: 500, isDisabled: false },
    { name: "Otros", quantity: 1000, isDisabled: false },
  ],
  costos: [
    { name: "Pago de personal", values: [2500, 2500, 2500, 2500, 2500, 2500] },
  ],
  depreciaciones: [
    {
      name: "Deprecion de: sw y hw",
      values: [333.3, 333.3, 333.3, 333.3, 333.3, 333.3],
    },
  ],
  ingresos: [22680, 32760, 37800, 30240, 37440, 42120],
};
// const caja = {
//   periodos: 4,
//   inversiones: [
//     { name: "Equipo de compueto", quantity: 35000, isDisabled: true },
//     { name: "Acondicionamiento", quantity: 1000, isDisabled: true },
//     { name: "Muebles", quantity: 2500, isDisabled: true },
//     { name: "Formalizacion", quantity: 600, isDisabled: false },
//     { name: "Publicidad", quantity: 300, isDisabled: false },
//   ],
//   costos: [
//     { name: "Pago de personal", values: [10000, 12000, 13000, 13000] },
//     { name: "Pago de servicios", values: [7500, 7500, 7200, 7200] },
//     { name: "Materiales", values: [900, 950, 1100, 1100] },
//     { name: "Publicidad", values: [1500, 600, 600, 600] },
//   ],
//   depreciaciones: [
//     {
//       name: "Deprecion de: equipo de computo",
//       values: [7000, 7000, 7000, 7000],
//     },
//     {
//       name: "Deprecion de: otros",
//       values: [350, 350, 350, 350],
//     },
//   ],
//   ingresos: [48750, 52500, 44400, 46800],
// };
function State(defState) {
  let defaultState = defState;
  return [
    function () {
      return defaultState;
    },
    function (next) {
      defaultState = next;
    },
    // this.defaultState=initialValue
  ];
}

const [getImpuestoRenta, setImpuestoRenta] = State(0);
const [getTasaInteres, setTasaInteres] = State(0);
const [getPlazoPago, setPlazoPago] = State(0);
const [getMesesPeriodo, setMesesPeriodo] = State(0);
const [getCredito, setCredito] = State(0);
const [isAnual, setIsAnual] = State(false);
const [isFrances, setIsFrances] = State(false);

function* generator() {
  let indice = 1;
  while (true) yield indice++;
}

document.getElementById("btn-periodos").addEventListener("click", (e) => {
  const periodos = Number(e.path[1].childNodes[1].value);
  // console.log(e.path[1].childNodes[1].value)
  caja["periodos"] = periodos;
  // const gen = generator()

  const templateCost = getTemplateCost(periodos);

  renderCostTemplate(templateCost.$card);

  templateCost.$button.addEventListener("click", (e) => {
    cost(templateCost);
  });

  const path = e.path[0].parentNode.parentNode.parentNode.parentNode;

  const gen = generator();

  const $div = createDiv("col-md-6");

  const $div2 = createDiv("card p-3 mt-2");

  const $p = document.createElement("p");

  $p.innerText = `Ingrese perido 1`;

  const $input = createInput("periodo", "Periodo");

  const $button = document.createElement("button");
  $button.setAttribute("class", "btn btn-success mt-4");
  $button.innerText = "Tomar periodo";
  $button.addEventListener("click", (el) => {
    const thisPeriodo = gen.next().value;
    caja.ingresos.push(Number(el.path[1].childNodes[1].value));
    $p.innerText = `Ingrese perido ${thisPeriodo + 1}`;
    $input.value = "";
    if (thisPeriodo === periodos) {
      $div.removeChild($div2);
    }
  });

  $div2.appendChild($p);
  $div2.appendChild($input.html);
  $div2.appendChild($button);

  $div.appendChild($div2);

  const childNodesLength = path.childNodes.length;

  if (childNodesLength < 4) {
    path.appendChild($div);
  }
});

document.getElementById("btn-inversion").addEventListener("click", (e) => {
  const inversionInput = e.path[2].childNodes[1].childNodes[1].childNodes[3];
  const quantityInput = e.path[2].childNodes[1].childNodes[3].childNodes[3];

  caja["inversiones"].push({
    name: inversionInput.value,
    quantity: Number(quantityInput.value),
    isDisabled: false,
  });

  inversionInput.value = "";
  quantityInput.value = "";

  renderInversiones(caja["inversiones"]);
});

function getTemplateCost(periodos) {
  const $card = document.createElement("div");
  $card.setAttribute("class", "card p-3");

  const $span = document.createElement("span");
  $span.setAttribute("class", "form-label");
  $span.textContent = "Nombre de costo ";

  const $costNameInput = document.createElement("input");
  $costNameInput.setAttribute("type", "text");
  $costNameInput.setAttribute("class", "form-control mb-2");
  $costNameInput.setAttribute("placeholder", "Nombre de costo");

  const $span2 = document.createElement("span");
  $span2.setAttribute("class", "form-label");
  $span2.textContent = "Montos";

  const $inputGroup = document.createElement("div");
  $inputGroup.setAttribute("class", "input-group");

  for (let i = 1; i <= periodos; i++) {
    const $mountCostInput = document.createElement("input");
    $mountCostInput.setAttribute("type", "number");
    $mountCostInput.setAttribute("class", "form-control");
    $mountCostInput.style.minWidth = "100px";
    $mountCostInput.setAttribute("placeholder", `Costo ${i}`);
    $inputGroup.appendChild($mountCostInput);
  }

  const $button = document.createElement("button");
  $button.setAttribute("class", "btn btn-success mt-3");
  $button.textContent = "Registrar Costo";
  $card.appendChild($span);
  $card.appendChild($costNameInput);
  $card.appendChild($span2);
  $card.appendChild($inputGroup);
  $card.appendChild($button);

  return { $card, $button, $costNameInput, $inputGroup };
}

function renderCostTemplate(template) {
  const $cost = document.getElementById("cost-container");
  $cost.appendChild(template);
  return $cost;
}

function cost({ $costNameInput, $inputGroup }) {
  const costName = $costNameInput.value;

  const costMountsNode = Array.prototype.slice.call($inputGroup.childNodes);
  console.log(costMountsNode);
  const costMounts = [];

  costMountsNode.forEach((element) => {
    costMounts.push(Number(element.value));
    element.value = "";
  });
  $costNameInput.value = "";
  caja.costos.push({
    name: costName,
    values: costMounts,
  });
}

function getTotalCost(costos = [], depreciaciones = {}, periodos) {
  const newArray = [...costos, ...depreciaciones];
  const totalCost = [];

  for (let i = 0; i < periodos; i++) {
    let sum = 0;
    newArray.forEach((el) => {
      sum += el.values[i];
    });
    totalCost.push(sum);
  }

  return totalCost;
}

function getTotalInversion(inversiones) {
  let sum = 0;

  inversiones.forEach((el) => {
    sum += el.quantity;
  });

  return sum;
}
// depreciaciones

document
  .getElementById("btn-add-depreciacion")
  .addEventListener("click", (e) => {
    const $inversiones = document.querySelectorAll(".inversiones.active");
    // console.log($inversiones[0].getAttribute('data-value'))
    const indices = [];
    $inversiones.forEach((e) => {
      // console.log(e)
      indices.push(e.getAttribute("data-value"));
      // caja.inversiones[]
    });
    const inversiones = indices.map((e) => {
      return caja.inversiones[e];
    });
    const isTime = e.path[1].childNodes[1].checked;
    const value = Number(e.path[1].childNodes[5].value);
    const depreciaciones = getDepreciacion(
      inversiones,
      isTime,
      value,
      caja.periodos
    );
    const { name, values } = depreciaciones;
    caja.depreciaciones.push({ name, values });

    depreciaciones.length > 0 &&
      caja.depreciaciones.push({ ...depreciaciones, value });
    depreciaciones.inversiones.forEach((depInversion) => {
      caja.inversiones = caja.inversiones.map((inversion) => {
        if (inversion.name === depInversion.name) {
          return { ...inversion, isDisabled: true };
        }
        return inversion;
      });
    });

    renderInversiones(caja.inversiones);
  });

document
  .getElementById("checkboxDepreciacion")
  .addEventListener("click", (e) => {
    const isChecked = e.path[0].checked;
    const $input = e.path[1].childNodes[5];
    if (isChecked) {
      $input.setAttribute("placeholder", "Tiempo");
    } else {
      $input.setAttribute("placeholder", "Porcentaje");
    }
  });

function getDepreciacion(
  inversiones = [{ name: "name", quantity: 21 }],
  isTime = true,
  value,
  periodos
) {
  let depreciacion = 0;
  let nombreDepreciacion = "Deprecion de: ";
  inversiones.forEach((el, i) => {
    depreciacion += el.quantity;
    if (i === inversiones.length - 1) {
      nombreDepreciacion += `${inversiones[i].name}`;
    } else {
      nombreDepreciacion += `${inversiones[i].name}, `;
    }
  });

  if (isTime) {
    const depreciaciones = [];
    for (let i = 0; i < periodos; i++) {
      depreciaciones.push(depreciacion / value);
    }
    return { name: nombreDepreciacion, values: depreciaciones, inversiones };
  }

  const depreciaciones = [];

  for (let i = 0; i < periodos; i++) {
    depreciaciones.push((depreciacion * value) / 100);
  }

  return { name: nombreDepreciacion, values: depreciaciones, inversiones };
}

function getTotalDepreciacion(depreciaciones, periodos) {
  const newArray = [...depreciaciones];
  const totalDepreciacion = [];

  for (let i = 0; i < periodos; i++) {
    let sum = 0;
    newArray.forEach((el) => {
      sum += el.values[i];
    });
    totalDepreciacion.push(sum);
  }

  return totalDepreciacion;
}

function renderInversiones(inversiones = [{ name: "name", quantity: 0 }]) {
  const $inversionesContainer = document.getElementById(
    "inversiones-container"
  );
  $inversionesContainer.innerHTML = "";
  createSelects(
    $inversionesContainer,
    inversiones,
    "name",
    "inversiones",
    true
  );
}

// impuestos

function getImpuesto(ingresos, totalCost, impuestoRen) {
  return ingresos.map(
    (ingreso, index) => ((ingreso - totalCost[index]) * impuestoRen) / 100
  );
}

// flujo de caja economico financiero

function getFlujoEconomico(ingresos, totalCost, impuesto, depreciacion) {
  return ingresos.map(
    (el, indx) => el - totalCost[indx] - impuesto[indx] + depreciacion[indx]
  );
}

function getFinanciamiento(credito, totalInversiones) {
  // const totalInversion = totalInversiones;

  const prestamo = (totalInversiones * credito) / 100;
  // const amortizacion = [];
  const colIntereses = [];
  const saldoInicial = [];
  const amortizacionMensual = [];
  const colPeriodoInteres = [];
  const colPeriodoAmortizacion = [];
  return {
    getPrestamo: function (p) {
      return prestamo;
    },
    proccess: function (
      periodos,
      isFrances,
      plazo,
      mesesPeriodo,
      isAnual,
      tasaInteres
    ) {
      if (!isFrances) {
        for (let i = 0; i < periodos; i++) {
          colPeriodoAmortizacion.push(this.getPrestamo() / periodos);
          if (i === 0) {
            colPeriodoInteres.push((this.getPrestamo() * tasaInteres) / 100);
          } else {
            console.log(this.getPrestamo());
            colPeriodoInteres.push(
              (this.getPrestamo() - colPeriodoAmortizacion[i - 1] * i) *
                (tasaInteres / 100)
            );
          }
        }
        return {
          interes: colPeriodoInteres,
          amortizacion: colPeriodoAmortizacion,
        };
      }
      const tem = isAnual
        ? (1 + getTasaInteres() / 100) ** (1 / 12) - 1
        : tasaInteres;
      const quote =
        (this.getPrestamo() * (tem * (1 + tem) ** plazo)) /
        ((1 + tem) ** plazo - 1);
      console.log(quote, tem);
      for (let i = 0; i < plazo; i++) {
        // debugger
        if (i === 0) {
          saldoInicial.push(this.getPrestamo());
        } else {
          saldoInicial.push(saldoInicial[i - 1] - amortizacionMensual[i - 1]);
        }
        colIntereses.push(tem * saldoInicial[i]);
        amortizacionMensual.push(quote - colIntereses[i]);
      }
      for (let i = mesesPeriodo; i <= plazo; i += mesesPeriodo) {
        let sumInteres = 0;
        let sumAmortizacion = 0;
        for (let j = 1; j <= mesesPeriodo; j++) {
          sumInteres += colIntereses[i - j];
          sumAmortizacion += amortizacionMensual[i - j];
        }
        console.log(sumInteres);
        colPeriodoInteres.push(sumInteres);
        colPeriodoAmortizacion.push(sumAmortizacion);
      }
      return {
        interes: colPeriodoInteres,
        amortizacion: colPeriodoAmortizacion,
      };
    },

    // pushAmortizacion: function () {},
  };
}

// flujo de caja financiero

function getFlujoFinanciero(
  prestamo,
  totalInversion,
  periodos,
  flujoEconmico = [],
  amortizacion,
  interes
) {
  const flujo = [];

  for (let i = 0; i <= periodos; i++) {
    if (i === 0) {
      flujo.push(prestamo - totalInversion);
    } else {
      flujo.push(flujoEconmico[i - 1] - amortizacion[i - 1] - interes[i - 1]);
    }
  }
  return flujo;
}
// saldos

function getSaldos(flujoFinanciero) {
  const init = [];
  const end = [];

  flujoFinanciero.forEach((elem, indx) => {
    if (indx === 0) {
      init.push(0);
    } else {
      init.push(end[indx - 1]);
    }
    end.push(elem + init[indx]);
    // end.push()
    // init.push(end[indx - 1])
  });

  return [
    {
      name: "Saldo Inicial",
      values: init,
    },
    {
      name: "Saldo Final",
      values: end,
    },
  ];
}
// VAN

function calcularVan(costoOportunidad, saldoFinal) {
  // console.log(saldoFinal);
  const saldos = [...saldoFinal];
  const saldo = saldos.shift();
  // console.log(saldos);
  const arrayPreVan = saldos.map((el, index) => {
    // console.log(1 + costoOportunidad, index+1)
    return el / ((1 + Number(costoOportunidad)) ** (index+1));
  });

  let sum = 0;

  arrayPreVan.forEach((el) => sum+=el);
  // console.log(arrayPreVan, sum)
  return {van: sum + saldo, rbc:sum / -saldo}
}
//TIR 
function calcularTir(saldoFinal, costoOportunidad=0, longitud=0.01, preValue=[0,0]) {
  const saldos = [...saldoFinal];
  // console.log(saldos)
  let sum = 0;
  // console.log(saldos);
  const arrayPreVan = saldos.map((el, index) => {
    if (index>0) {
      
      return el / ((1 + (costoOportunidad)) ** (index+1));
    }
    return el
  });

  let co = costoOportunidad
  arrayPreVan.forEach((el) => sum+=el);
  // console.log(arrayPreVan, sum)
  // debugger
  const nextArray = [sum, preValue[0]]
  // console.log(sum, nextArray)
  if (sum==preValue[0]||sum==preValue[1]) {
    console.log('bucle infinito')
    return {tir:co, van: sum}
  }
  if (sum>1) {
    co+= longitud
    // console.log(sum)
    // debugger
    return calcularTir(saldoFinal,  co, longitud, nextArray)
  }
  if (sum<-1) {
    // console.log(sum, co)
    let  mylongitud = 0.0000157
    co-= mylongitud
    return calcularTir(saldoFinal,  co, mylongitud, nextArray)
  }
  if (sum>0.001||sum<-0.001) {
    // console.log(sum, co)
    let  mylongitud = 0.00000713
    co-= mylongitud
    return calcularTir(saldoFinal,  co, mylongitud, nextArray)
  }
  
  if (sum>0.00001||sum<-0.00001) {
    // console.log(sum, co)
    let  mylongitud = 0.000001
    co-= mylongitud
    return calcularTir(saldoFinal,  co, mylongitud, nextArray)
  }
  
  // console.log(sum, co)
  return {tir:co, van: sum}
}

// pri 
function calcularPri(saldoFinal) {
  console.log(saldoFinal)
  const acumulado = [];
  let tir = 0
  for (let i = 0; i < saldoFinal.length; i++) {
   
    if (i===1) {
      acumulado.push(saldoFinal[i])
    }
    else if(i>1){
      acumulado.push(saldoFinal[i]+acumulado[i-2])

      console.log(i, saldoFinal, acumulado)
      if (acumulado[i-1]>=(-saldoFinal[0])) {
        tir = (i-1+(-saldoFinal[0] - acumulado[i-2])/saldoFinal[i])
        break
      }
    }


    
  }
  console.log(tir)
  return tir
}

// amortizacion

const $detailsContainer = document.getElementById("details-container");

const impRenta = createInput("impRenta", "% impuesto a la renta");
impRenta.onChange((e) => {
  setImpuestoRenta(e.target.value);
});

const $interesContainer = createDiv("card p-3 my-2");
const credito = createInput("credito", "% credito para el financiamiento");
credito.onChange((e) => {
  setCredito(e.target.value);
});
const btn = createButton("Generar Tabla");
btn.onClick((e) => {
  // createTable()
  console.log(caja);
  generatePeriodosHeader(caja.periodos);
  generateIngresosRow(caja.ingresos, caja.periodos);
  generateInversion(caja.inversiones, caja.periodos);
  generateInversionTotal(getTotalInversion(caja.inversiones));
  generateCostos(caja.costos, caja.periodos);
  generateDepreciacion(caja.depreciaciones, caja.periodos);

  const totalCost = getTotalCost(
    caja.costos,
    caja.depreciaciones,
    caja.periodos
  );
  generateTotalCost(totalCost);
  const impuestos = getImpuesto(caja.ingresos, totalCost, getImpuestoRenta());
  generateImpuestos(impuestos);

  const depreciacion = getTotalDepreciacion(caja.depreciaciones, caja.periodos);
  generateDepreciacionTotal(depreciacion || []);

  const flujoEconomico = getFlujoEconomico(
    caja.ingresos,
    totalCost,
    impuestos,
    depreciacion
  );
  generateFlujoDeCajaEconomico(flujoEconomico);
  generateTitleContainer("Financiamiento", caja.periodos);

  // falta obtener inversiones  y cambair a caja.inversiones

  const $inversionesPrestamo = document.querySelectorAll(
    ".inversionesPrestamo.active"
  );
  const index = [];
  $inversionesPrestamo.forEach((e) => {
    // console.log(e)
    index.push(e.getAttribute("data-value"));
    // caja.inversiones[]
  });
  const inversiones = index.map((e) => {
    return caja.inversiones[e];
  });
  const financiamiento = getFinanciamiento(
    getCredito(),
    getTotalInversion(inversiones)
  );
  generateColum0(
    [
      {
        name: "Prestamo",
        quantity: financiamiento.getPrestamo(),
      },
    ],
    caja.periodos
  );

  const { interes, amortizacion } = financiamiento.proccess(
    caja.periodos,
    isFrances(),
    Number(getPlazoPago()),
    Number(getMesesPeriodo()),
    isAnual(),
    Number(getTasaInteres())
  );
  generateTableContent([
    {
      name: "Interes",
      values: interes,
    },
    {
      name: "amortizacion",
      values: amortizacion,
    },
  ]);

  const flujoFinanciero = getFlujoFinanciero(
    financiamiento.getPrestamo(),
    getTotalInversion(caja.inversiones),
    caja.periodos,
    flujoEconomico,
    amortizacion,
    interes
  );

  generateTableContentWith0([
    {
      name: "FLujo de caja financiero",
      values: flujoFinanciero,
    },
  ]);

  const saldos = getSaldos(flujoFinanciero);
  console.log(saldos)
  generateTableContentWith0(saldos);
  const $results = document.getElementById("results");
  $results.appendChild($table);

  // aparece el van
  const $vanContainer = document.getElementById("van");
  const $costoOportunidadInput = createInput(
    "costoOportunidad",
    "Costo de oportunidad",
    "number"
  );
  $costoOportunidadInput.onChange((e) => {
    caja["costo_oportunidad"] = $costoOportunidadInput.getValue();
  });
  const $btnCalcularVan = createButton("Calcular VAN", "btn btn-danger mb-3");
  const $h1 = document.createElement('h1')
  $h1.textContent = 'VAN: ?'
  const $h1tir = document.createElement('h2')
  $btnCalcularVan.onClick((e) => {
    const prevan = calcularVan(caja["costo_oportunidad"], saldos[1].values);
    const {tir, van} = calcularTir(saldos[1].values)
    $h1.textContent=`VAN: ${prevan.van}`
    $h1tir.textContent=`TIR:${tir} VAN:${van} RB/C:${prevan.rbc} PRI:${calcularPri(saldos[1].values)}`
  });
  
  
  // $inputTI
  $vanContainer.appendChild($costoOportunidadInput.html);
  $vanContainer.appendChild($btnCalcularVan.html);
  $vanContainer.appendChild($h1)
  $vanContainer.appendChild($h1tir)
});
const $div = createDiv("card p-3 mb-3");

createSelects($div, caja.inversiones, "name", "inversionesPrestamo");
$detailsContainer.appendChild(impRenta.html);
$detailsContainer.appendChild($interesContainer);
$detailsContainer.appendChild(credito.html);
$detailsContainer.appendChild($div);
$detailsContainer.appendChild(btn.html);

const inputInteres = createInput("interes", "% Tasa de interes");
inputInteres.onChange((e) => {
  setTasaInteres(e.target.value);
});
const plazoDePago = createInput("plazoPago", "Plazo de pago");
plazoDePago.onChange((e) => {
  setPlazoPago(e.target.value);
});
const checkboxAmortizacion = createCheckbox(
  "amortizacionType",
  "Frances",
  "Aleman"
);
checkboxAmortizacion.checkbox.checked = isFrances();
checkboxAmortizacion.onClick((e) => {
  // checkboxAmortizacion.checkbox.checked = !checkboxAmortizacion.isChecked();
  setIsFrances(checkboxAmortizacion.isChecked());
});

const $amortizacionContainer = document.createElement("div");
checkboxAmortizacion.onClick(function (e) {
  $amortizacionContainer.innerHTML = "";
  //   console.log($amortizacionContainer);
  if (checkboxAmortizacion.isChecked()) {
    const inputMesesPeriodo = createInput(
      "mesesPeriodo",
      "Meses en un periodo"
    );

    // inputMesesPeriodo.html.textContent = getMesesPeriodo();
    inputMesesPeriodo.onChange((e) => {
      setMesesPeriodo(Number(e.target.value));
      console.log(getMesesPeriodo());
    });

    const checkbox = createCheckbox("tasaEfectiva", "Anual", "Mensual");
    console.log(checkbox.html);
    checkbox.checkbox.checked = isAnual();
    console.log(isAnual());
    checkbox.onClick((e) => {
      setIsAnual(checkbox.isChecked());
      // console.log(isAnual())
    });
    $amortizacionContainer.appendChild(inputMesesPeriodo.html);
    $amortizacionContainer.appendChild(checkbox.html);
    $interesContainer.appendChild($amortizacionContainer);
  }
});

$interesContainer.appendChild(inputInteres.html);
$interesContainer.appendChild(plazoDePago.html);
$interesContainer.appendChild(checkboxAmortizacion.html);

// const $row = createDiv("row");
// const $colMd6 = createDiv("col-md-6");

// $inputImpuestoRenta.setAttribute('id',plazoPago)

export default caja;
