function navbarOpen() {
    b=document.getElementsByClassName("navbar")[0]
    if (b.classList.contains('open')){
        b.classList.remove("open");}
    else{
        b.classList.add("open");}
    }

function tableFilter() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filter_input");
  filter = input.value.toUpperCase();
  table = document.getElementsByClassName("table")[0];
  tr = document.querySelectorAll('div.main-row:not(.header)');

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByClassName("cell");
    var found = false
    for (j = 0; j < td.length; j++) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().includes(filter)){
          found = true
        }
    }
    if (!found){
            tr[i].style.display = "none";
    }
    else{
            tr[i].style.display = "";
    }
  }
}

function detailOpen(elem) {
    $('form').find('.edit-input').each(function(i, elem) {
             var input = $(elem);
             input.data('initialState', input.val());
        });

  var $detail=document.getElementById("detail-page");
  var $main=document.getElementById("home-page");
  var $detailRows=document.getElementsByClassName("table-detail");
  for (b = 0; b < $detailRows.length; b++){

    if (!($detailRows[b].getAttribute("id")==elem.id+"-detail")){
       $detailRows[b].style.display = 'none'
       }
    else{
       $detailRows[b].style.display = 'table'}

  }

  $detail.classList.remove("hidden");
  $detail.setAttribute("class", "slide-right-center page" );
  $main.setAttribute("class", "slide-center-left page" );
  $main.classList.add("hidden");
}
function detailUserOpen(elem) {
    $('form').find('.edit-input').each(function(i, elem) {
             var input = $(elem);
             input.data('initialState', input.val());
        });

  var $detail=document.getElementById("details-user-page");
  var $main=document.getElementById("users-page");

  var $detailpages=document.getElementsByClassName("table-users-detail");
  for (b = 0; b < $detailpages.length; b++){

    if (!($detailpages[b].getAttribute("id")==elem.id+"-user-detail")){
       $detailpages[b].style.display = 'none'
       }
    else{
       $detailpages[b].style.display = 'table'
       $checked_list=$detailpages[b].getAttribute("checked").split(',').filter(e =>  e);;
       }

  var $checkboxes_list=document.getElementsByClassName("checkbox");

  for (b = 0; b < $checkboxes_list.length; b++){
    if (!($checked_list.includes($checkboxes_list[b].getAttribute("id").split("-").pop()))){
        $checkboxes_list[b].checked=false;
    }
    else{
        $checkboxes_list[b].checked=true;


    }


    }


  }

  $detail.classList.remove("hidden");
  $detail.setAttribute("class", "slide-right-center page" );
  $main.setAttribute("class", "slide-center-left page" );
  $main.classList.add("hidden");
}



function detailClose() {
    var $detail=document.getElementById("detail-page");
    var $main=document.getElementById("home-page");
    var $inputs = document.getElementsByClassName("edit-input");
    for (var i = 0; i < $inputs.length; i++) {
        $inputs[i].disabled=true;
}
    cancelEdit()

    $main.classList.remove("hidden");
    $main.setAttribute("class", "slide-left-center page" );
    $detail.setAttribute("class", "slide-center-right page" );
    $detail.classList.add("hidden");

}

function addOpen() {
  var $main=document.getElementById("home-page");
  var $add=document.getElementById("add-page");
  $add.classList.remove("hidden");
  $add.setAttribute("class", "slide-right-center page" );
  $main.setAttribute("class", "slide-center-left page" );
  $main.classList.add("hidden");

}


function addClose() {
    var $add=document.getElementById("add-page");
    var $main=document.getElementById("home-page");
    $main.classList.remove("hidden");
    $main.setAttribute("class", "slide-left-center page" );
    $add.setAttribute("class", "slide-center-right page" );
    $add.classList.add("hidden");
    form_inputs=$('[id="new"] [class="add-input"]')
    for (var i = 0; i < form_inputs.length; i++) {
        form_inputs[i].value="";
}}

function addGuestOpen() {
  var $main=document.getElementById("users-page");
  var $add=document.getElementById("add-user-page");
  $add.classList.remove("hidden");
  $add.setAttribute("class", "slide-right-center page" );
  $main.setAttribute("class", "slide-center-left page" );
  $main.classList.add("hidden");

}


function addGuestClose() {
    var $add=document.getElementById("add-user-page");
    var $main=document.getElementById("users-page");
    $main.classList.remove("hidden");
    $main.setAttribute("class", "slide-left-center page" );
    $add.setAttribute("class", "slide-center-right page" );
    $add.classList.add("hidden");
    form_inputs=$('[id="new"] [class="add-input"]')
    for (var i = 0; i < form_inputs.length; i++) {
        form_inputs[i].value="";
}}

function passwordClose() {
    var $password=document.getElementById("password-page");
    var $main=document.getElementById("settings-page");
    $main.classList.remove("hidden");
    $main.setAttribute("class", "slide-left-center page" );
    $password.setAttribute("class", "slide-center-right page" );
    $password.classList.add("hidden");
    form_inputs=$('[class="password-input"]')
    for (var i = 0; i < form_inputs.length; i++) {
        form_inputs[i].value="";
}

}


function usernameClose() {
    var $username=document.getElementById("username-page");
    var $main=document.getElementById("settings-page");
    $main.classList.remove("hidden");
    $main.setAttribute("class", "slide-left-center page" );
    $username.setAttribute("class", "slide-center-right page" );
    $username.classList.add("hidden");
    var input = $('#new-username');
    input.val(input.data('initialState'));

}

function editForm() {
  var inputs = document.getElementsByClassName("edit-input");
  $('form').find('.edit-input').each(function(i, elem) {
         var input = $(elem);
         input.data('initialState', input.val());
    });

  for (var i = 1; i < inputs.length-1; i++) {
    inputs[i].disabled=false;
    inputs[i].readonly = false;
}
    document.getElementsByClassName("button-row")[0].style.display='table';
    document.getElementsByClassName("edit")[0].style.display='none';
    document.getElementsByClassName("delete")[0].style.display='none';

    }

function isVisible(e) {
    return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
}



function cancelEdit() {
   var inputs = document.getElementsByClassName("edit-input");
    $('form').find('.edit-input').each(function(i, elem) {
         var input = $(elem);
         input.val(input.data('initialState'));
    });
   for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled=true;
        inputs[i].readonly = true;}
    document.getElementsByClassName("button-row")[0].style.display='none';
    document.getElementsByClassName("edit")[0].style.display='unset';
    document.getElementsByClassName("delete")[0].style.display='unset';

    }

function completeEdit() {
   var inputs = document.getElementsByClassName("edit-input");

   for (var i = 0; i < inputs.length; i++) {
         inputs[i].disabled=true;
         inputs[i].readonly = true;}

    }


function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}




socket = new WebSocket("ws://"+ window.location.hostname + ":8000/reload/")
socket.onmessage = function(e){
   server_message = JSON.parse(e.data);

   if  (server_message.type==="update"){
   document.getElementById(server_message.pratica).children[1].textContent=server_message.nome
   $('[id='+server_message.pratica+'-detail] [name="nome"]')[0].value=server_message.nome
      $('[id='+server_message.pratica+'-detail] [name="indirizzo"]')[0].value=server_message.indirizzo

   if (isVisible( document.getElementById(server_message.pratica))){
        document.getElementById(server_message.pratica).classList.add("updated");}}



   if  (server_message.type==="del"){
   if (isVisible( document.getElementById(server_message.pratica))){
        document.getElementById(server_message.pratica).classList.add("deleted");

   setTimeout(function(){
       document.getElementById(server_message.pratica).remove()
   }, 1000);}
   else{
          document.getElementById(server_message.pratica).remove()

   }


   }

   if  (server_message.type==="add"){
   var table = document.getElementById("table");
   el=htmlToElement('<div class="row main-row" id='+ server_message.pratica +' onClick="detailOpen(this)">'+
                  '  <div class="cell cell-main" data-title="Numero Pratica">'+ server_message.pratica +'</div>'+
                  '  <div class="cell cell-main" data-title="Nome">'+ server_message.nome +'</div>'+
                  '</div>')

   el.addEventListener("webkitAnimationEnd", animationEndAction);
   el.addEventListener("onanimationEnd", animationEndAction);
   el.addEventListener("msAnimationEnd", animationEndAction);
   el.addEventListener("animationEnd", animationEndAction);
   table.appendChild(el)



   d_html='<div class="table table-detail" id="'+ server_message.pratica +'-detail" >'
   delete server_message.type
   var keyz=Object.keys(server_message)
   for (k in keyz) {
      d_html=d_html+'   <div class="row">'+
          '     <div class="cell cell-detail title" for="'+ keyz[k] +'">'+ keyz[k] +'</div> '+
          '     <div class="cell cell-detail" >'+
          '     <input id="'+ keyz[k] +'" class="edit-input" type="text" name="'+ keyz[k] +'" value="'+ server_message[keyz[k]] + '" disabled>'+
          '     </div>'+
          '   </div>'
          }

   d_html=d_html+'</div>'
   var d_table = document.getElementById("post-form");
   var row= document.getElementById("button-row-add")
   d_el=htmlToElement(d_html)
   d_table.insertBefore(d_el,row)

   document.getElementById(server_message.pratica).classList.add("added");
   //document.getElementById(server_message.pratica+'-detail').classList.add("added");


   }

}
function changeContent() {
  Object.entries(document.getElementsByClassName("page")).forEach((item) => {
   item[1].classList.add('hidden');
 })
  document.getElementById([event.srcElement.id]+'-page').setAttribute("class", "slide-left-center page" );
  b=document.getElementsByClassName("nav-link")
  for (var i = 0; i < b.length; i++) {
    b[i].classList.remove('active');
  }
  a=event.srcElement
  a.classList.add("active");
}





// JavaScript function to get cookie by name; retrieved from https://docs.djangoproject.com/en/3.1/ref/csrf/
    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// AJAX for posting
function edit_post() {
    var $pratica=document.querySelector('[style="display: table;"] [name="pratica"]').value

// sanity check
    $.ajax({
        url : "edit/"+$pratica+"/", // the endpoint
        type : "POST", // http method
        headers: {
                "X-CSRFToken": getCookie("csrftoken")},
        data : { nome : document.querySelector('[style="display: table;"] [name="nome"]').value, indirizzo : document.querySelector('[style="display: table;"] [name="indirizzo"]').value }, // data sent with the post request
        // handle a successful response
        success : function(json) {
         $('form').find('.edit-input').each(function(i, elem) {
         var input = $(elem);
         input.data('initialState', input.val());
         });
        form_inputs=$('[id="new"] [class="add-input"]')
        for (var i = 0; i < form_inputs.length; i++) {
          form_inputs[i].value="";}
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};
function delete_post() {
// sanity check
    var $pratica=document.querySelector('[style="display: table;"] [name="pratica"]').value
    $.ajax({
        url : "delete/"+$pratica+"/", // the endpoint
        type : "POST", // http method
        headers: {
                "X-CSRFToken": getCookie("csrftoken")},

         success : function(json) {

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};
function add_post() {
// sanity check
    $.ajax({
        url : "add/", // the endpoint
        type : "POST", // http method
        headers: {
                "X-CSRFToken": getCookie("csrftoken")},
        data : { pratica : document.querySelector('[id="post-form-add"] [name="pratica"]').value, nome : document.querySelector('[id="post-form-add"] [name="nome"]').value, indirizzo : document.querySelector('[id="post-form-add"] [name="indirizzo"]').value }, // data sent with the post request

         success : function(json) {
            var n_html='<div class="row main-row check-row" id="'+document.querySelector('[id="post-form-add"] [name="pratica"]').value+'-user-submenu" >'+
                  '<div class="cell cell-detail" data-title="Numero Pratica">'+document.querySelector('[id="post-form-add"] [name="pratica"]').value+'</div>'+
                  '<div class="cell cell-detail" data-title="Nome">'+ document.querySelector('[id="post-form-add"] [name="nome"]').value +'</div>'+
                  '<div class="cell cell-detail cell-check" data-title="Accesso">'+
                    '<input id="checkbox-'+document.querySelector('[id="post-form-add"] [name="pratica"]').value+'" class="checkbox" data-pratica="'+document.querySelector('[id="post-form-add"] [name="pratica"]').value+'" user="2" type="checkbox" data-title="Accesso">'+
                  '</div>';
            var n_el=htmlToElement(n_html)
            var n_tables=document.getElementsByClassName("table table-users-detail table-password")
            for (i=0; i < n_tables.length; i++){
                console.log(i)
                n_tables[i].appendChild(n_el)
            }
            addClose();
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
           Swal.fire({
              title: 'Errore',
              text: 'Controlla la correttezza dei dati.',
              icon: 'error',
              confirmButtonColor: '#1EA5FC',
              width: '350px',
              confirmButtonText: 'OK'
            })
        }
    });
};

function add_user() {
// sanity check
    $.ajax({
        url : "add-user/", // the endpoint
        type : "POST", // http method
        headers: {
                "X-CSRFToken": getCookie("csrftoken")},
        data : { username : document.querySelector('[id="post-form-add-user"] [name="username"]').value, password : document.querySelector('[id="post-form-add-user"] [name="password"]').value }, // data sent with the post request

         success : function(json) {
            var n_html='<div class="row main-row check-row" id="'+document.querySelector('[id="post-form-add"] [name="pratica"]').value+'-user-submenu" >'+
                  '<div class="cell cell-detail" data-title="Numero Pratica">'+document.querySelector('[id="post-form-add"] [name="pratica"]').value+'</div>'+
                  '<div class="cell cell-detail" data-title="Nome">'+ document.querySelector('[id="post-form-add"] [name="nome"]').value +'</div>'+
                  '<div class="cell cell-detail cell-check" data-title="Accesso">'+
                    '<input id="checkbox-'+document.querySelector('[id="post-form-add"] [name="pratica"]').value+'" class="checkbox" data-pratica="'+document.querySelector('[id="post-form-add"] [name="pratica"]').value+'" user="2" type="checkbox" data-title="Accesso">'+
                  '</div>';
            var n_el=htmlToElement(n_html)
            var n_tables=document.getElementsByClassName("table table-users-detail table-password")
            for (i=0; i < n_tables.length; i++){
                console.log(i)
                n_tables[i].appendChild(n_el)
            }
            addClose();
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
           Swal.fire({
              title: 'Errore',
              text: 'Controlla la correttezza dei dati.',
              icon: 'error',
              confirmButtonColor: '#1EA5FC',
              width: '350px',
              confirmButtonText: 'OK'
            })
        }
    });
};

function change_password() {
// sanity check
    $.ajax({
        url : "change-password/", // the endpoint
        type : "POST", // http method
        headers: {
                "X-CSRFToken": getCookie("csrftoken")},
        data : { oldpassword : document.getElementById("old-pass").value, newpassword : document.getElementById('new-pass').value }, // data sent with the post request

         success : function(json) {
            passwordClose();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
           Swal.fire({
            title: 'Errore',
            text: 'Password errata',
            icon: 'error',
            confirmButtonColor: '#1EA5FC',
            width: '350px',



  confirmButtonText: 'OK'
})
        }
    });
};

function change_username() {
// sanity check
    $.ajax({
        url : "change-username/", // the endpoint
        type : "POST", // http method
        headers: {
                "X-CSRFToken": getCookie("csrftoken")},
        data : { username : document.getElementById("new-username").value}, // data sent with the post request

         success : function(json) {
            usernameClose();

        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
           Swal.fire({
            title: 'Errore',
            text: 'Controlla la correttezza dei dati',
            icon: 'error',
            confirmButtonColor: '#1EA5FC',
            width: '350px',



  confirmButtonText: 'OK'
})
        }
    });
};

function edit_guest() {
    $guest_id=document.querySelector('[style="display: table;"][class="table table-users-detail table-password"]').getAttribute("guest");
    $checked = $('input[user='+$guest_id + ']:checked').map(function(){
      return $(this).data("pratica");
      }).get();
     console.log($checked)

    $unchecked = $('input[user='+$guest_id + ']:not(:checked)').map(function(){
      return $(this).data("pratica");
      }).get();
              console.log($unchecked)



// sanity check
    $.ajax({
        url : "edit-guest/"+$guest_id+"/", // the endpoint
        type : "POST", // http method
        headers: {
                "X-CSRFToken": getCookie("csrftoken")},
        data : {  checked : JSON.stringify($checked),unchecked : JSON.stringify($unchecked), }, // data sent with the post request
        // handle a successful response
        success : function(json) {
            for (i = 0; i < $unchecked.length; i++) {
            //remove elements if it were in list

                if  (document.getElementById($guest_id+"-bubble-"+$unchecked[i]) != null ){
                    document.getElementById($guest_id+"-bubble-"+$unchecked[i]).remove();}
                    }
            $list= document.getElementById("bubble-container");

            for (i = 0; i < $checked.length; i++) {
            //add elements if it weren't  in list
                if  (document.getElementById($guest_id+"-bubble-"+$checked[i]) == null){
                    sl=htmlToElement('<div class="bubble pratica" id='+$guest_id+'-bubble-' + $checked[i] + ' >' + $checked[i] + '</div>')
                    $list.appendChild(sl);}}
            document.getElementById($guest_id+"-user-detail").setAttribute("checked",$checked+"")},

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);}
    });
};


function animationEndAction(){
        event.srcElement.classList.remove("updated");
        event.srcElement.classList.remove("added");
}
