function sendMail(contactForm) {
    emailjs.send("service_dxefuql","template_3zux9ig", {
        "to_name": contactForm.name.value,
         "from_email": contactForm.name.value,
         "message": contactForm.name.value
    })
    .then(
        function(response) {
            console.log("SUCCESSFUL", response);
        },
    function(error) {
        console.log("Failled", error);
    });

    return false;
    
}