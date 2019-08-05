$(document).ready(function () {

    let ajaxFunction = function (bookId, method, callbackFunction) {

        let url = "http://localhost:8282/books/";
        let data = {};
        let contentType = "application/json";

        if (method === 'POST') {
            data = JSON.stringify(bookId);
        }

        if (bookId !== null && method !== 'POST'){
            url = url + bookId;
        }

        $.ajax({
            url: url,
            method: method,
            data: data,
            contentType: contentType,
            success: callbackFunction
        });

    };

    let buildBookList = function (data) {

        let allBooks = $('#allBooks');
        for (let i = 0; i < data.length; i++) {

            let row = $('<div class="row">');
            row.appendTo(allBooks);
            let li = $('<div class="list-group-item list-group-item-action col-sm-3">' + data[i].title + '</div>');
            li.data('id', data[i].id);
            li.data('method', 'GET');
            li.appendTo(allBooks.find('.row').last());

            let a = $('<a class="list-group-item" href="#">Usuń</a>');
            a.data('id', data[i].id);
            a.data('method', 'DELETE');
            a.appendTo(allBooks.find('.row').last());

            let div = $('<div style="margin: 5px 0 15px" class="text-secondary"></div>');
            div.attr("bookId", data[i].id);
            div.insertAfter(allBooks.find('.row').last());
        }
        allBooks.children('div[bookid]').hide();
    };

    let getBookData = function (data) {

        $('div[bookId="' + data.id + '"]').text(
            'Author: ' + data.author +
            ' Title: ' + data.title +
            ' Publisher: ' + data.publisher +
            ' Type: ' + data.type
        )
    };

    let insertNewBook = function () {

        alert("Nowa książka dodana!");
        $('#allBooks').empty();
        $('input[type="text"]').val('');
        ajaxFunction(null, "GET", buildBookList);

    };

    let deleteBook = function(){

        alert("Książka usunięta!");
        $('#allBooks').empty();
        ajaxFunction(null, "GET", buildBookList);

    };


    //calling functions
    ajaxFunction(null, "GET", buildBookList);

    let allBooks = $('#allBooks');

    allBooks.on('click', '.col-sm-3', function () {

        $('#allBooks>div[bookid]').text("").hide();
        $('#allBooks div.list-group-item').removeClass('active');
        ajaxFunction($(this).data('id'), $(this).data('method'), getBookData);
        $(this).addClass('active');
        $(this).closest('.row').next().fadeIn(1000);

    });

    $('#addBook').on('click', function (e) {

        e.preventDefault();

        const newBook = {
            author: $('input[name=author]').val(),
            title: $('input[name=title]').val(),
            isbn: $('input[name=isbn]').val(),
            publisher: $('input[name=publisher]').val(),
            type: $('input[name=type]').val()
        };

        ajaxFunction(newBook, "POST", insertNewBook);

    });

    allBooks.on('click', 'a', function () {

        ajaxFunction($(this).data('id'), $(this).data('method'), deleteBook);

    });

});