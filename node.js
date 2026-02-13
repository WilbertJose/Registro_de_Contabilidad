const cuentas = [
  { codigo: "1101", nombre: "Efectivo" },
  { codigo: "1103", nombre: "Cuentas por Cobrar Clientes" },
  { codigo: "1104", nombre: "IVA Crédito Fiscal" },
  { codigo: "1105", nombre: "Inventarios" },
  { codigo: "1201", nombre: "Propiedad, Planta y Equipo" },
  { codigo: "2101", nombre: "Cuentas por Pagar Proveedores" },
  { codigo: "2102", nombre: "IVA Débito Fiscal" },
  { codigo: "3101", nombre: "Capital Social" },
  { codigo: "4101", nombre: "Ventas" },
  { codigo: "5101", nombre: "Compras" },
  { codigo: "5102", nombre: "Gastos de Venta" }
];

let diario = [];
let mayor = {};

window.onload = () => {
  const select = document.getElementById("cuenta");

  cuentas.forEach(c => {
    const option = document.createElement("option");
    option.value = c.codigo;
    option.textContent = `${c.codigo} - ${c.nombre}`;
    select.appendChild(option);

    mayor[c.codigo] = { nombre: c.nombre, debe: 0, haber: 0 };
  });
};

function agregarMovimiento() {
  const descripcion = document.getElementById("descripcion").value;
  const cuenta = document.getElementById("cuenta").value;
  const debe = parseFloat(document.getElementById("debe").value) || 0;
  const haber = parseFloat(document.getElementById("haber").value) || 0;

  if (!descripcion || !cuenta || (debe === 0 && haber === 0)) return;

  diario.push({ descripcion, cuenta, debe, haber });

  mayor[cuenta].debe += debe;
  mayor[cuenta].haber += haber;

  renderDiario();
  renderMayor();

  limpiarCampos();
}

function renderDiario() {
  const tbody = document.querySelector("#diario tbody");
  tbody.innerHTML = "";

  diario.forEach(m => {
    const row = `
      <tr>
        <td>${m.descripcion}</td>
        <td>${mayor[m.cuenta].nombre}</td>
        <td>${m.debe.toFixed(2)}</td>
        <td>${m.haber.toFixed(2)}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function renderMayor() {
  const contenedor = document.getElementById("mayor");
  contenedor.innerHTML = "";

  Object.keys(mayor).forEach(codigo => {
    const c = mayor[codigo];

    contenedor.innerHTML += `
      <div class="cuenta-t">
        <div class="titulo">${codigo} - ${c.nombre}</div>
        <div class="mov"><span>Debe</span><span>${c.debe.toFixed(2)}</span></div>
        <div class="mov"><span>Haber</span><span>${c.haber.toFixed(2)}</span></div>
        <div class="mov"><strong>Saldo</strong>
          <strong>${(c.debe - c.haber).toFixed(2)}</strong>
        </div>
      </div>
    `;
  });
}

function limpiarCampos() {
  document.getElementById("descripcion").value = "";
  document.getElementById("debe").value = "";
  document.getElementById("haber").value = "";
}
