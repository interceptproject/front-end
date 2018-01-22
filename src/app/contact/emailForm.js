$(document).ready(function(){  
$("#submitEmail").click(function(){
var name = $("#name").val();
var email = $("#email").val();
var message = $("#message").val();
if (name == '' || email == '' || message == '') 
{
    document.getElementById('email').placeholder='Field Left Blank!';
    document.getElementById('name').placeholder='Field Left Blank!';
    document.getElementById('message').placeholder='Field Left Blank!';
}
else
{
    $.post("emailForm.php",{ name1: name, email1: email, msg1:message},
            function(data) {
            if (data=="false") {
                document.getElementById('email').placeholder='Invalid Email!';
                document.getElementById('email').value='';
            };
            if (data=="Mail Sent") {
                document.getElementById('mailSent').style.display="block";
            };
            $('#emailForm')[0].reset(); //To reset form fields
            });
    
    }
});
});