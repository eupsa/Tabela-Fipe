const tipo = document.getElementById("tipo");
const marcas = document.getElementById("marcas");
const modelos = document.getElementById("modelo");
const anos = document.getElementById("anos");
const resultados = document.getElementById("resultados");

// Buscar marcas ao selecionar o tipo
tipo.addEventListener("change", async () => {
  const query_tipo = `https://parallelum.com.br/fipe/api/v1/${tipo.value}/marcas`;
  const request_tipo = await fetch(query_tipo);
  const response_tipo = await request_tipo.json();

  marcas.innerHTML =
    '<option value="" disabled selected>Selecione a marca...</option>';
  modelos.innerHTML = "";
  anos.innerHTML = "";

  response_tipo.forEach((marca) => {
    const option = document.createElement("option");
    option.value = marca.codigo;
    option.innerText = marca.nome;
    marcas.appendChild(option);
  });
});

// Buscar modelos ao selecionar a marca
marcas.addEventListener("change", async () => {
  const query_modelos = `https://parallelum.com.br/fipe/api/v1/${tipo.value}/marcas/${marcas.value}/modelos`;
  const request_modelos = await fetch(query_modelos);
  const response_modelos = await request_modelos.json();

  modelos.innerHTML =
    '<option value="" disabled selected>Selecione o modelo...</option>';
  response_modelos.modelos.forEach((modelo) => {
    const option = document.createElement("option");
    option.value = modelo.codigo;
    option.innerText = modelo.nome;
    modelos.appendChild(option);
  });
});

// Buscar anos ao selecionar o modelo
modelos.addEventListener("change", async () => {
  const query_anos = `https://parallelum.com.br/fipe/api/v1/${tipo.value}/marcas/${marcas.value}/modelos/${modelos.value}/anos`;
  const request_anos = await fetch(query_anos);
  const response_anos = await request_anos.json();

  anos.innerHTML =
    '<option value="" disabled selected>Selecione o ano...</option>';
  response_anos.forEach((ano) => {
    const option = document.createElement("option");
    option.value = ano.codigo;
    option.innerText = ano.nome;
    anos.appendChild(option);
  });
});

// Buscar dados ao selecionar o ano
anos.addEventListener("change", async () => {
  const query_result = `https://parallelum.com.br/fipe/api/v1/${tipo.value}/marcas/${marcas.value}/modelos/${modelos.value}/anos/${anos.value}`;
  const request_result = await fetch(query_result);
  const response_result = await request_result.json();

  // Limpa os resultados anteriores
  resultados.innerHTML = "";

  if (response_result && response_result.Marca) {
    // Cria um cartão para os resultados
    const card = document.createElement("div");
    card.className =
      "bg-gray-900 text-gray-200 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto";

    card.innerHTML = `
      <h3 class="text-xl font-semibold text-gray-300 mb-2">${response_result.Marca} - ${response_result.Modelo}</h3>
      <p><span class="font-bold">Ano:</span> ${response_result.AnoModelo}</p>
      <p><span class="font-bold">Valor:</span> ${response_result.Valor}</p>
      <p><span class="font-bold">Combustível:</span> ${response_result.Combustivel}</p>
      <p><span class="font-bold">Referência:</span> ${response_result.MesReferencia}</p>
      <p><span class="font-bold">Código FIPE:</span> ${response_result.CodigoFipe}</p>
    `;

    resultados.appendChild(card);
  } else {
    console.log("Resposta inesperada da API", response_result);
  }
});
