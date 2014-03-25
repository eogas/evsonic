
var addMediaDir = function() {
    var nameField = document.getElementById('mediaDirName'),
        pathField = document.getElementById('mediaDirPath');

    $.post('/mediadir', {
        name: nameField.value,
        path: pathField.value
    }, function(data, status) {
        var mediaDirs = document.getElementById('media-dirs');

        // append the newly rendered media dir to the list
        mediaDirs.insertAdjacentHTML('beforeend', data);
    });
};
