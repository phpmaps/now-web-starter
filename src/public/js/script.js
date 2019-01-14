$(function () {

    var exampleParams = {
        "postalCodes": ["92373", "92374"],
        "collections": ["KeyGlobalFacts.*", "AGE.* "],
        "clientId": "UziRXpkEKRl7ATU8",
        "clientSecret": "af50c2f5d915549aea6fd7e485b1e16e9"
    };

    var p = $('#form_params');

    p.val(JSON.stringify(exampleParams, undefined, 2));
    p.attr("placeholder", JSON.stringify(exampleParams, undefined, 2));

    $('#enrichment-form').validator();

    $('#enrichment-form').on('submit', function (e) {

        if (!e.isDefaultPrevented()) {
            var url = "/api/enrich/zips";
            var params = p.val();
            $.ajax({
                type: "POST",
                url: url,
                data: {"params": params},
                success: function (data) {
                    var messageAlert = 'alert-success'; //Should do more
                    var messageText = JSON.stringify(data);

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    if (messageAlert && messageText) {
                        $('#enrichment-form').find('.messages').html(alertBox);
                        $('#enrichment-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});