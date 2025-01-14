////////////////////////////////////
//                                //
//    Light Dark Mode switcher    //
//                                //
////////////////////////////////////
/* Observes click of checkbox label and adds/removes a body class and cookie */

document.addEventListener('DOMContentLoaded', function () {
  const modebutton = document.querySelector('.mode-button');
  const listItem = document.getElementById('event-toggle');
  const modetoggle = document.getElementById('mode-toggle');
  if (listItem) {
    listItem.addEventListener('click', function () {
      modetoggle.checked = !modetoggle.checked;
      modetoggle.dispatchEvent(new Event('change'));
      if (modetoggle.checked) {
        document.body.classList.add('lightmode');
        document.cookie = `mode=light; path=/; max-age=${60 * 60 * 24 * 14};`;
      } else {
        document.body.classList.remove('lightmode');
        document.cookie = `mode=dark; path=/; max-age=${60 * 60 * 24 * 14};`;
      }
    });

    /**
     * Get the value of a cookie
     * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
     * @param  {String} name  The name of the cookie
     * @return {String}       The cookie value
     */
    function getCookie(name) {
      let value = `; ${document.cookie}`;
      let parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // load this early?
    function cookieCheck() {
      let mode = getCookie('mode');
      if (mode == 'light') {
        modetoggle.checked = true;
        document.body.classList.add('lightmode');
      }
    }

    cookieCheck();
  }
});

/////////////////////////////////////////
//                                     //
//    Initialize isotope containers    //
//                                     //
/////////////////////////////////////////

var elem = document.querySelector('.archive-container');

if (elem) {
  imagesLoaded(elem, function (instance) {
    var iso = new Isotope(elem, {
      itemSelector: '.archive-card',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.archive-card',
        gutter: 0,
      },
    });

    var tagFilters = document.querySelectorAll('.tag-buttons button');

    tagFilters.forEach(function (button) {
      button.addEventListener('click', function () {
        var filterValue = this.getAttribute('data-category');
        iso.arrange({ filter: filterValue });
        document
          .querySelector('.tag-buttons button.active')
          .classList.remove('active');
        this.classList.add('active');
      });
    });
  });
}

// var tags = document.querySelector('.tag-container');

// if (tags) {
//   imagesLoaded(tags, function (instance) {
//     var iso = new Isotope(tags, {
//       itemSelector: '.archive-card',
//       layoutMode: 'masonry',
//       masonry: {
//         columnWidth: '.dumb-masonry-sizer',
//         fitWidth: true,
//       },
//     });
//   });
// }


// https://github.com/biati-digital/glightbox/blob/master/README.md
const lightbox = GLightbox({
  skin: 'clean simple',
  moreLength: 0
});

// this is kind of painful but I see options are either build a custom Guttenberg gallery
// mainly to add the glightbox class to the href rather than the parent OR
// do this and change format so all images for the lightbox are .glightbox > figure > a (link to full size)

const lightbox2 = GLightbox({
  selector: ' .single-post figure a',
  skin: 'clean simple',
});


/* Carousel for Collections Widget */

const rootNode = document.querySelector('.embla')
const viewportNode = rootNode.querySelector('.embla__viewport')
const prevButtonNode = rootNode.querySelector('.embla__prev')
const nextButtonNode = rootNode.querySelector('.embla__next')


const options = { loop: true }
const autoplayOptions = {
  delay: 4000,
  stopOnInteraction: true,
  stopOnMouseEnter: true,
}
const plugins = [EmblaCarouselAutoplay(autoplayOptions)]
const embla = EmblaCarousel(viewportNode, options, plugins)
prevButtonNode.addEventListener('click', embla.scrollPrev, false)
nextButtonNode.addEventListener('click', embla.scrollNext, false)