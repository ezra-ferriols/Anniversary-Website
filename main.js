function lockScroll() {
  document.body.classList.add("modal-open");
}
function unlockScroll() {
  document.body.classList.remove("modal-open");
}
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
(navToggle &&
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  }),
  navClose &&
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    }));
const navLink = document.querySelectorAll(".nav__link"),
  linkAction = () => {
    navMenu.classList.remove("show-menu");
  };
navLink.forEach((e) => {
  e.addEventListener("click", linkAction);
});
const audio = document.getElementById("bg-music");
function playSong(e) {
  const o = e.slides[e.activeIndex].dataset.song;
  o &&
    (audio.src.includes(o) ||
      ((audio.src = o),
      audio.play().catch(() => {}),
      (audio.onended = () => {
        ((audio.currentTime = 0), audio.play());
      })));
}
audio.volume = 0.5;
const swiper = new Swiper(".home__swiper", {
  loop: !0,
  grabCursor: !0,
  speed: 800,
  effect: "creative",
  creativeEffect: {
    prev: { translate: ["-120%", 0, -500], rotate: [0, 0, -45], opacity: 0 },
    next: { translate: ["120%", 0, -500], rotate: [0, 0, 45], opacity: 0 },
  },
  on: {
    init: function () {
      playSong(this);
    },
    slideChangeTransitionEnd: function () {
      playSong(this);
    },
  },
});
(document.getElementById("prevBtn")?.addEventListener("click", () => {
  swiper.slidePrev();
}),
  document.getElementById("nextBtn")?.addEventListener("click", () => {
    swiper.slideNext();
  }));
const scrollHeader = () => {
  const e = document.getElementById("header");
  window.scrollY >= 50
    ? e.classList.add("scroll-header")
    : e.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);
const loveButton = document.getElementById("loveButton"),
  loveLetter = document.getElementById("loveLetter"),
  closeLetter = document.getElementById("closeLetter");
(loveButton.addEventListener("click", () => {
  ((scrollY = window.scrollY),
    loveLetter.classList.add("show-letter"),
    lockScroll());
}),
  closeLetter.addEventListener("click", () => {
    (loveLetter.classList.remove("show-letter"),
      console.log(scrollY),
      unlockScroll());
  }),
  loveLetter.addEventListener("click", (e) => {
    e.target === loveLetter &&
      (loveLetter.classList.remove("show-letter"),
      console.log(scrollY),
      unlockScroll());
  }));
const tabButtons = document.querySelectorAll(".memories__button"),
  memoriesSwiper = new Swiper(".memories__swiper", {
    speed: 700,
    spaceBetween: 30,
    allowTouchMove: !0,
    on: {
      slideChange: function () {
        const e = this.activeIndex;
        (tabButtons.forEach((e) => {
          e.classList.remove("active-tab");
        }),
          tabButtons[e].classList.add("active-tab"));
      },
    },
  });
tabButtons.forEach((e, o) => {
  e.addEventListener("click", () => {
    (memoriesSwiper.slideTo(o),
      tabButtons.forEach((e) => {
        e.classList.remove("active-tab");
      }),
      e.classList.add("active-tab"));
  });
});
const memoryImages = document.querySelectorAll(".memories__img");
let currentImageIndex = 0,
  currentImages = [];
const popup = document.getElementById("memoryPopup"),
  popupImg = document.getElementById("popupImg"),
  closePopup = document.getElementById("closePopup");
function showImage() {
  ((popupImg.style.opacity = "0"),
    (popupImg.style.transform = "scale(0.9)"),
    setTimeout(() => {
      ((popupImg.src = currentImages[currentImageIndex].src),
        (popupImg.style.opacity = "1"),
        (popupImg.style.transform = "scale(1)"));
    }, 120));
}
function nextImage() {
  (currentImageIndex++,
    currentImageIndex >= currentImages.length && (currentImageIndex = 0),
    showImage());
}
function prevImage() {
  (currentImageIndex--,
    currentImageIndex < 0 && (currentImageIndex = currentImages.length - 1),
    showImage());
}
(memoryImages.forEach((e) => {
  e.addEventListener("click", () => {
    const o = memoriesSwiper.slides[memoriesSwiper.activeIndex];
    ((currentImages = [...o.querySelectorAll(".memories__img")]),
      (currentImageIndex = currentImages.indexOf(e)),
      showImage(),
      popup.classList.add("show-popup"),
      lockScroll());
  });
}),
  document.getElementById("nextImage")?.addEventListener("click", (e) => {
    (e.stopPropagation(), nextImage());
  }),
  document.getElementById("prevImage")?.addEventListener("click", (e) => {
    (e.stopPropagation(), prevImage());
  }),
  closePopup.addEventListener("click", () => {
    (popup.classList.remove("show-popup"),
      console.log(scrollY),
      unlockScroll());
  }),
  popup.addEventListener("click", (e) => {
    e.target === popup &&
      (popup.classList.remove("show-popup"),
      console.log(scrollY),
      unlockScroll());
  }));
const videoModal = document.getElementById("videoModal"),
  modalVideo = document.getElementById("modalVideo"),
  closeVideoModal = document.getElementById("closeVideoModal"),
  videoButtons = document.querySelectorAll(".video-fullscreen-btn");
let currentVideoIndex = 0,
  currentVideos = [];
function showVideo() {
  ((modalVideo.style.opacity = "0"),
    (modalVideo.style.transform = "scale(0.92)"),
    setTimeout(() => {
      const e = currentVideos[currentVideoIndex].querySelector("source").src;
      ((modalVideo.src = e),
        modalVideo.load(),
        modalVideo.play(),
        (modalVideo.style.opacity = "1"),
        (modalVideo.style.transform = "scale(1)"));
    }, 120));
}
function nextVideo() {
  (currentVideoIndex++,
    currentVideoIndex >= currentVideos.length && (currentVideoIndex = 0),
    showVideo());
}
function prevVideo() {
  (currentVideoIndex--,
    currentVideoIndex < 0 && (currentVideoIndex = currentVideos.length - 1),
    showVideo());
}
function closeVideoPlayer() {
  (videoModal.classList.remove("show-video-modal"),
    modalVideo.pause(),
    (modalVideo.currentTime = 0),
    (modalVideo.src = ""),
    console.log(scrollY),
    unlockScroll(),
    audio.play().catch(() => {}));
}
(videoButtons.forEach((e) => {
  e.addEventListener("click", () => {
    const o = memoriesSwiper.slides[memoriesSwiper.activeIndex];
    currentVideos = [...o.querySelectorAll(".memories__video")];
    const t = e
      .closest(".memories__video-wrapper")
      .querySelector(".memories__video");
    ((currentVideoIndex = currentVideos.indexOf(t)),
      showVideo(),
      videoModal.classList.add("show-video-modal"),
      lockScroll(),
      audio.pause());
  });
}),
  document.getElementById("nextVideo")?.addEventListener("click", (e) => {
    (e.stopPropagation(), nextVideo());
  }),
  document.getElementById("prevVideo")?.addEventListener("click", (e) => {
    (e.stopPropagation(), prevVideo());
  }),
  closeVideoModal.addEventListener("click", closeVideoPlayer),
  videoModal.addEventListener("click", (e) => {
    e.target === videoModal && closeVideoPlayer();
  }));
const swiperMoreMessages = new Swiper(".more-messages__swiper", {
    loop: !0,
    grabCursor: !0,
    centeredSlides: "auto",
    slidesPerView: "auto",
    speed: 600,
    effect: "creative",
    observer: !0,
    observeParents: !0,
    creativeEffect: {
      limitProgress: 2,
      prev: { translate: ["-32%", 0, 0], scale: 0.58 },
      next: { translate: ["32%", 0, 0], scale: 0.58 },
    },
    navigation: {
      nextEl: ".more-messages .swiper-button-next",
      prevEl: ".more-messages .swiper-button-prev",
    },
    autoplay: { delay: 3e3, disableOnInteraction: !1 },
  }),
  scrollUp = () => {
    const e = document.getElementById("scrollup-up");
    this.scrollY >= 600
      ? e.classList.add("show-scroll")
      : e.classList.remove("show-scroll");
  };
window.addEventListener("scroll", scrollUp);
const sections = document.querySelectorAll("section[id]"),
  scrollActive = () => {
    const e = window.scrollY;
    sections.forEach((o) => {
      o.id;
      const t = o.offsetTop - 50,
        s = o.offsetHeight;
      ((link = document.querySelector(".nav__menu a[href*= + id + ]")),
        link && link.classList.toggle("active-link", e > t && e <= t + s));
    });
  };
window.addEventListener("scroll", scrollActive);
const sr = ScrollReveal({
  origin: "bottom",
  distance: "60px",
  duration: 1500,
  delay: 300,
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
});
(sr.reveal(".home__title", { origin: "top" }),
  sr.reveal(".home__description", { origin: "top", delay: 600 }),
  sr.reveal(".home__data .button", { delay: 900, origin: "top" }),
  sr.reveal(".home__swiper", { delay: 1200, origin: "top" }),
  sr.reveal(".home__blob", { delay: 1500, origin: "top" }),
  sr.reveal(".home__data img", {
    delay: 2100,
    distance: 0,
    interval: 200,
    scale: 0,
  }),
  sr.reveal(
    ".home__sticker-12, .home__sticker-22, .home__sticker-1, .home__sticker-2, .home__sticker-3, .home__sticker-4",
    { origin: "top", delay: 900 },
  ),
  sr.reveal(
    ".our-story__spiderman, .our-story__hellokitty, .our-story__keroppi",
    { rotate: { x: 0, y: 0, z: 120 }, interval: 80 },
  ),
  sr.reveal(".our-story__data .section__title", { delay: 900 }),
  sr.reveal(".our-story__description", { delay: 1200 }),
  sr.reveal(".our-story__data .button", { delay: 1500, distance: 0, scale: 0 }),
  sr.reveal(".our-story__blob", { delay: 1800, origin: "right" }),
  sr.reveal(".our-story__img", { delay: 2100, origin: "left" }),
  sr.reveal(".our-story__images", { delay: 2100, origin: "top" }),
  sr.reveal(".our-story__sticker-1, .our-story__sticker-2", {
    origin: "top",
    delay: 900,
  }),
  sr.reveal(".memories .section__title", { delay: 300 }),
  sr.reveal(".memories__button", { delay: 600, interval: 90 }),
  sr.reveal(".memories__swiper", { delay: 900 }),
  sr.reveal(".more-messages__data .section__title", { delay: 300 }),
  sr.reveal(".more-messages__description", { delay: 600 }),
  sr.reveal(".more-messages__swiper", { delay: 900 }),
  sr.reveal(".more-messages__titles", { delay: 1200, scale: 0 }),
  sr.reveal(
    ".more-messages__sticker-1, .more-messages__sticker-2, .more-messages__sticker-3",
    { origin: "top", delay: 900 },
  ));
