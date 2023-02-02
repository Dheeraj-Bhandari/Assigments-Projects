// Adding Country Code in Form 
    const input = document.querySelector("#mobile_code");
    window.intlTelInput(input, {
        initialCounry: "auto",
        geoIpLookup: function(callback) {
            $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                const countryCode = (resp && resp.country) ? resp.country : "us";

                callback(countryCode);
            });
        }
    });


  // Cheking Email Validation
  function validateEmail(email) {
    const re =
      /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }


  // Checking Form Input 
    document.getElementById("submit").addEventListener("click", handleInputData)
    function handleInputData(event){
        event.preventDefault()
        let email = document.getElementById('email').value

        // Getting Selected Country Code
        let countryCode = document.querySelector('.iti__selected-flag').title
        countryCode = countryCode.split(" ")
        countryCode = countryCode[countryCode.length - 1]

        let phone = document.getElementById('mobile_code').value
       
        // Checking If Phone Number contain Other then Digit
        var regExpAlphabates = /[a-zA-Z]/g;

        if (email === "" || validateEmail(email) === false) {
            return alert("You have entered an invalid email address")
          }
        if (phone==="" || regExpAlphabates.test(phone) || phone.length<10 || phone.length > 10) {
            return alert("You have entered an invalid Mobile number")
          }
       
          localStorage.setItem('webengagaeEmail', email)
          localStorage.setItem('webengagaePhone', `${countryCode} ${phone}`)
       
          // After Validation Redirecting to Thank you Page
          window.location.assign("/pages/ThankYou.html")
    }