//Types:
//1. triggerInOutViewport Start when enter viewport and stop when live it (not destroying)
//2. triggerOnce - Start when enter viewport and destroy observer
//3. scrollProgress - to use with animejs get progress of scrolling
export function observeElement({el, type, offset = 0.5, onEnter = null, onLeave = null, onProgress = null, rootMargin = '0px'} = {}) {

  let options = {
    root: null,
    rootMargin: rootMargin,
    threshold: ''
  };

  switch(type) {
    case 'triggerInOutViewport':
      options.threshold = [0,1];
      break;
    case 'triggerOnce':
      options.threshold = offset;
      break;
    //When threshold get 0 or 1 observer will not run callback untill value of threshold changed
    case 'scrollProgress':
      options.threshold = stepEvery(0, 1, 0.01);
      break;
  }

  let callback = (entries, observer) => { 
    entries.forEach(entry => {
      switch(type) {
        case 'triggerInOutViewport':
          //If element visible
          if (entry.isIntersecting) {
            onEnter()
          }
          //If element not visible
          if (!entry.isIntersecting && onLeave) {
            onLeave()
          }
          break;
        case 'triggerOnce':
          if(entry.isIntersecting) {
            onEnter(entry.target);
            //Destroy observer
            observer.unobserve(entry.target);
          }
          break;
        case 'scrollProgress':
          //Progress 100%: entry.boundingClientRect.height;
          //Current Position: entry.boundingClientRect.y;
            let progress;
            progress = entry.intersectionRect.height / entry.boundingClientRect.height;
            onProgress(progress)
          break;
      }
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
    });
  };

  let observer = new IntersectionObserver(callback, options);
  if (NodeList.prototype.isPrototypeOf(el)) {
    el.forEach(e => observer.observe(e));
  } else {
    observer.observe(el)
  }


  //100 steps for progress type
  function stepEvery(start, end, step) {
    let l = (end - start) / step;
    return Array.from({length: l + 1}, (v, k) => (k * step) + start)
  }
}
