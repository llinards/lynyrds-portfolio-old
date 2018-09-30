<?php

$recipient_email    = "linards@lynyrds.com"; //recepient
$from_email         = "linards@lynyrds.com"; //from email using site domain.


if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    die('Sorry Request must be Ajax POST'); //exit script
}

if($_POST){
    
    $sender_first_name = filter_var($_POST["name"], FILTER_SANITIZE_STRING); // vards    
    $sender_email   = filter_var($_POST["email"], FILTER_SANITIZE_STRING); //capture sender email
    $sender_question        = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
      
    //php validation, exit outputting json string
    if(strlen($sender_first_name)<1){
        print json_encode(array('type'=>'error', 'text' => 'Vārds ir aizdomīgi īss!'));
        exit;
    }

    if(!filter_var($sender_email, FILTER_VALIDATE_EMAIL)){ 
        print json_encode(array('type'=>'error', 'text' => 'Lūdzu ievadiet pareizu e-pastu!'));
        exit;
    }

    if(strlen($sender_question)<1){
        print json_encode(array('type'=>'error', 'text' => 'Jautājuma formā ir kļūda!'));
        exit;
    }   
   
    $boundary = md5("sanwebe.com"); 
    
    //construct a message body to be sent to recipient
    $message_body = "";
    $message_body .= "Sveiki!\n";
    $message_body .= "Kāds interesējas par Taviem pakalpojumiem! :).\n";
    $message_body .= "Vārds: $sender_first_name\n"; 
    $message_body .= "E-pasts: $sender_email\n";
    $message_body .= "Jautājums:\n";
    $message_body .= "$sender_question\n";
    $message_body .=  "------------------------------\n";
    $message_body .= "Jautājums izveidots: " . date("Y/m/d H:i:sa");
   

   //send plain email otherwise
    $headers = "From:".$from_email."\r\n".
    $headers = "Content-Type: text/plain; charset=UTF-8";
    "Reply-To: ".$sender_email. "\n" .
    "X-Mailer: PHP/" . phpversion();
    $body = $message_body;
    
    $sentMail = mail($recipient_email, "New question!", $body, $headers);
    if($sentMail) //output success or failure messages
    {       
        print json_encode(array('type'=>'done', 'text' => 'Thanks! I will contact you back within 24 hours!'));
        exit;
    }else{
        print json_encode(array('type'=>'error', 'text' => 'Hmm, something went wrong! Try to reach me: linards@lynyrds.com'));  
        exit;
    }
}