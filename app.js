'use strict';

var ref = new Firebase('https://20160118.firebaseio.com/'); 
var contactListRef = ref.child('contactList'); 
var $newName, $newPhone, $newEmail, $newBirthday, $newGroup, $body;


$(document).ready(function(){
  $newName = $('#newName'); 
  $newPhone = $('#newPhone'); 
  $newEmail = $('#newEmail'); 
  $newBirthday = $('#newBirthday'); 
  $newGroup = $('#newGroup'); 
  $body = $('#body'); 
  
  $('#add').click(add); 
});





function add(){  
  var name = $newName.val();
  var phone = $newPhone.val();
  var email = $newEmail.val();
  var birthday = $newBirthday.val();
  var group = $newGroup.val();
  $newName.val('');
  $newPhone.val('');
  $newEmail.val('');
  $newBirthday.val('');
  $newGroup.val('');
  
  contactListRef.push({
    name: name, 
    phone: phone, 
    email: email, 
    birthday: birthday, 
    group: group
  }); 
}

contactListRef.on('value', function(snapshot) {
  
  var contactObject = snapshot.val(); 
  $body.empty(); 
  for (var key in contactObject) {

    if (contactObject.hasOwnProperty(key)) {

      var name = contactObject[key].name; 
      var phone = contactObject[key].phone; 
      var email = contactObject[key].email; 
      var birthday = contactObject[key].birthday; 
      var group = contactObject[key].group; 

      var $li = $('<li>').text(name + ': ' + phone + ": " + email + ": " + birthday + ": " + group).data('fbid', key);
      var $button = $('<button>').addClass('btn btn-danger remove').text('X').click(remove); 
      $li.append($button);
      $body.append($li); 
      
    };
  };

});

function remove(){
  var $this = $(this); 
  var $id = $this.parent().data('fbid'); 
  contactListRef.child($id).remove(); 
}