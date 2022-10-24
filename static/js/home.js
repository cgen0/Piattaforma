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
  var $detail=document.getElementById("detail-page");
  var $main=document.getElementById("main-page");
  var $detailRows=document.getElementsByClassName("table-detail");
  for (b = 0; b < $detailRows.length; b++){

    if (!($detailRows[b].getAttribute("id")==elem.id+"-detail")){
       $detailRows[b].style.display = 'none'
       }
    else{
       $detailRows[b].style.display = 'table'}

  }

  $detail.classList.remove("hidden");
  $detail.setAttribute("class", "slide-right-center" );
  $main.setAttribute("class", "slide-center-left" );
  $main.classList.add("hidden");
}





function detailClose() {
    var $detail=document.getElementById("detail-page");
    var $main=document.getElementById("main-page");
    var $inputs = document.getElementsByClassName("edit-input");
    for (var i = 0; i < $inputs.length; i++) {
        $inputs[i].disabled=true;
}
    cancelEdit()

    $main.classList.remove("hidden");
    $main.setAttribute("class", "slide-left-center" );
    $detail.setAttribute("class", "slide-center-right" );
    $detail.classList.add("hidden");

}


function addClose() {
    var $add=document.getElementById("add-page");
    var $main=document.getElementById("main-page");
    $main.classList.remove("hidden");
    $main.setAttribute("class", "slide-left-center" );
    $add.setAttribute("class", "slide-center-right" );
    $add.classList.add("hidden");
    form_inputs=$('[id="new"] [class="add-input"]')
    for (var i = 0; i < form_inputs.length; i++) {
        form_inputs[i].value="";
}


}

function editForm() {
  var inputs = document.getElementsByClassName("edit-input");
  $('form').find(':input').each(function(i, elem) {
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
    $('form').find(':input').each(function(i, elem) {
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

var inputs = document.getElementsByClassName("edit-input");
for (var i = 0; i < inputs.length-1; i++) {
    inputs[i].disabled = true;
    inputs[i].readonly = true;}



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
   document.getElementById(server_message.pratica+'-detail').classList.add("added");


   }
}

