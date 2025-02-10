<?php

$tipo = $_GET['tipo'];

$url = file_get_contents('https://parallelum.com.br/fipe/api/v1/motos/marcas');
$response = file_get_contents($url);

$marcas = json_decode($response, true);
echo json_encode($marcas);
