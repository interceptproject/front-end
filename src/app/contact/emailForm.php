<?php 
        
        $name=$_POST['name1'];
        $name= htmlspecialchars($name, ENT_QUOTES);
        $email=$_POST['email1'];
        $message=$_POST['msg1'];
        $message = htmlspecialchars($message, ENT_QUOTES);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "false";
        }
        else
        {
            $to='domkynkor@gmail.com';
            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            $subject = 'Cross Out Cancer - Help';
            $headers2 = $headers.'From: Cross Out Cancer' . "\r\n".'To:<'.$email.'>'. "\r\n";
            $headers .= 'From:'.$name.'<'.$email.'>'. "\r\n";

            mail($to, $subject, $message, $headers);
            mail($email, $subject, $message, $headers2);
            echo "Mail Sent";
        }           

?>