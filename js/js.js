window.addEventListener('DOMContentLoaded', (event) => {
   
   //get user name
   let okButton = document.getElementById("ok");
   okButton.addEventListener("click",function(event) {
       let name= document.getElementById("nameInput").value;
       document.getElementById("nameAfterInput").innerHTML=name;
       console.log(name);
       console.log("test");

});
   //get year to copyright in footer
    let today = new Date();
    let year = today.getFullYear();
    document.getElementById("footer").innerHTML = "<p>Copyright &copy;"+year+"</p>";
});