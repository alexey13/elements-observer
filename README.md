# element-observer
> Helper to observe elements using Intersection Observer API

## Installation
```html
<script src="observe-elements.js"></script>
```

```js
observeElement({
  el: document.querySelectorAll('.elements'),
  type: 'triggerOnce',
  offset: 0.5,
  rootMargin: '0px',
  onEnter: () => animation.play(),
  onEnter: (progress) => animation.seek(animation.duration * progress),// if type 'scrollProgress'
  onLeave: () => animation.play()
})
```

### Options
#### `el`
Nodes list or node

#### `type`
1. 'triggerInOutViewport' - Trigger every time when enter viewport and leave it
2. 'triggerOnce' - Trigger only once when enter viewport and destroy observer
3. 'scrollProgress' - Get progress of scrolling

#### `offset`
threshold property of Intersection Observer API.
##### Default: `0.5`

#### `rootMargin`
rootMargin property of Intersection Observer API.
##### Default: `0px`

#### `onEnter`
Callback function when enter viewport. If type is 'scrollProgress' argument 'progress' and fires each time progress updated

#### `onLeave`
Callback function when leave viewport.