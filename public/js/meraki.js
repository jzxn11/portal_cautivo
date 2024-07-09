// Parse paramaters
var base_grant_url = decodeURIComponent(GetURLParameter("base_grant_url"));
var user_continue_url = decodeURIComponent(GetURLParameter("user_continue_url"));
var node_mac = GetURLParameter("node_mac");
var client_ip = GetURLParameter("client_ip");
var client_mac = GetURLParameter("client_mac");

// Print Meraki provided paramaters for Debugging State
console.log("user_continue_url: "+user_continue_url);
console.log("client_ip: "+client_ip);
document.getElementById("baseGrantURL").innerHTML = base_grant_url;
document.getElementById("userContinueURL").innerHTML = user_continue_url;
document.getElementById("clientIP").innerHTML = client_ip;
document.getElementById("clientMAC").innerHTML = client_mac;
document.getElementById("nodeMAC").innerHTML = node_mac;

// Form Submit handler. 
document.getElementById('loginForm1').onsubmit= function(e){
    e.preventDefault(); //prevents default form submission process to allow login and validation
    login();
}

// ******************
// Login to Meraki by redirecting client to the base_grant_url 
// 
// The logingUrl will add a continue_url parameter for a final client
// redirect to their intended site. 
// (you could override this url to send the user to a home page)
// ****************** 
function authUser(){

    var loginUrl = base_grant_url;
    if(user_continue_url !== "undefined"){
        loginUrl += "?continue_url="+user_continue_url;
    }
    console.log("Logging in... ",loginUrl);
    // redirect browser to meraki auth URL.
    window.location.href = loginUrl;
}

// Button handler function to store the form data and login. 
function login(){
    // send the data somewhere like a database
    var data = {};
    data.name = document.getElementById("name").value;
    data.email = document.getElementById("email").value;
    data.age = document.getElementById("age").value;
    data.gender = document.getElementById("gender").value;
    alert("Hello "+data.name +"\n"+"Thanks for providing your email: "+data.email);
    console.log("Storing data to db...", data);

    //Send data
  fetch('http://localhost:5000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: data.name, email: data.email })
  })
  .then(response => response.text())
  .then(datos => {
    console.log(datos);
  })
  .catch(error => {
    console.error('Error:', error);
  });

    // Complete Login
    authUser();

}

// Helper function to parse URL
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
// meraki.js

function showNextPage() {
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
}

// Aquí puedes añadir cualquier otra lógica adicional para manejar el envío del segundo formulario
