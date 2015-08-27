var originalDate;

$(window).load(function(){
	pageStart();
	animateSpaceCraft(100);
});

$(document).ready(function(){
	$('.logo').on('click', function(){
		alert($(window).width());
	});
	//Set launch control default date to current date.
	$("#date-selected").datepicker().datepicker("setDate", new Date());
	//set the originalDate the same as launch control date for later comparison.
	originalDate = $('#date-selected').val();
	//Main menu options clicked below.
	//Open and close the launch controls.
	$('.menu-launch-setup').on('click', function(){
		if($('.launch-controls').is(':visible')){
			$('.launch-controls').hide().css({'opacity':'0'});
			pageStart();
		}else{
			$(window).scrollTop(0);
			$('.main-content').hide();
			$('.launch-controls').show().addClass('fade-in');
		}
	});
	$('.menu-testimonies').on('click', function(){
		$('.submit-page, .launch-controls, div.contact, div.about').hide().css({'opacity':'0'});
		$('.main-content').show().addClass('fade-in');
		$(window).scrollTop($('.testimony').offset().top-100);
	});
	$('.menu-contact').on('click', function(){
		$('.submit-page, .launch-controls, .main-content, div.about').hide().css({'opacity':'0'});
		$('div.contact').show().addClass('fade-in');
		$(window).scrollTop(0);
	});
	$('.menu-about').on('click', function(){
		$('.submit-page, .launch-controls, .main-content, div.contact').hide().css({'opacity':'0'});
		$('div.about').show().addClass('fade-in');
		$(window).scrollTop(0);
	});
	//Close display and open main page by clicking the "X" symbol on top right of launch control menu.
	$('.exit-controls').on('click', function(){
		$('.launch-controls, .submit-page, div.contact, div.about').hide().css({'opacity':'0'});
		$('.main-content').show().addClass('fade-in');
		$(window).scrollTop(0);
	});

	//check if launch control options are set.
	$('select, #date-selected').on('change', function() {
	  if($(this).val() != 0){
	  		$(this).siblings('.status').css({'background':'#00ff00'});
	  }else{
	  	    $(this).siblings('.status').css({'background':'#ff0000'});
	  }
	});
	//Launch button click and check if all parameters are valid, then display final launch display.
	$('.launch-button').on('click',function(){
		var myDestination = $('.destination').val();
		var myPassNumber = +$('.passengers').val();
		var myVehicle = $('.vehicle').val();
		var myDate = $('.date').val();
		if(myDestination!=0&myPassNumber!=0&myVehicle!=0&myDate!=''){
			$(window).scrollTop(0);
			$('.launch-controls').hide().css({'opacity':'0'});
			startFlight();
		}else{
			alert("Select an option from all categories!");
		}
	});

	$('.continue').on('click',function(){
		$(window).scrollTop(0);
		$('.submit-page').hide().css({'opacity':'0'});
		pageStart();
	});
});

function startFlight (){
	$('.launch-controls').removeClass('flight-setup-in').addClass('flight-setup-out');
	$('.main-content').hide();
	$('.submit-page').show().addClass('fade-in');

	var myDestination = $('.destination').val();
	var myPassNumber = +$('.passengers').val();
	var myVehicle = $('.vehicle').val();
	var myDate = $('.date').val();


	if(myDestination=='Alpha Centauri'){
		$(".planet").attr('src','images/alphaCentauri.jpg');
	}else if(myDestination=='Titan'){
		$(".planet").attr('src','images/triton.jpg');
	}else if(myDestination=='Mars'){
		$(".planet").attr('src','images/mars.jpg');
	}else{
		$(".planet").attr('src','images/moon.jpg');
	}

	if(myVehicle=='Hydrogen Capsule'){
		$(".vehicleImg").attr('src','images/capsule.jpg');
	}else if(myVehicle=='Nuclear Rocket'){
		$(".vehicleImg").attr('src','images/rocket.jpg');
	}else if(myVehicle=='Starship Enterprise'){
		$(".vehicleImg").attr('src','images/enterprise.jpg');
	}else if(myVehicle=='Homemade Spaceship'){
		$(".vehicleImg").attr('src','images/homemade.jpg');
	}else if(myVehicle=='Millennium Falcon'){
		$(".vehicleImg").attr('src','images/falcon.jpg');
	}else{
		$(".vehicleImg").attr('src','images/deathStar.jpg');
	}

	$('.final-date').html(myDate);
	$('.people').empty();
	for(i=0;i<myPassNumber;i++){
		$('.people').prepend('<i id="person" class="fa fa-male"></i>');
	}


	if($('.date').val() == originalDate){
		$('#counter').html("Your flight leaves today!");
	}else{
		$('#counter').countdown(myDate, function(event) {
			$('#counter').html(event.strftime('%w weeks %d days %H:%M:%S'));
    	});
	}
}

function pageStart (){
	$('.main-content').show();
	setTimeout(function(){
		$('.main-content').addClass('fade-in');
	},1000);
}

function animateSpaceCraft(minHeight) {
	var size = Math.floor(Math.random()*(100-20+1)+20);
	var speed = (500000/size);
	var maxHeight = $(window).height()-50;
	var choosenHeight = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
	var choosenInterval = Math.floor(Math.random()*(5000-500+1)+500);
	console.log(size+" speed= "+speed);
    $("<div id='space-craft-anima'></div>").css({'top':+choosenHeight+'px','left':'-150px','height':+size/2+'px','width':+size+'px'}).animate({left: "100%"}, speed, "linear", function(){$(this).remove();}).prependTo('div.page-wrap');
	setTimeout(function(){
		animateSpaceCraft(100);
	},choosenInterval);
}