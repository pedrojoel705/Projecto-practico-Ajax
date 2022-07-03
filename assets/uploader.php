<?php
//echo "hola, Respuesta desde el servidor";
//var_dump($_FILES);

/* This is the PHP code that will be executed when the form is submitted. It checks if the file is set,
and if it is, it gets the name, tmp_name, and error. It then sets the destination to the file
folder, and uploads the file to that destination. If the file is uploaded, it will return a JSON
object with the file name, and if it is not uploaded, it will return a JSON object with the error. */
if(isset($_FILES["file"])){
    $name = $_FILES["file"]["name"];
    $file = $_FILES["file"]["tmp_name"];
    $error = $_FILES["file"]["error"];
    $destination = "../file/$name";
    $upload = move_uploaded_file($file, $destination);

    if($upload){
        $res = array(
            "err"=> false,
            "status"=> http_response_code(200),
            "statusText"=>"Archivo $name Cargado con Exito",
            "file"=> $_FILES["file"]
        );
    }else{
        $res = array(
            "err"=> true,
            "status"=> http_response_code(400),
            "statusText"=>"Erro al subir el Archivo $name",
            "file"=> $_FILES["file"]
        );

    }

    echo json_encode($res);
}