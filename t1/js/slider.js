const viewport=document.getElementById('sliderViewport')
const track=document.getElementById('sliderTrack')
const prev=document.getElementById('sliderPrev')
const next=document.getElementById('sliderNext')
const pager=document.getElementById('sliderPager')

function pagesCount(){return Math.max(1,Math.ceil(track.scrollWidth/viewport.clientWidth))}
function currentPage(){return Math.round(viewport.scrollLeft/viewport.clientWidth)}
function goToPage(p){viewport.scrollTo({left:p*viewport.clientWidth,behavior:'smooth'})}

function rebuildPager(){
  pager.innerHTML=''
  const total=pagesCount()
  for(let i=0;i<total;i++){
    const dot=document.createElement('button')
    dot.type='button'
    dot.className='border-0 bg-transparent p-0'
    const span=document.createElement('span')
    span.className='d-inline-block rounded-circle'
    span.style.width='12px'
    span.style.height='12px'
    span.classList.add(i===currentPage()?'bg-primary':'bg-secondary')
    span.style.opacity=i===currentPage()?'1':'0.5'
    dot.appendChild(span)
    dot.addEventListener('click',()=>goToPage(i))
    pager.appendChild(dot)
  }
}

prev.addEventListener('click',()=>goToPage(Math.max(0,currentPage()-1)))
next.addEventListener('click',()=>goToPage(Math.min(pagesCount()-1,currentPage()+1)))

let raf
viewport.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(rebuildPager)})
window.addEventListener('resize',rebuildPager)
rebuildPager()