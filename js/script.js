$(function () {});

// ============================
// スクロール固定用変数と関数
// ============================
let scrollPosition = 0;

function lockScroll() {
  scrollPosition = $(window).scrollTop();
  // bodyを固定して位置を保持
  $("body").css({
    position: "fixed",
    top: `-${scrollPosition}px`,
    left: 0,
    width: "100%",
  });
  // iOS Safari 対策で html に overflow:hidden を付与
  $("html").css({
    overflow: "hidden",
    height: "100%",
    touchAction: "none",
    "-webkit-overflow-scrolling": "auto", // iOS慣性スクロール防止
  });
  $("body, html").addClass("no-scroll");
}

function unlockScroll() {
  $("body").css({
    position: "",
    top: "",
    left: "",
    width: "",
  });
  $("html").css({
    overflow: "",
    height: "",
    touchAction: "",
    "-webkit-overflow-scrolling": "",
  });
  $("body, html").removeClass("no-scroll");
  // 固定前の位置に戻す
  $(window).scrollTop(scrollPosition);
}



// ヘッダーメニュースクロール時の色変更（aboutセクション上部が画面上端に到達時）
$(window).on("scroll", function () {
  const aboutTop = $(".about").offset().top;
  const scroll = $(this).scrollTop();
  if (scroll >= aboutTop) {
    $(".js-header").addClass("headerColorScroll");
  } else {
    $(".js-header").removeClass("headerColorScroll");
  }
});



// ハンバーガーメニュー
$(".hamburger-wrap,.js-drawer,.drawer-menu__item a").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").toggleClass("is-active");
     // ハンバーガー開いている場合はトップへ戻るボタンを非表示、スクロール固定。閉じたら閉じたらスクロール固定解除
    if ($(".js-drawer").hasClass("is-active")) {
        $(".js-page-top").stop(true,true).fadeOut(300);
        lockScroll();
    } else {
        unlockScroll();
    }
});

// サイト内移動
let headerHeight = $('.js-header').outerHeight();
const header = document.querySelector('.js-header');

// ページ読み込み後に再取得（CSS適用後）
$(window).on('load', function() {
  headerHeight = $('.js-header').outerHeight();
});

// ウィンドウリサイズ時も再取得
$(window).on('resize', function() {
  headerHeight = $('.js-header').outerHeight();
});

// ヘッダーの高さ変化を監視
if (header) {
  const resizeObserver = new ResizeObserver(() => {
    headerHeight = $('.js-header').outerHeight();
    // console.log('headerHeight 更新:', headerHeight);
  });
  resizeObserver.observe(header);
}

$('a[href^="#"]').on('click', function(e) {
  e.preventDefault();
  var id = $(this).attr('href');
  var position = $(id).offset().top - headerHeight;

  $('html,body').animate({ scrollTop: position }, 500);
  $("#hamburger").removeClass("is-active");
  $("#drawer").removeClass("is-active");
  $("body").removeClass("no-scroll");
  return false;
});

// サイト内移動
// var headerHeight = $('.js-header').outerHeight();
// $('a[href^="#"]').click(function(){
//   var id = $(this).attr('href');
//   var position = $(id).offset().top - headerHeight + 1;
//   $('html,body').animate({ scrollTop: position}, 500);
//   $("#hamburger").removeClass("is-active");
//   $("#drawer").removeClass("is-active");
//   $("body").removeClass("no-scroll");
//   return false;
// });



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
  $(".js-page-top").stop(true, true).fadeOut(300); // モーダル開いたら非表示
  $("body").addClass("no-scroll");
});

$(".modal-block").click(function (e) {
  // モーダルの外側をクリックした場合にのみモーダルを閉じる
  if (e.target === this) {
    $(".modal-block").fadeOut(300, function () {
      $(".modal-img-section img").remove();
      $(".caption").text('');
      $(".js-page-top").stop(true, true).fadeIn(300); // モーダル閉じたら表示
      $("body").removeClass("no-scroll");
    });
  }
});

$(".modal-close-button").click(function () {
  // モーダルを閉じるボタンがクリックされた場合にモーダルを閉じる
  $(".modal-block").fadeOut(300, function () {
    $(".modal-img-section img").remove();
    $(".caption").text('');
    $(".js-page-top").stop(true, true).fadeIn(300); // モーダル閉じたら非表示
    $("body").removeClass("no-scroll");
  });
});



// トップ戻るボタン
$(function () {
  const pageTop = $(".js-page-top");
  pageTop.hide();

  function togglePageTop() {
    const scroll = $(window).scrollTop();
    const isDrawerOpen = $(".js-drawer").hasClass("is-active");
    const isModalOpen = $(".modal-block").is(":visible");

    if (isDrawerOpen || isModalOpen) {
      // ドロワー or モーダル開いてるときは常に非表示
      pageTop.stop(true,true).fadeOut(300);
    } else {
      // 通常時のみスクロール量で制御
      if (scroll > 100) {
      // まだ表示されていなければ fadeIn
        if (!pageTop.is(":visible")) {
          pageTop.stop(true).fadeIn(300);
        }
      } else {
        // すでに非表示でなければ fadeOut
        if (pageTop.is(":visible")) {
          pageTop.stop(true).fadeOut(300);
        }
      }
    }
  }

  // スクロール・リサイズ時どちらでもチェック
  $(window).on("scroll resize", togglePageTop);

  // ページトップボタンクリックで戻る
  pageTop.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  // 初期チェック
  togglePageTop();
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

// iOS判定関数
function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// DOM準備完了後に iPhone だけ SimpleBar 適用
document.addEventListener("DOMContentLoaded", function () {
  if (isiOS()) {
    document.querySelectorAll('.form__acceptance-body').forEach(el => {
      new SimpleBar(el, {
        autoHide: false  // 常時表示
      });
    });
  }
});