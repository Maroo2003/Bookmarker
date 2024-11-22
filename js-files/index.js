siteNameInput = document.getElementById("siteName");
siteUrlInput = document.getElementById("siteUrl");


var sitesContainer =[];
if(localStorage.getItem('site')!== null){
    sitesContainer = JSON.parse(localStorage.getItem("site"));
    display();
}

function addSite(){

    if(
        validateSite(siteNameInput)&&
        validateSite(siteUrlInput)
    ){
        var site = {
            siteName : siteNameInput.value,
            siteUrl : siteUrlInput.value
        }
    
        sitesContainer.push(site);
        localStorage.setItem('site' , JSON.stringify(sitesContainer));
        
        display();
        clearForm();
        console.log("Add");
        

    }else{
        Swal.fire({
            title: "The Site Name Or URL is Invalid! ",
            
            text: "Site Name or Url is not valid, Please follow the rules below :",
            icon: "error",
            html: `
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li class="text-decoration-none text-start text-black my-2" style="padding-left: 1.5em; text-indent: -1.5em;">
                <i class="fa-regular fa-circle-right"></i> Site name must contain at least 3 characters
              </li>
              <li class="text-decoration-none text-start text-black" style="padding-left: 1.5em; text-indent: -1.5em;">
                <i class="fa-regular fa-circle-right"></i> Site URL must be a valid one
              </li>
            </ul>
          `,
            customClass: {
                title: 'swal-custom-title' 
            },
            width: 600,
            showCloseButton: true,
            padding: "3em",
            color: "#d30820",
            background: "#fff url(/images/trees.png)",
            
            didOpen: () => {
                const button = Swal.getConfirmButton(); 
                button.style.backgroundColor = "red";     
              },
            
          });
        
        
        
    }
        

    
    
}


  

function clearForm(){
    siteNameInput.value = null;
    siteUrlInput.value = null;

    siteNameInput.classList.remove("is-valid")
    siteUrlInput.classList.remove("is-valid")

}


function deleteSite(deletedIndex){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger mx-3",
          cancelButton: "btn btn-outline-secondary"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            sitesContainer.splice(deletedIndex , 1);
            display();
            localStorage.setItem('site' , JSON.stringify(sitesContainer));
         
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

       
}
var index;
function display(){
    
    var cartona = '';

    for(var i = 0 ; i < sitesContainer.length ; i++){
        cartona+=`
                <tr>
                    <td class="text-center align-self-center">${i+1}</td>
                    <td class="text-center fs-5 align-self-center">${sitesContainer[i].siteName}</td>
                    <td class="text-center fw-bold"><button onclick="sendToWebsite(${i})" type="button" class="btn btn-primary fw-bold"><i class="fa-solid fa-eye me-2"></i>Visit</button></td>
                    <td class="text-center fw-bold"><button onclick="deleteSite(${i})" type="button" class="btn btn-danger fw-bold"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
                </tr>
        `



    }
    document.getElementById("tableContent").innerHTML = cartona
}

function validateSite(element){
    
    var regex = {
        siteName : /^.{3,}$/,
        siteUrl : /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
    }
    if(regex[element.id].test(element.value)){
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        return true;
    }else{
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false;
    }
   
}

function sendToWebsite(index){

  url = sitesContainer[index].siteUrl;

  if(!/^https?:\/\//i.test(url)){
    window.open(`https://${url}`,"_blank");
    console.log("not done");
    
  }else{
    window.open(url , "_blank");
    console.log("done");
    
  }

}

