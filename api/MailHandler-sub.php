<?php
    $ini_array = parse_ini_file("../../mindnervesca_php.ini");

    $host = $ini_array['host'];
    $port = $ini_array['port'];
    $username = $ini_array['username'];
    $password = $ini_array['password'];
	$to = $ini_array['to'];
    $from = $ini_array['from'];

	$sbj_visitor='Newsletter subscription confirmation email from ';
	$sbj_owner='Newsletter subscription request from ';
	$header="Content-type: text/html; charset=utf-8 \r\n";
	
    $name=$_POST['name'];
	$email=$_POST['email'];
	$owner=$_POST['owner'];
	
    $owner_email=$_POST['owner_email'];
	$sitename=$_POST['sitename'];
	
    $sbj_visitor.=$sitename;
	$sbj_owner.=$sitename;
	
	$msg_visitor='<a href="http://'.$sitename.'">'.$sitename.'</a>'."\n".'<br>'.'Hi, '.$name."\n".'<br>'.'Thank you for subscribing to our newsletter!';		
	$msg_owner='<a href="http://'.$sitename.'">'.$sitename.'</a>'."\n".'<br>'.'This email has been sent via newsletter subscription form on your website. A new visitor would like to be added to your website\'s newsletter:'."\n".'<br>'.'Visitor name: '.$name."\n".'<br>'.'Visitor email: '.$email."\n".'<br>'.'Please add him (her) to your newsletter list.';
	
    if($host=="" or $username=="" or $password==""){
        try{
            if(!mail($email,$sbj_visitor,$msg_visitor,$header.'From: '.$owner_email)){
                throw new Exception('mail failed');
            }else{
                echo "mail to visitor sent \n";
            }
        }catch(Exception $e){
            echo $e->getMessage() ."\n";
        }
        
        try{
            if(!mail($owner_email,$sbj_owner,$msg_owner,$header.'From: '.$email)){
                throw new Exception('mail failed');
            }else{
                echo "mail to owner sent";
            }
        }catch(Exception $e){
            echo $e->getMessage() ."\n";
        }
    }else{	
		require_once 'Mail.php';
		//$to = $_POST["owner_email"];
		$subject = 'A message from your site visitor ';
		$headers = array (
                    'From' => $from,
                    'To' => $to,
                    'Subject' => $subject
                );
		
        $messageBody = 'Interest shown by visitor - ' . $_POST["email"];

		$smtp = Mail::factory(
					'smtp',
					array (
						'host' => $host,
						'port' => $port,
						'auth' => true,
						'username' => $username,
						'password' => $password));
		$mail = $smtp->send($to, $headers, $messageBody);
		
		try{
			if(PEAR::isError($mail)){
				echo $mail->getMessage();
			}else{
				echo 'mail sent';
            }
        }catch(Exception $mail){
            echo $mail->getMessage() ."\n";
        }
	}	
?>