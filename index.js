var buttonLevel = $('.buttonLevel')
var cardsCount = 0
var partialRes = false

function startGame () {  
	var playerName = $('#playerName').val()
	
	//detectar nombre esta vacio
	if (playerName == '') {
		$('#errorBox').removeClass('hidden') 
		setTimeout(function(){ 		
			$('#errorBox').addClass('hidden')  
			; }, 2000);
	} else {
		$('#modalIntro').addClass('hidden')
		$('#board').removeClass('hidden')
		$('#player').html(playerName)
		var buttonLevelVar = $(this).html()
		$('#level').html(buttonLevelVar);

		// leer dificultad y asignar cantidad de movimientos:
		if (buttonLevelVar == 'EASY') {
			$('#movesTotal').html('18 ') 
		} else if (buttonLevelVar == 'MEDIUM') {
			$('#movesTotal').html('12 ')
		} else if (buttonLevelVar == 'HARD') {
			$('#movesTotal').html('9 ')
		}
	}	
} 
	buttonLevel.on('click', startGame)
	//aca cierra nombre y nivel
				
	//img para back con array:
		const backImages = [
			"img/nuevas/01.jpg",
			"img/nuevas/02.jpg",
			"img/nuevas/03.jpg",
			"img/nuevas/04.jpg",
			"img/nuevas/05.jpg",
			"img/nuevas/06.jpg",
			"img/nuevas/01.jpg",
			"img/nuevas/02.jpg",
			"img/nuevas/03.jpg",
			"img/nuevas/04.jpg",
			"img/nuevas/05.jpg",
			"img/nuevas/06.jpg"]
					
	//shuffle:
	const desordenado = shuffle(backImages)
	//funcion para asignar img a los .cardBack

	function shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}
		
	$('.cardDiv').on('click', function(e) {
		const imgId = e.target.id
		const id = $('#' + imgId).attr('data-id') 
	})

	for (var q = 1; q <= desordenado.length; q++) {
		//buscar identificador para comparar imagenes
		$('#img-' + q).attr('data-img', desordenado[q - 1])
	}

	//detectar clicks
	var clicks = 0
	var primerClick

	$('img').on('click', function() {
		if (($(this).hasClass('turnOn')) == false  && clicks < 2) {
			clicks = clicks + 1
			$(this).attr('src', $(this).attr('data-img'))
			$(this).addClass('turnOn')
	}

	if (clicks == 1) {
		var id = $(this).attr('id') 	
		var img = $(this).attr('data-img')
	
		primerClick = {
			id: id,
			img: img
		}
	} else if (clicks == 2) {
		var that = this
		if (primerClick.id != $(that).attr('id')) {
			if (primerClick.img === $(this).attr('data-img')) {
				partialRes = true
			//COMPARACION
				clicks = 0
				$('#' + primerClick.id).addClass('foundCard')
				$(this).addClass('foundCard') 
			} else {
				partialRes = false
				setTimeout(function(){
					$('#' + primerClick.id).removeClass('turnOn') 
					$('#' + primerClick.id).attr('src', 'img/nuevas/cardback.jpg')
					$(that).removeClass('turnOn') 
					$(that).attr('src', 'img/nuevas/cardback.jpg')
					
		//COMPARACION
				clicks = 0
				}, 800) 
			}
		}
	
	var movesLeft = $('#movesLeft').html()
	$('#movesLeft').html(parseInt(movesLeft) + 1) 
		
// 		// final
	var movesLeft = parseInt($('#movesLeft').html())
	var movesTotal = parseInt($('#movesTotal').html())
	var foundCardChild = ($('.cardDiv').children('.foundCard').length)

			//ganar o perder
		if (foundCardChild <= 12 && partialRes == true) { 
			cardsCount++
		}
		
		if ((cardsCount == 6) && (movesLeft < movesTotal)) {
			$('#board').addClass('hidden');
			$('#modalWinner').removeClass('hidden') 
			$('#totalMoves').html(movesLeft)
			//llamado a local storage:
			
			var winnersGet = localStorage.getItem('winnerData');
			winnersGet = JSON.parse(winnersGet) 
	//data ganador en objeto:
			var winnerData = {
				nombre: $('#playerName').val(),
				nivel: $('#level').html(),
				movimientos: $('#movesLeft').html()
				}
			if (winnersGet == null) {
				winnersGet = []
				}
			winnersGet.unshift(winnerData)
						
				//hago string con los puntajes max:
			localStorage.setItem('winnerData', JSON.stringify(winnersGet))
			
			//inserto ese string en el modal
			var length = winnersGet.length
			if (length > 3) {
				length = 3
			}

		for (var w = 0; w < length; w++) {
			$('.jugador').append(`<p class="playerTab nameWin"> ${winnersGet[w].nombre} </p>`),
			$('.nivel').append(`<p class= playerTab levelWin> ${winnersGet[w].nivel} </p>`),
			$('.movimientos').append(`<p class="playerTab movsWin"> ${winnersGet[w].movimientos} </p>`)
			}
		}	else if (movesLeft == movesTotal) { 
			$('#board').addClass('hidden');
			$('#modalLoser').removeClass('hidden') 
			}
		}
	}) //aca cierra la funcion de clicks
	//volver al inicio
	var againButton = $('.again')

function playAgain () {
	$('#modalLoser').addClass('hidden') 
	$('#modalWinner').addClass('hidden')
	$('#modalIntro').removeClass('hidden')
	location.reload()
	}

againButton.on('click', playAgain)