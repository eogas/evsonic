// todo



//
// var addMediaDir = function() {
//     var nameField = document.getElementById('mediaDirName'),
//         pathField = document.getElementById('mediaDirPath');
//
//     $.post('/mediadir', {
//         name: nameField.value,
//         path: pathField.value
//     })
//     .done(function(data) {
//         var mediaDirs = document.getElementById('media-dirs');
//
//         // append the newly rendered media dir to the list
//         mediaDirs.insertAdjacentHTML('beforeend', data);
//     })
//     .fail(function(err) {
//         console.log(err.responseText);
//     });
// };
//
// var removeMediaDir = function(btn) {
//     var mediaDirs = document.getElementById('media-dirs'),
//         mediaDirElem = btn.parentElement,
//         id = mediaDirElem.getAttribute('data-id');
//
//     $.ajax({
//         url: '/mediadir/' + id,
//         type: 'DELETE'
//     })
//     .done(function(data) {
//         mediaDirs.removeChild(mediaDirElem);
//     })
//     .fail(function(err) {
//         console.log(err.responseText);
//     });
// };
