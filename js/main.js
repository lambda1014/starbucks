const searchEl = document.querySelector('.search')
const searchInputEl = searchEl.querySelector('input')

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
})

searchInputEl.addEventListener('focus', function (){
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
})

searchInputEl.addEventListener('blur', function (){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
})

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
/* window는 우리가 보는 창 그 자체. 
lodash 함수인 _.throttle(함수, 시간)을 이용하여 함수가 일정시간내 한번씩만 실행되도록 제한 */
window.addEventListener('scroll', _.throttle(function (){
  if(window.scrollY > 500){
    //배지 없애기
    //gsap.to(요소, 지속시간, 옵션[즉, css 속성과 값])
    gsap.to(badgeEl, .4, {
      opacity: 0, //숫자값은 지속시간 내 자연스럽게 동작가능
      display: 'none' //문자값은 자연스럽게 불가. none이 있어야 클릭 불가
    });

    //버튼 보이기
    gsap.to(toTopEl, .2, { //css 선택자만 적어도 요소 찾음
      x: 0
    } );
  }else{
    //배지 보이기
    gsap.to(badgeEl, .4, {
      opacity: 1,
      display: 'block'
    });

    //버튼 숨기기
    gsap.to(toTopEl, .2, { //css 선택자만 적어도 요소 찾음
      x: 100
    }); 
  }
}, 300));


toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo: 0 //화면 위치를 0 위치로 옮김
  });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index){
  gsap.to(fadeEl,1, {
    delay: (index + 1) * .7, /* 순차적으로 나타나게 하기 위해*/
    opacity: 1
  });
});

//Swiper('css 선택자', 옵션 객체데이터 형식으로 ) 
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true  //반복재생 여부 
});

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한 번에 보여줄 슬라우드 개수
  speceBetween: 10, //슬라이드 사이 여백 px
  centeredSlides: true, //1번 슬라우드가 가운데 보임
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //페이지네이션 클릭하여 제어 가능
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .wiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion')
let toggleIconEl = promotionToggleBtn.querySelector('.material-icons')
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !(isHidePromotion)
  if(isHidePromotion){
    //숨김 처리
    promotionEl.classList.add('hide'); //hide 클래스 추가
    toggleIconEl.innerHTML = "arrow_circle_up";

  }else{
    //보임 처리
    promotionEl.classList.remove('hide')
    toggleIconEl.innerHTML = "arrow_circle_down";
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size){
  // gsap.to(요소, 시간, 옵션)
  gsap.to(selector, random(1.5, 2.5), {
    y: 20,
    repeat: -1, //무한반복
    yoyo: true, //왔다리갔다리 애니메이션
    ease: Power1.easeInOut,
    delay: random(0, delay)
  })
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl){
  new ScrollMagic
  .Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
    triggerHook: .8, //요소가 뷰포트 0.8 지점에 걸리면
  })
  .setClassToggle(spyEl, 'show') //show라는 클래스 넣기
  .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //올해 년도