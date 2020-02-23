var socket = io('http://localhost:4002');
let liEls
let liEls2
let index = 0;
let index2 = 0;
let mostpopular = []
let pricereduction = []

$(()=>{
    buscarDados()
})
/*
   Esta parte do código fica ouvindo qualquer mudanas na lista de recomendações.
   Quando há alguma alteração todo conteúdo é recarregado
*/
socket.on('recommended', () => {
    $('.alerta').fadeIn()
    buscarDados()
    setTimeout(() => {
        $('.alerta').fadeOut()
        
    }, 2000);
});

const buscarDados = () => {    
    $.ajax({
        url: `http://localhost:4002/api/ranking/vitrine`,
        type: 'get',
        dataType: 'json'
    }).then( result =>{
        mostpopular = result.mostpopular
        pricereduction = result.pricereduction
        preencher('.itens-most ul',result.mostpopular)
        preencher('.itens-price ul',result.pricereduction)
    })
}

const preencher = (div, dados) =>{    
    const li = dados.map( r =>{
        
        let name = `${r.name.substr(0, 30)}...`
        return $('<li>')
                    .append( 
                        $('<a>')
                            .attr(
                                {
                                    href: '#',
                                    for: 'modal-1',
                                    title: 'Clique para ver detalhes'
                                }
                            ).css('text-decoration', 'none')
                            .addClass('lnk-prod')
                            .data('id', r.sku)
                            .append(
                                $('<div>')
                                    .addClass('box')
                                    .append(
                                        $( '<img>' ).attr({src: `http:${r.image1}`, width: 160})                            
                                    )
                                    .append(
                                        $( '<div>' )
                                            .addClass('produto')
                                            .append(
                                                $('<span>')
                                                    .addClass('descricao') 
                                                    .append( `${name}<br><br><br>`)
                                            )
                                            .append(
                                                $('<span>')
                                                    .addClass('old')
                                                    .append( `<del>${ numberToReal( r.oldprice )}</del><br>` )
                                            )
                                            .append(
                                                $('<span>')
                                                    .addClass('preco')
                                                    .append( numberToReal( r.price )  )
                                            )
                                            .append(
                                                $('<span>')
                                                    .addClass('parcela')
                                                    .append( `${r.count}x de ${numberToReal( r.countprice )} `)
                                            )
        
                                    )
                            )
                    )
                                         
    })

    const ul = $(div).html('')
    ul.append( li )
  
    configurarBotao()
    /* 
        unbind
        Previne o acionamento duplo do clique
        Fonte: https://stackoverflow.com/a/20054942/6754506
    */
    $('.lnk-prod').unbind('click').click(function() {
        let codigo = $(this).data('id')
        let obj = mostpopular.filter( r => r.sku == codigo).length > 0 ? 
                                    mostpopular.filter( r => r.sku == codigo) : 
                                    pricereduction.filter( r => r.sku == codigo)
        
        modal(obj)
    });
        
    
  
}

const modal = dados =>{
    $('span.prod-desc').text( dados[0].name )
    $('.prod-img').attr('src', `http://${dados[0].image1}`)
    $('span.prod-old').html( `<del>${ numberToReal( dados[0].oldprice )}</del><br>` )
    $('span.prod-price').html( `${ numberToReal( dados[0].price )}` )
    $('span.prod-count').html( `${ dados[0].count }` )
    $('span.prod-countprice').html( `${ numberToReal( dados[0].countprice )}` )
    $('.btn').trigger('click')
    
}

const configurarBotao = () =>{

    $('.prev').on('click', function(){
        liEls = document.querySelectorAll('.itens-most ul li');
        index -= 3
        show(index, liEls)
    })

    $('.next').on('click', function(){
        liEls = document.querySelectorAll('.itens-most ul li');
        index += 3
        show(index, liEls)
    })

    $('.prev2').on('click', function(){
        liEls2 = document.querySelectorAll('.itens-price ul li');
        index2 = index2 - 3  
        show(index2, liEls2)
    })

    $('.next2').on('click', function(){
        liEls2 = document.querySelectorAll('.itens-price ul li');
        index2 = index2 + 3    
        show(index2, liEls2)
    })
}


const show = (increase, btn) =>{
    //index = index + increase;
    increase = Math.min(
      Math.max(increase,0),
      btn.length-1
    );
    btn[increase].scrollIntoView({behavior: 'smooth'});
}

const numberToReal = numero => {
    number = numero.toFixed(2).split('.');
    number[0] = "R$ " + number[0].split(/(?=(?:...)*$)/).join('.');
    return number.join(',');
}


