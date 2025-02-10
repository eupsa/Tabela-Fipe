var dados = new FormData();

dados.append("tipo", "carros");

$.ajax({
  url: "consultar.php",
  method: "GET",
  data: dados,
  processData: false,
  contentType: false,
  sucess: function (resp) {
    console.log(resp);
  },
});
