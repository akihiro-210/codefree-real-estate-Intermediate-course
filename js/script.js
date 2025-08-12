$(function () {});

// ハンバーガーメニュー
$(".js-hamburger,.js-drawer").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-drawer").fadeToggle();
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
$(".course__img-box img").click(function () {
  var src = $(this).attr("src");
  var cap = $(this).attr("alt");
  $(".modal-block").fadeIn().css("display", "flex");

  $("#popup").attr("src", src);
  $(".caption").text(cap);
});

$(".modal-block").click(function (e) {
  // モーダルの外側をクリックした場合にのみモーダルを閉じる
  if (e.target === this) {
    $(this).css("display", "none");
  }
});

$(".modal-container > span").click(function () {
  // モーダルを閉じるボタンがクリックされた場合にモーダルを閉じる
  $(".modal-block").css("display", "none");
});

