<?php
  $apiKey = 'AIzaSyDi_fTo1ZyQ0EHJNPqAjxDPMTpMaUvKsE0'; // '<paste your API key here>';
  $text = '<p><br />La vitrina de l\'objecte destacat del Museu Olímpic i de l\'Esport ens mostra col&middot;leccions que atresora el museu però que no formen part de la seva exposició permanent. Des del dia 24 de setembre i fins al 10 de febrer podreu veure objectes que ens recorden la celebració els Jocs Olímpics de Mèxic l\'any 1968, enguany fa 50 anys.</p>';
  $url = 'https://www.googleapis.com/language/translate/v2?key=' . $apiKey . '&q=' . rawurlencode($text) . '&source=en&target=fr';

  $handle = curl_init($url);
  curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($handle);
  $responseDecoded = json_decode($response, true);
  curl_close($handle);

  echo 'Source: ' . $text . '<br>';
  echo 'Translation in Francés: ' . $responseDecoded['data']['translations'][0]['translatedText'];

  $url = 'https://www.googleapis.com/language/translate/v2?key=' . $apiKey . '&q=' . rawurlencode($text) . '&source=en&target=es';

  $handle = curl_init($url);
  curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($handle);
  $responseDecoded = json_decode($response, true);
  curl_close($handle);

  echo '<br>';
  echo 'Translation in Español: ' . $responseDecoded['data']['translations'][0]['translatedText'];

  $url = 'https://www.googleapis.com/language/translate/v2?key=' . $apiKey . '&q=' . rawurlencode($text) . '&source=en&target=en';

  $handle = curl_init($url);
  curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($handle);
  $responseDecoded = json_decode($response, true);
  curl_close($handle);

  echo '<br>';
  echo 'Translation en inglés: ' . $responseDecoded['data']['translations'][0]['translatedText'];
?>