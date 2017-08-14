<?php
 require_once "Mail.php";

 $ini_array = parse_ini_file("../../mindnervesca_php.ini");

 $from = $ini_array['from'];
 $to = $ini_array['to'];
 $subject = "Hi!";
 $body = "Hi,\n\nHow are you?";

 $host = $ini_array['host'];
 $port = $ini_array['port'];
 $username = $ini_array['username'];
 $password = $ini_array['password'];

 $headers = array ('From' => $from,
   'To' => $to,
   'Subject' => $subject);
 $smtp = Mail::factory('smtp',
   array ('host' => $host,
     'port' => $port,
     'auth' => true,
     'username' => $username,
     'password' => $password));

 $mail = $smtp->send($to, $headers, $body);

 if (PEAR::isError($mail)) {
   echo("<p>" . $mail->getMessage() . "</p>");
  } else {
   echo("<p>Message successfully sent!</p>");
  }
?>
