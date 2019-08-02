$(document).ready(function () {

    var getDoneFunction = function (result) {
        for (var i = 0; i < result.length; i++) {
            var li = $('<li>' + result[i].title + '</li><div></div>');
            li.data('id', result[i].id);
            li.appendTo($('#allBooks'));
        }
    };

    var ajaxUrl = {
        url: "http://localhost:8282/books/",
        emptyData: {},
        getType: "GET",
        postType: "POST",
        contentType: "application/json"};

    $.ajax({
        url: ajaxUrl.url,
        type: ajaxUrl.getType,
        contentType: ajaxUrl.contentType
    }).done(getDoneFunction);

    $('#allBooks').on('click', 'li', function () {

        var bookId = $(this).data('id');
        var bookDiv = $(this).next('div');

        $.ajax({

            url: ajaxUrl.url + bookId,
            type: ajaxUrl.getType,
            contentType: ajaxUrl.contentType

        }).done(function (result) {

            $('#allBooks>div').hide();
            bookDiv.text('Author(s): ' + result.author +
                ' Title: ' + result.title +
                ' Publisher: ' + result.publisher +
                ' Type: ' + result.type);
            bookDiv.hide().fadeIn(1000);

        });

    });

    $('#addBook').on('click', function (e) {

        e.preventDefault();

        var newBook = {
            author:$('input[name=author]').val(),
            title:$('input[name=title]').val(),
            isbn:$('input[name=isbn]').val(),
            publisher:$('input[name=publisher]').val(),
            type:$('input[name=type]').val()
        };

        $.ajax({

            url: ajaxUrl.url,
            data: JSON.stringify(newBook),
            type: ajaxUrl.postType,
            contentType: ajaxUrl.contentType

        }).done(function () {

            alert("Nowa książka dodana");
            $('#allBooks').empty();
            $('input[type=text]').val('');

            $.ajax({

                url: ajaxUrl.url,
                type: ajaxUrl.getType,
                contentType: ajaxUrl.contentType

            }).done(getDoneFunction);

        }).fail(function(xhr,status,err){

            console.log(xhr + ', ' + status + ', ' + err);

        });

    });

});