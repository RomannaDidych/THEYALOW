//Burger menu
let burger =  document.querySelector('.header__burger');
let nav =  document.querySelector('.header__nav');

function toggleActive(){
	burger.classList.toggle('active');
	 nav.classList.toggle('active');
};

burger.addEventListener('click', toggleActive);

//Slide show
function showSlides(){
	function selectSlide(){
		var slidesName = this.getAttribute('data-slides-name');
		var slidesArr = document.getElementsByClassName(slidesName);
		var direction, index;
		this.classList.contains('next') ? direction = 1 : direction = -1;
		for (var i=0; i<slidesArr.length; i++ ){
			if(slidesArr[i].classList.contains('is-active')){
				//Stop current video if slide is changed _______________________
				const activeSlide = slidesArr[i];
				let btnPause = activeSlide.firstElementChild.lastElementChild.firstElementChild.firstElementChild;
				btnPause.classList.remove('videoPause');
				let currentVideo = activeSlide.firstElementChild.firstElementChild;
				currentVideo.pause();
				//____________________________________________________
				slidesArr[i].classList.remove('is-active');
				index = i;
				if(direction===1 && index===slidesArr.length-1){
					 index=0 
				} else {				
					if(direction===-1 && index===0){
						index=slidesArr.length-1
					}else{index += direction}
				};
			};
		};	
		slidesArr[index].classList.add('is-active');		
	};

	var slideButtons = document.getElementsByClassName('top__slider--btn');
	for (var i=0; i<slideButtons.length; i++){
		slideButtons[i].addEventListener('click', selectSlide );
	};
};
showSlides();


//Player navigation
function play(el){
	const video = el.previousElementSibling;	
	video.play();
	el.firstElementChild.classList.add('hidden');
	el.nextElementSibling.firstElementChild.firstElementChild.classList.add('videoPause');		
};

function pause(el){
		const buttonStart =el.parentElement.parentElement.previousElementSibling;
		const video = el.parentElement.parentElement.parentElement.firstElementChild;
		if( buttonStart.firstElementChild.classList.contains('hidden')){				
			if(el.classList.contains('videoPause')){		
				video.pause();
				el.classList.remove('videoPause');				
			} else{		
				play(buttonStart);				
			};
			
		} else{		
			play(buttonStart);			
		}	
	};

	function changeVolume(el){
		let v = el.value;		
		const video = el.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild;		
		video.volume = v/100;
	};

	function showVolumeBar(el){
		const inpVolume = el.nextElementSibling.firstElementChild;		
		const video = inpVolume.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild;		
		let v =  video.volume;
		console.log(v);
		inpVolume.value = v  * 100;
		inpVolume.classList.toggle('active-volume');
	};

	function progressUpdate(el){		
		let videoNav = el.nextElementSibling.nextElementSibling;		
		let progress = videoNav.firstElementChild.firstElementChild.nextElementSibling;	
		const doneValue = progress.firstElementChild;				
		let d = el.duration;
		let c = el.currentTime;
		let w = 100 * (c/d);	
		doneValue.style.width = w + '%';
	};
	
	function videoRewind(el){
		const video = el.parentElement.parentElement.parentElement.firstElementChild;
		const doneValue = el.firstElementChild;
		let w = el.offsetWidth;
		let off = event.offsetX;		
		doneValue.style.width = 100 * off/w + '%';
		video.pause();
		video.currentTime = video.duration * (off/w);
		video.play();
		const buttonStart = el.parentElement.parentElement.previousElementSibling.firstElementChild;
		if(!buttonStart.classList.contains('hidden')){
			buttonStart.classList.add('hidden');
		};
	};

	function videoEnd(el){
		const buttonStart = el.nextElementSibling;
		buttonStart.firstElementChild.classList.remove('hidden');
		buttonStart.classList.remove('hidden');
	};



//Making anons styles
const body = document.querySelector('.body');
let bodyWidth = body.offsetWidth;
const youtubeVideo = document.querySelector('.anons__video');
const ytInform = youtubeVideo.previousElementSibling;
const twittPart = document.querySelector('.anons__twitter');
videoHeight = youtubeVideo.offsetHeight + 'px';
ytInform.style.height = videoHeight;
twittPart.style.height = videoHeight;

function setTwittHeight(){	
		videoHeight = youtubeVideo.offsetHeight + 'px';
		ytInform.style.height = videoHeight;
		twittPart.style.height = videoHeight;
		bodyWidth = body.offsetWidth;		
	if(bodyWidth > 735){		
		twittPart.style.height = videoHeight;	
	} else{		
		twittPart.style.height = 'auto';
	};
};

let plusButton = document.querySelectorAll('.plus_button');
for(let i=0; i<plusButton.length; i++ ){
	plusButton[i].addEventListener('click', showAllText);
};

function showAllText(){
	this.classList.toggle('minus');
	this.previousElementSibling.classList.toggle('visible');
	if(bodyWidth <500){
		this.parentElement.style.height = 'auto';
	}else {
		if(this.previousElementSibling.classList.contains('visible')){	
			this.parentElement.style.height = 'auto';
		}else{
			this.parentElement.style.height = videoHeight;
		};
	};	
};
window.addEventListener("resize", setTwittHeight);