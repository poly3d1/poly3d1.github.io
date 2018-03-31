$(function() {
	// Партнеры
	$('#partners').slider(174);
        
	// Слайдер
	$('.slider').slider(270);
        
        // Визуал
        $('#visual').visualler();
        
        // Даунер
        $('.get-contacts, .get-search').downer();
        
	// Топер
	$('#toper').toper(200, 160);
        
	// Модалка
	$('#label-helper').modal();
        
        // Ховер у продукции
        $('#product-categories a.icon').hoverer();
        
        // Вопрос-ответ
        $('#form').former();
        
        // Виджет новостей
        $('.widgets .news').newser();
        
        // Поиск
        $('#search').searcher();

        //Остальное
        $('.category__wrap').last().css({
            'background-image': 'none'
        });

        $('.category__wrap').last().css({
            'background-image': 'none'
        });


        $('#page-callback').click(function() {
            var productTitle =  $(this).parent().parent().find('h4').text();

            $('.js-form__hidden').val(productTitle);
           
        });

        //console.log( $('.js-form__hidden').val() );
        
});


    

