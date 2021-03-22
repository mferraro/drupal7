(function($) {

    $.fn.bcn_distribuidora_front = function() {

        var distribuidora_front = $('.parag-distribuidora-home');
        var total = 0;
        var itemsShowing = 0;
        var botoMore = distribuidora_front.find('.veure-mes');

        distribuidora_front.find('.list-distribuidora li').each(function () {
            var dataValue = $(this).attr("data-value");
            total += parseInt(dataValue);
        });

        if (distribuidora_front.length) {
            showItemsDistribuidora();
            botoMore.on('click', function (e) {
                e.preventDefault();
                showItemsDistribuidora();
            });
        }

        function showItemsDistribuidora() {
            var sum = itemsShowing;
            var moreItems = sum + 4;
            itemsShowing = moreItems;
            distribuidora_front.find('.list-distribuidora li:hidden').each(function() {
                var dataValue = $(this).attr("data-value");
                sum += parseInt(dataValue);
                if (sum <= moreItems) {
                    $(this).fadeIn();
                }
            });
            if (itemsShowing >= total) {
                botoMore.hide();
            }
        }
    };
})(jQuery);
