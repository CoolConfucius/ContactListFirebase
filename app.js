'use strict';

var ref = new Firebase('https://20160118.firebaseio.com/'); 
var contactListRef = ref.child('contactList'); 
var $newName, $newPhone, $newEmail, $newBirthday, $body;


$(document).ready(function(){
  $newName = $('#newName'); 
  $newPhone = $('#newPhone'); 
  $newEmail = $('#newEmail'); 
  $newBirthday = $('#newBirthday'); 
  $body = $('#body'); 
  
  $('#add').click(add); 
});





function add(){  
  var name = $newName.val();
  var phone = $newPhone.val();
  var email = $newEmail.val();
  var birthday = $newBirthday.val();
  $newName.val('');
  $newPhone.val('');
  $newEmail.val('');
  $newBirthday.val('');
  
  contactListRef.push({
    name: name, 
    phone: phone, 
    email: email, 
    birthday: birthday 
  }); 
}

contactListRef.on('value', function(snapshot) {
  
  var contactObject = snapshot.val(); 
  for (var key in contactObject) {

    if (contactObject.hasOwnProperty(key)) {

      var name = contactObject[key].name; 
      var phone = contactObject[key].phone; 
      var email = contactObject[key].email; 

      var $li = $('<li>').text(name + ': ' + phone + ": " + email);
      $body.append($li); 
      
    };
  };

});
