var apiUrl = 'chat.php';

function disableStage(active) {
    $('#txtUsername').prop('disabled', active);
    $('#txtMessage').prop('disabled', active);
    $('#btnSend').prop('disabled', active);
}

function clearStage() {
    $('#txtMessage').val('');
    $('#txtMessage').focus();
}

function addMessage() {
    let username = $('#txtUsername').val();
    let message = $('#txtMessage').val();
    $.ajax({
        url: apiUrl,
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {
            username: username,
            message: message
        },
        beforeSend: function(xhr) {
            disableStage(true);
        },
        success: function(message) {
            disableStage(false);
            displayMessage(message);
            clearStage();
        },
        error: function() {
            disableStage(false);
            alert('Không thể gửi Chat được.');
        }
    });
}

function getMessage() {
    let last = $('.chat-content').data('last');
    $.ajax({
        url: apiUrl + '?last=' + last,
        type: 'GET',
        dataType: "json",
        cache: false,
        success: function(data) {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    displayMessage(data[i]);
                }
            }
        },
        complete: pollingMessage
    });
}

function displayMessage(message) {
    if ($('#item' + message.id).length > 0) {
        return false;
    }
    let classItem = 'item-from pull-left';
    if (message.username === $('#txtUsername').val()) {
        classItem = 'item-to pull-right';
    }
    let html = '<div class="row"><div class="chat-item ' + classItem + '" id="item' + message.id + '">';
    html += '<p class="display-username"><span class="glyphicon glyphicon-user"></span>: ' + message.username + '</p>';
    html += '<p class="display-message">' + message.message + '</p>';
    html += '</div></div>';

    $('.chat-content').data('last', message.created_at);
    $('.chat-content').append(html);
    $('.chat-content').scrollTop($('.chat-content')[0].scrollHeight - $('.chat-content')[0].clientHeight);
}

function pollingMessage() {
    setTimeout(function() {
        getMessage();
    }, 3000);
}

//---------------------------------------------------------

$('#txtMessage').textareaAutoSize();

$('#txtMessage').keyup(function(e) {
    if (e.keyCode === 13) {
        addMessage();
    }
});

$('#btnSend').click(function() {
    addMessage();
});

getMessage();
