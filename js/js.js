/* • Skriv en fungerande Quiz-applikation. Visa på sidan hur många frågor som är besvarade.
• Låt användaren bestämma hur många frågor som ska visas.
• Skriv klassen Quiz. Den ska hålla reda på användarens namn, frågorna som ingår och hur många frågor som har besvarats korrekt/felaktigt.
• Skriv klassen Question. Den ska hålla reda på frågekategori, fråga, svarsalternativ och om svarsalternativet är korrekt eller inte. (Hur kan vi lösa det?)
• Lämna in projektet som ett git-repo.
• VG: Klassen ska ha en correct-metod, som tar en array som parameter. Arrayen ska innehålla de DOM-element som hör till frågan och kontrollera vilka alternativ som är korrekt ifyllda.
• VG: Visa en fråga i taget, låt användaren bläddra mellan dem.
• VG: Responsiv design (edited)  */

window.addEventListener('DOMContentLoaded', (event) => {

    //get user name
    let okButton = document.getElementById("ok");
    okButton.addEventListener("click", function (event) {
        window.location.href = "quiz.html";
        let name = document.getElementById("nameInput").value;
        let numOfQuestion = document.getElementById("chooseQuestion").selectedIndex+1;

        localStorage.setItem('playerName', name);
        localStorage.setItem('playernumOfQuestion',  numOfQuestion);
   
        console.log(numOfQuestion);
        console.log(name);
        console.log("test");
    });

    //get year to copyright in footer
    let today = new Date();
    let year = today.getFullYear();
    document.getElementById("footer").innerHTML = "<p>Copyright &copy;" + year + "</p>";
});