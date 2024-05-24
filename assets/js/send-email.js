
function sendMail(contactForm) {
    console.log('sendMail invoked')
    emailjs.send("service_dxefuql","template_3zux9ig",{
        to_name: contactForm.name.value,
        from_name: contactForm.emailaddress.value,
        message: contactForm.projectsummary.value,
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

