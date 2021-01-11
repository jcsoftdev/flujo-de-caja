export default function (caja) {
  const $table = document.createElement("table");
  $table.setAttribute("class", "table table-bordered table-dark mb-5");
  const $tableHead = document.createElement("thead");
  const $tbody = document.createElement("tbody");

  $table.appendChild($tableHead);
  $table.appendChild($tbody);

  function createTd(text, colSpan = 1) {
    const $td = document.createElement("td");
    $td.setAttribute("colspan", colSpan);
    $td.textContent = text;
    return $td;
  }
  function createTh(text, scope = "", colspan = 1) {
    const $td = document.createElement("td");
    $td.setAttribute("scope", scope);
    $td.setAttribute("colspan", colspan);
    $td.textContent = text;
    return $td;
  }

  function createTr(html = []) {
    const tr = document.createElement("tr");
    html.forEach((el) => tr.append(el));
    return tr;
  }
  // periodos header
  function generatePeriodosHeader(periodos) {
    let html = [];
    html.push(createTh(``, "col", 2));
    for (let i = 0; i <= periodos; i++) {
      html.push(createTh(`P-${i}`, "col"));
    }
    const trh = createTr(html);
    $tableHead.appendChild(trh);

    return trh; // no usado
  }

  function generateIngresosRow(ingresos, periodos) {
    let html = [];
    html.push(createTh(`Ingresos`, "col", 2));
    html.push(createTd(``, "col"));
    for (let i = 0; i < periodos; i++) {
      html.push(createTd(ingresos[i] || ""));
    }

    const tr = createTr(html);
    $tbody.appendChild(tr);
  }

  function generateCostos(costos, periodos) {
    let html = [];
    html.push(createTh(`Costos`, "col", 2));
    for (let i = 0; i <= periodos; i++) {
      html.push(createTd(""));
    }
    const tr = createTr(html);
    $tbody.appendChild(tr);

    costos.forEach((el) => {
      const tds = [];
      tds.push(createTd());
      tds.push(createTh(el.name, "row"));
      tds.push(createTd());
      el.values.forEach((value) => {
        tds.push(createTd(value));
      });

      const row = createTr(tds);
      $tbody.appendChild(row);
    });
  }

  function generateInversion(inversiones, periodos) {
    let html = [];
    html.push(createTh(`Inversiones`, "col", 2));
    html.push(createTd(``, "col"));
    for (let i = 0; i < periodos; i++) {
      // const tds = []
      html.push(createTd(""));
    }
    const inversionTop = createTr(html);
    $tbody.appendChild(inversionTop);

    inversiones.forEach((element) => {
      let html = [];
      html.push(createTh(``, "col"));
      html.push(createTd(`${element.name}`, "col", 1));
      html.push(createTd(`${element.quantity}`, "col", 1));
      for (let i = 0; i < periodos; i++) {
        html.push(createTd());
      }
      const inversionTop = createTr(html);
      $tbody.appendChild(inversionTop);
    });
  }

  function generateInversionTotal(inversion, periodos) {
    let html = [];
    html.push(createTh(`Total inversion`, "col", 2));
    html.push(createTd(`${inversion}`, "col"));
    for (let i = 0; i < periodos; i++) {
      html.push(createTd(""));
    }
  }

  function generateDepreciacion(depreciaciones) {
    depreciaciones.forEach((el) => {
      const tds = [];
      tds.push(createTd());
      tds.push(createTh(el.name, "row"));
      tds.push(createTd());
      el.values.forEach((value) => {
        tds.push(createTd(value));
      });

      const row = createTr(tds);
      $tbody.appendChild(row);
    });
  }

  function generateTotalCost(totalCost) {
    const tds = [];
    tds.push(createTd('Total Costos',2));
    tds.push(createTd());
    totalCost.forEach((value) => {
      tds.push(createTd(value));
    });

    const row = createTr(tds);
    $tbody.appendChild(row);
  }

  function generateImpuestos(impuestos) {
    const tds = [];
    tds.push(createTd('Impuestos',2));
    tds.push(createTd());
    impuestos.forEach((value) => {
      tds.push(createTd(value));
    });

    const row = createTr(tds);
    $tbody.appendChild(row);
  }

  function generateDepreciacionTotal(totalDepreciacion=[]) {
    const tds = [];
    tds.push(createTd('Depreciacion',2));
    tds.push(createTd());
    totalDepreciacion.forEach((value) => {
      tds.push(createTd(value));
    });

    const row = createTr(tds);
    $tbody.appendChild(row);
  }

  function generateFlujoDeCajaEconomico(flujo) {
    const tds = [];
    tds.push(createTd('Flujo de caja economico',2));
    tds.push(createTd());
    flujo.forEach((value) => {
      tds.push(createTd(value));
    });
    const row = createTr(tds);
    $tbody.appendChild(row);
  }

  function generateTitleContainer(text, periodos) {
    const tds = []
    tds.push(createTh(text, 'row', 2))
    for (let i = 0; i < periodos; i++) {
      tds.push(createTh())
    }
  }

  function generateColum0(values = [], periodos) {
    values.forEach((element) => {
      let html = [];
      html.push(createTh(``, "col"));
      html.push(createTd(`${element.name}`, "col", 1));
      html.push(createTd(`${element.quantity}`, "col", 1));
      for (let i = 0; i < periodos; i++) {
        html.push(createTd());
      }
      const inversionTop = createTr(html);
      $tbody.appendChild(inversionTop);
    });
  }

  function generateTableContent(values=[]) {
    values.forEach((el) => {
      const tds = [];
      tds.push(createTd());
      tds.push(createTh(el.name, "row"));
      tds.push(createTd());
      el.values.forEach((value) => {
        tds.push(createTd(value));
      });

      const row = createTr(tds);
      $tbody.appendChild(row);
    });
  }

  function generateTableContentWith0(values) {
    values.forEach((el) => {
      const tds = [];
      tds.push(createTh(el.name, "row", 2));
      el.values.forEach((value) => {
        tds.push(createTd(value));
      });

      const row = createTr(tds);
      $tbody.appendChild(row);
    });
  }

  return {
    $table,
    generateIngresosRow,
    generatePeriodosHeader,
    generateInversion,
    generateInversionTotal,
    generateCostos,
    generateDepreciacion,
    generateTotalCost,
    generateImpuestos,
    generateDepreciacionTotal,
    generateFlujoDeCajaEconomico,
    generateTitleContainer,
    generateColum0,
    generateTableContent,
    generateTableContentWith0
  };
}
