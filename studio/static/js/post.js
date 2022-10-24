document.getElementById("logo").addEventListener('click', navbarOpen, false);
var elements = document.getElementsByClassName("nav-link");

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", changeContent, false);}

rw = document.getElementsByClassName('main-row');

for (i = 0; i < rw.length; i++) {
    rw[i].addEventListener("webkitAnimationEnd", animationEndAction);
    rw[i].addEventListener("onanimationEnd", animationEndAction);
    rw[i].addEventListener("msAnimationEnd", animationEndAction);
    rw[i].addEventListener("animationEnd", animationEndAction);}



document.getElementsByClassName("submit")[0].addEventListener('click', completeEdit, false);

$('#delete-button').on('click', function(event){
    var $pratica=document.querySelector('[style="display: table;"] [name="pratica"]').value
    delete_post();
    document.getElementsByClassName("button-row")[0].style.display='none';
    document.getElementsByClassName("edit")[0].style.display='unset';
    document.getElementsByClassName("delete")[0].style.display='unset';
    document.getElementsByClassName("delete")[0].style.display='unset';
    document.getElementById($pratica+"-detail").remove();
    document.getElementById($pratica+"-user-submenu").remove();


    detailClose();

    });


function openPasswordPage() {
    $('#post-form-password').find('.password-input').each(function(i, elem) {
             var input = $(elem);
             input.val('');
        });

  var $password=document.getElementById("password-page");
  var $main=document.getElementById("settings-page");

  $password.classList.remove("hidden");
  $password.setAttribute("class", "slide-right-center page" );
  $main.setAttribute("class", "slide-center-left page" );
  $main.classList.add("hidden");
  $('#post-form-password').on('submit', function(event){
    event.preventDefault();
    change_password();

    });
}
function openUsernamePage() {

    $('#post-form-username').on('submit', function(event){
    event.preventDefault();
    $('#new-username').data('initialState', input.val());
    change_username();

    });


  var input = $('#new-username');
  input.data('initialState', input.val());
  var $username=document.getElementById("username-page");
  var $main=document.getElementById("settings-page");

  $username.classList.remove("hidden");
  $username.setAttribute("class", "slide-right-center page" );
  $main.setAttribute("class", "slide-center-left page" );
  $main.classList.add("hidden");
  $('#post-form-usrename').on('submit', function(event){
    event.preventDefault();
    change_username();

    });
}

function openUsersPage() {

  var input = $('#new-username');
  input.data('initialState', input.val());
  var $users=document.getElementById("users-page");
  var $main=document.getElementById("settings-page");

  $users.classList.remove("hidden");
  $users.setAttribute("class", "slide-right-center page" );
  $main.setAttribute("class", "slide-center-left page" );
  $main.classList.add("hidden");
  $('#edit-guest').on('submit', function(event){
    event.preventDefault();
    edit_guest();

    });
}


// Submit post on submit

$('#post-form').on('submit', function(event){
    event.preventDefault();
    edit_post();
    document.getElementsByClassName("button-row")[0].style.display='none';
    document.getElementsByClassName("edit")[0].style.display='unset';
    document.getElementsByClassName("delete")[0].style.display='unset';

    });

$('#post-form-add').on('submit', function(event){
    event.preventDefault();
    add_post();

    });

$('#post-form-add-user').on('submit', function(event){
    event.preventDefault();
    add_user();

    });
var inputs = document.getElementsByClassName("edit-input");
for (var i = 0; i < inputs.length-1; i++) {
    inputs[i].disabled = true;
    inputs[i].readonly = true;}
