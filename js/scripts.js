//carousel
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    items : 1,
    autoplay: true,
    dots:true
});

// validation formulaire
$("form").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        name: {
            required: true
        },
        description: {
            required: true
        },
        pic: {
            required: true,
            url: true
        }
    },
    messages: {
        name: {
            required: "Veuillez entrer votre nom"
        },
        email: {
            required: "Veuillez entrer votre mail"
        },
        description: {
            required: "Décrivez-vous !"
        },
        pic: {
            required: "image requise!"
        }
    }
});


//Smooth scroll
var $smooth = $('a.smooth');
$smooth.click(function () {
    var normalLink = $(this).attr("href");
    var duration = $(this).attr('data-duration');
    if (duration == 300) {
        $("html, body").animate({ scrollTop: 0 }, duration);
    } else {
        $("html, body").animate({ scrollTop: $(normalLink).offset().top }, 1000);
    }
});

// affichage divs
$(window).scroll(function () {
    var $contentSection = $('div.content-section');
    var scrollTop = $(window).scrollTop();
    var halfWindow = $(window).height()/2;
    $contentSection.each(function () {
        var $thisContent = $(this);
        var $posContent = $thisContent.offset().top;
        console.log($posContent, scrollTop);
        var $txtContent = $thisContent.find(`div[data-content-type~='text']`);
        var $imgContent = $thisContent.find(`div[data-content-type~='image']`);
        if (scrollTop > $posContent - halfWindow) {
            $txtContent.fadeIn()
            setTimeout(function () {
                $imgContent.fadeIn()
            }, 500);
        }
    });
})

// Add Kitten
function hideLoader() {
    $('#kitten-loader').addClass("hidden");
}
function error() {
    swal({
        title: "Erreur Serveur",
        text: "Des chatons ont étés mangés par des Allemands",
        type: "error"
    });
}

var source = $("#kitten-template").html();
var template = Handlebars.compile(source);
var $addKitten = $('#vote');

$.getJSON("https://kittenweekapi-nbwns.c9users.io/api/kittens")
    .done(function (data) {
        var html = template(data);
        $addKitten.append(html);
    })
    .always(hideLoader)
    .fail(error);

//vote for kitty


$addKitten.on('click', 'a.btn-primary', function (event) {
    event.preventDefault();
    var $btn = $(this);
    var $thm = $btn.closest('.thumbnail')
    var $idKitty = $thm.data("id");

    function voteDone() {
        $('a.btn-primary').attr("disabled", true);
        $thm.addClass('selected');
    }
    $.post("https://kittenweekapi-nbwns.c9users.io/api/vote",
        {
            kittenname: $idKitty,
            username: "bla"
        })
        .done(function (data) {
            swal({
                title: data.message,
                text: data.details,
                type: "success"
            });
            voteDone();
        })
        .fail(function (data) {
            swal({
                title: data.responseJSON.message,
                text: data.responseJSON.details,
                type: "error"
            });
        })
})

