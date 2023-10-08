import MouseFollower from 'mouse-follower';
import gsap from 'gsap';

MouseFollower.registerGSAP(gsap);

const cursor = new MouseFollower({
  el: null,
  container: document.body,
  className: 'mf-cursor',
  innerClassName: 'mf-cursor-inner',
  textClassName: 'mf-cursor-text',
  mediaClassName: 'mf-cursor-media',
  mediaBoxClassName: 'mf-cursor-media-box',
  iconSvgClassName: 'mf-svgsprite',
  iconSvgNamePrefix: '-',
  iconSvgSrc: '',
  dataAttr: 'cursor',
  hiddenState: '-hidden',
  textState: '-text',
  iconState: '-icon',
  activeState: '-active',
  mediaState: '-media',
  stateDetection: {
    '-pointer': 'a,button',
    '-hidden': 'iframe',
  },
  visible: true,
  visibleOnState: false,
  speed: 0.05,
  ease: 'expo.out',
  overwrite: true,
  skewing: 1,
  skewingText: 2,
  skewingIcon: 2,
  skewingMedia: 2,
  skewingDelta: 0.001,
  skewingDeltaMax: 0.15,
  stickDelta: 0.15,
  showTimeout: 20,
  hideOnLeave: true,
  hideTimeout: 300,
  hideMediaTimeout: 300,
});

// const gridItems = document.querySelectorAll(".grid_item");
// gridItems.forEach((item) => {
//   item.addEventListener("click", handleClick);
// });

// function handleClick(e) {
//   cleanup();
//   pointer1.pointerOptions.pointerShape[1] = e.target.innerText;
//   cleanup = initializeCanvas(cursor1);
// }
