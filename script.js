var originalDate;
//After the page loads completely do below.
$(window).load(function(){
	//Fade main content of page into view.
	setTimeout(function(){
		$('.main-content').show().addClass('fade-in');
	},1000);
	//Animate space scrafts flying randomly from left to right of page.
	animateSpaceCraft(100);
});
//After DOM loads completely do below.
$(document).ready(function(){
	//When 'Intergalactic Adventures' logo is clicked fade in main content.
	$('.logo').on('click', function(){
		$('.launch-controls, .submit-page, div.contact, div.about').hide().css({'opacity':'0'});
		$('.main-content').show().addClass('fade-in');
		$(window).scrollTop(0);
	});
	//Set launch control default date to current date.
	$("#date-selected").datepicker().datepicker("setDate", new Date());
	//set the varible 'originalDate' the same as launch control date for later date selected comparison.
	originalDate = $('#date-selected').val();
	//Main menu options clicked below.
	//Open and close the launch controls.
	$('.menu-launch-setup').on('click', function(){
		if($('.launch-controls').is(':visible')){
			$('.launch-controls').hide().css({'opacity':'0'});
			$('.main-content').show().addClass('fade-in');
		}else{
			$(window).scrollTop(0);
			$('.main-content, .submit-page, div.contact, div.about, .testimonies').hide();
			$('.launch-controls').show().addClass('fade-in');
		}
	});
	//Main menu select 'Testimonies' main content display and scroll down to testimonies.
	$('.menu-testimonies').on('click', function(){
		$('.submit-page, .launch-controls, div.contact, div.about').hide().css({'opacity':'0'});
		$('.main-content').show().addClass('fade-in');
		$(window).scrollTop($('.testimony').offset().top-100);
	});
	//Main menu select 'Contact' fade in contact display.
	$('.menu-contact').on('click', function(){
		$('.submit-page, .launch-controls, .main-content, div.about').hide().css({'opacity':'0'});
		$('div.contact').show().addClass('fade-in');
		$(window).scrollTop(0);
	});
	//Main menu select 'About' fade in contact display.
	$('.menu-about').on('click', function(){
		$('.submit-page, .launch-controls, .main-content, div.contact').hide().css({'opacity':'0'});
		$('div.about').show().addClass('fade-in');
		$(window).scrollTop(0);
	});
	//Close display and open main page by clicking the "X" symbol on top right of menu.
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
	//Seletct 'Continue' on the launch details display remove display and fade in main content.
	$('.continue').on('click',function(){
		$(window).scrollTop(0);
		$('.submit-page').hide().css({'opacity':'0'});
		$('.main-content').show().addClass('fade-in');
	});
});
//Start flight by selecting 'Launch' button after selecting options for flight.
function startFlight (){
	$('.launch-controls').removeClass('flight-setup-in').addClass('flight-setup-out');
	$('.main-content').hide();
	$('.submit-page').show().addClass('fade-in');
	//Set varibles as the parameters chosen from launch setup.
	var myDestination = $('.destination').val();
	var myPassNumber = +$('.passengers').val();
	var myVehicle = $('.vehicle').val();
	var myDate = $('.date').val();
	//Set image of destination chosen from launch setup.
	if(myDestination=='Alpha Centauri'){$(".planet").attr('src','images/alphaCentauri.jpg');
	}else if(myDestination=='Titan'){$(".planet").attr('src','images/triton.jpg');
	}else if(myDestination=='Mars'){$(".planet").attr('src','images/mars.jpg');
	}else{$(".planet").attr('src','images/moon.jpg');}
	//Set image of space vehicle chosen from launch setup.
	if(myVehicle=='Hydrogen Capsule'){$(".vehicleImg").attr('src','images/capsule.jpg');
	}else if(myVehicle=='Nuclear Rocket'){$(".vehicleImg").attr('src','images/rocket.jpg');
	}else if(myVehicle=='Starship Enterprise'){$(".vehicleImg").attr('src','images/enterprise.jpg');
	}else if(myVehicle=='Homemade Spaceship'){$(".vehicleImg").attr('src','images/homemade.jpg');
	}else if(myVehicle=='Millennium Falcon'){$(".vehicleImg").attr('src','images/falcon.jpg');
	}else{$(".vehicleImg").attr('src','images/deathStar.jpg');}
	//Remove and content from class 'people' and adds the selected number of people.
	$('.people').empty();
	for(i=0;i<myPassNumber;i++){
		$('.people').prepend('<i id="person" class="fa fa-male"></i>');
	}
	//Sets the selected date from launch setup and checks if it is the current date or a future date.
	//If the date is set to current date it will display "Your flight leaves today!".
	//If date is set to a future date it will display a countdown until launch date.
	$('.final-date').html(myDate);
	if($('.date').val() == originalDate){
		$('#counter').html("Your flight leaves today!");
	}else{
		$('#counter').countdown(myDate, function(event) {
			$('#counter').html(event.strftime('%w weeks %d days %H:%M:%S'));
    	});
	}
}
//Add element to DOM and animate it from left to right with randomly generated setings depending upon space craft size.
function animateSpaceCraft(minHeight) {
	var size = Math.floor(Math.random()*(100-20+1)+20);
	var speed = (500000/size);
	var maxHeight = $(window).height()-50;
	var choosenHeight = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
	var choosenInterval = Math.floor(Math.random()*(5000-500+1)+500);
    $("<div id='space-craft-anima'></div>").css({'top':+choosenHeight+'px','left':'-150px','height':+size/2+'px','width':+size+'px'}).animate({left: "100%"}, speed, "linear", function(){$(this).remove();}).prependTo('div.page-wrap');
	setTimeout(function(){
		animateSpaceCraft(100);
	},choosenInterval);
}