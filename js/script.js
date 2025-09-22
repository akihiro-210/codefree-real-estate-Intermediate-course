$(function () {});

// ヘッダーメニュースクロール時の色変更
$(window).on("scroll", function () {
  const sliderHeight = $(".top").height();
  if (sliderHeight - 60 < $(this).scrollTop()) {
    $(".js-header").addClass("headerColorScroll");
  } else {
    $(".js-header").removeClass("headerColorScroll");
  }
});


// ハンバーガーメニュー
$(".hamburger-wrap,.js-drawer,.drawer-menu__item a").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").toggleClass("is-active");
    $("body").toggleClass("no-scroll");
    $(".js-page-top").toggleClass("display-none");
});


// サイト内移動
var headerHeight = $('.js-header').outerHeight();
$('a[href^="#"]').click(function(){
  var id = $(this).attr('href');
  var position = $(id).offset().top - headerHeight + 1;
  $('html,body').animate({ scrollTop: position}, 500);
  $("#hamburger").removeClass("is-active");
  $("#drawer").removeClass("is-active");
  $("body").removeClass("no-scroll");
  return false;
});


// メインスライダー
const swiper = new Swiper(".top__swiper", {
  loop: true,
  effect: "slide",
  direction: "horizontal",
  speed: 500,
  allowTouchMove: false,
  autoplay: {
    delay: 3000,
  },
});


//モーダル
$(".works__item").click(function () {
  // クリック対象が img じゃない場合は、同じ .works__item 内の img を探す
  var $item = $(this).closest(".works__item");
  var $img = $item.find(".works__img-box img");

  var src = $img.attr("src");
  var alt = $img.attr("alt");
  // <br> を無視してテキストだけ取得（1行になる）
  var cap = $item.find(".works__text").text();
  // ファイル名変換
  var modalSrc = src.replace("works_sp_image", "works_modal_image");
  $(".modal-block").fadeIn().css("display", "flex");
   // 画像とテキストを追加
  var $modalImg = $('<img>', {
    id: 'popup',
    src: modalSrc,
    alt: alt
  });
  $(".caption").before($modalImg);
  $(".caption").text(cap);
  $(".js-page-top").addClass("display-none");
  $("body").addClass("no-scroll");
});

$(".modal-block").click(function (e) {
  // モーダルの外側をクリックした場合にのみモーダルを閉じる
  if (e.target === this) {
    $(".modal-block").fadeOut(300, function () {
      $(".modal-img-section img").remove();
      $(".caption").text('');
      $(".js-page-top").removeClass("display-none");
      $("body").removeClass("no-scroll");
    });
  }
});

$(".modal-close-button").click(function () {
  // モーダルを閉じるボタンがクリックされた場合にモーダルを閉じる
  $(".modal-block").fadeOut(300, function () {
    $(".modal-img-section img").remove();
    $(".caption").text('');
    $(".js-page-top").removeClass("display-none");
    $("body").removeClass("no-scroll");
  });
});


// トップ戻るボタン
$(function () {
  const pageTop = $(".js-page-top");
  pageTop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });
  pageTop.click(function () {
    $("body, html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });
});


// スクロールしたらふわっと出てくるアニメーション
$(function () {
var pos = 0,
winScrollTop = 0;

function fadeAnime() {

$(".fade-up-trigger").each(function () {
  var elemPos = $(this).offset().top + 200;
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();
  if (scroll >= elemPos - windowHeight) {
    $(this).addClass("fade-up");
  }
});
}

$(window).scroll(function () {
  fadeAnime();
});

$(window).on("load", function () {
  fadeAnime();
});

});