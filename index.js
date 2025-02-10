const tipo = document.getElementById("tipo");
const marcas = document.getElementById("marcas");
const modelos = document.getElementById("modelo");
const anos = document.getElementById("anos");
const resultados = document.getElementById('resultados');

// Realiza a consulta de marcas depois que o input de tipo mudar
tipo.addEventListener("change", async () => {
  var query_tipo = "https://parallelum.com.br/fipe/api/v1/" + tipo.value + "/marcas";
  const request_tipo = await fetch(query_tipo);
  const response_tipo = await request_tipo.json();

  marcas.innerHTML = '<option value="" disabled selected>Selecione a marca...</option>';
  modelos.innerHTML = '';
  anos.innerHTML = '';

  response_tipo.forEach(function (marca) {
    const option = document.createElement("option");
    option.value = marca.codigo;
    option.innerText = marca.nome;
    marcas.appendChild(option);
  });
});

// Realiza a consulta de modelos depois que o input de marcas mudar
marcas.addEventListener("change", async () => {
  var query_modelos = "https://parallelum.com.br/fipe/api/v1/" + tipo.value + "/marcas/" + marcas.value + "/modelos";
  const request_modelos = await fetch(query_modelos);
  const response_modelos = await request_modelos.json();

  const modelosList = response_modelos.modelos;

  modelos.innerHTML = '<option value="" disabled selected>Selecione o modelo...</option>';
  modelosList.forEach(function (modelo) {
    const option = document.createElement("option");
    option.value = modelo.codigo;
    option.innerText = modelo.nome;
    modelos.appendChild(option);
  });
});

modelos.addEventListener("change", async () => {
  var query_anos = "https://parallelum.com.br/fipe/api/v1/" + tipo.value + "/marcas/" + marcas.value + "/modelos/" + modelos.value + "/anos";
  const request_anos = await fetch(query_anos);
  const response_anos = await request_anos.json();

  anos.innerHTML = '<option value="" disabled selected>Selecione o ano...</option>';

  response_anos.forEach(function (ano) {
    const option = document.createElement("option");
    option.value = ano.codigo;
    option.innerText = ano.nome;
    anos.appendChild(option);
  });
});

anos.addEventListener("change", async () => {
    var query_result = "https://parallelum.com.br/fipe/api/v1/" + tipo.value + "/marcas/" + marcas.value + "/modelos/" + modelos.value + "/anos/" + anos.value;
    const request_result = await fetch(query_result);
    const response_result = await request_result.json();
  
    // Limpar os resultados anteriores
    resultados.querySelector('tbody').innerHTML = '';
  
    // Verifica se a resposta contém os dados necessários
    if (response_result && response_result.Marca && response_result.Modelo && response_result.AnoModelo && response_result.Valor) {
      // Cria a nova linha da tabela
      const novaLinha = document.createElement('tr');
  
      // Cria as células e preenche com os dados da resposta
      const marcaCelula = document.createElement('td');
      marcaCelula.textContent = response_result.Marca;
      novaLinha.appendChild(marcaCelula);
  
      const modeloCelula = document.createElement('td');
      modeloCelula.textContent = response_result.Modelo;
      novaLinha.appendChild(modeloCelula);
  
      const anoCelula = document.createElement('td');
      anoCelula.textContent = response_result.AnoModelo;
      novaLinha.appendChild(anoCelula);
  
      const valorCelula = document.createElement('td');
      valorCelula.textContent = response_result.Valor;
      novaLinha.appendChild(valorCelula);
  
      const combustivelCelula = document.createElement('td');
      combustivelCelula.textContent = response_result.Combustivel;
      novaLinha.appendChild(combustivelCelula);
  
      const mesReferenciaCelula = document.createElement('td');
      mesReferenciaCelula.textContent = response_result.MesReferencia;
      novaLinha.appendChild(mesReferenciaCelula);
  
      const codigoFipeCelula = document.createElement('td');
      codigoFipeCelula.textContent = response_result.CodigoFipe;
      novaLinha.appendChild(codigoFipeCelula);
  
      // Adiciona a nova linha na tabela
      resultados.querySelector('tbody').appendChild(novaLinha);
    } else {
      console.log('Resposta inesperada da API', response_result);
    }
  });