document.addEventListener('DOMContentLoaded', () => {
      const navbar = document.getElementsByTagName('navbar')[0];
      const section = document.getElementById('mainSection');
      const cartIcon = document.getElementById('cartIcon');
      const cart = document.getElementById('cart');
      const sidebar = document.getElementById('sidebar');
      const openMenu = document.getElementById('openMenu');
      const closeMenu = document.getElementById('closeMenu');
      const overlay = document.getElementById('overlay');
      const mainImage = document.getElementById('mainImage');
      const prevImg = document.getElementById('prevImg');
      const nextImg = document.getElementById('nextImg');
      const prev = document.getElementById('previous');
      const next = document.getElementById('next');
      const closeIcon = document.getElementById('closeIcon');

      const imgsSrc = [
        './images/image-product-1.jpg',
        './images/image-product-2.jpg',
        './images/image-product-3.jpg',
        './images/image-product-4.jpg'
      ];
      const images = document.querySelectorAll('#thumbnails img');
      const lightBoxImgs = document.querySelectorAll('#lightbox-thumbnails img');
      
      // Set initial image source
      mainImage.src = imgsSrc[0];            

      //toggle lightbox visibility 
      images.forEach((image,index) => {
        image.addEventListener('click', () => {
          document.getElementById('lightbox').classList.remove('hidden');
           document.getElementById('lightImg').src= imgsSrc[index];
           document.getElementById('lightImg').classList.add('w-full','h-auto')
           // Highlight the clicked thumbnail
          for (let i = 0; i < lightBoxImgs.length; i++) {
            lightBoxImgs[i].classList.remove('border-4', 'border-orange-500');
          }
           lightBoxImgs[index].classList.add('border-4', 'border-orange-500');
          overlay.classList.remove('hidden');
        });
      });

      // Set main image source on thumbnail click
       lightBoxImgs.forEach((image, index) => {
        image.addEventListener('click', () => {
          // mainImage.src = imgsSrc[index];
          // Update lightbox image source
          document.getElementById('lightImg').src = imgsSrc[index];
          // Highlight the clicked thumbnail
          for (let i = 0; i < lightBoxImgs.length; i++) {
            lightBoxImgs[i].classList.remove('border-4', 'border-orange-500');
          }
          lightBoxImgs[index].classList.add('border-4', 'border-orange-500');          
        });
      });

      // Set lightbox carousel functionality
      const lightImg = document.getElementById('lightImg'); 
      const prevLightImg = document.getElementById('prevLightImg');
      const nextLightImg = document.getElementById('nextLightImg');
      const prevSVG = document.getElementById('prevSVG');
      const nextSVG = document.getElementById('nextSVG');

      let lightboxCurrentIndex = 0;
      //initial lightbox image load
      lightImg.src = imgsSrc[lightboxCurrentIndex];
      prevLightImg.addEventListener('click', () => {
        lightboxCurrentIndex = (lightboxCurrentIndex - 1 + imgsSrc.length) % imgsSrc.length;
        lightImg.src = imgsSrc[lightboxCurrentIndex];
        for (let i = 0; i < lightBoxImgs.length; i++) {
          lightBoxImgs[i].classList.remove('border-4', 'border-orange-500');
        }
        lightBoxImgs[lightboxCurrentIndex].classList.add('border-4', 'border-orange-500');
      });
        prevLightImg.addEventListener('mouseout', () => {
            prevSVG.style.stroke = '#1D2026';
        });
      prevLightImg.addEventListener('mouseover', () => {
        prevSVG.style.stroke= '#ff6900';
      });      

      nextLightImg.addEventListener('click', () => {
        lightboxCurrentIndex = (lightboxCurrentIndex + 1) % imgsSrc.length;
        lightImg.src = imgsSrc[lightboxCurrentIndex];
        for (let i = 0; i < lightBoxImgs.length; i++) {
          lightBoxImgs[i].classList.remove('border-4', 'border-orange-500');
        }
        lightBoxImgs[lightboxCurrentIndex].classList.add('border-4', 'border-orange-500');
      });

      nextLightImg.addEventListener('mouseover', () => {
        nextSVG.style.stroke = '#ff6900';
      });
      nextLightImg.addEventListener('mouseout', () => {
        nextSVG.style.stroke = '#1D2026';
      });

      closeIcon.addEventListener('mouseover', () => {
        closeIcon.children[0].style.fill = '#ff6900';
      });
      closeIcon.addEventListener('mouseout', () => {
        closeIcon.children[0].style.fill = '#69707D';
      });
      //close lightbox
      closeIcon.addEventListener('click', () => {
        document.getElementById('lightbox').classList.add('hidden');
        overlay.classList.add('hidden');
      });
      
     

      let currentIndex = 0;
      
      //initial image load
      mainImage.src = imgsSrc[currentIndex];        
      
      previous.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imgsSrc.length) % imgsSrc.length;
        mainImage.src = imgsSrc[currentIndex]; 
      });

      next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imgsSrc.length;
        mainImage.src = imgsSrc[currentIndex]; 
      });
       
      // set qunatity functionality
      let quantity = 0;
      document.getElementById('increase').addEventListener('click', () => {
          quantity++;
           document.getElementById('quantity').innerText = quantity;
        })
       document.getElementById('decrease').addEventListener('click', () => {
        if (quantity > 0) {
          quantity--;
           document.getElementById('quantity').innerText = quantity;
        }
      });
     
      // Toggle cart visibility
      cartIcon.addEventListener('click', () => {
        cart.classList.toggle('hidden');
      });

      // Toggle sidebar visibility
      openMenu.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        document.getElementsByTagName('body')[0].classList.toggle('bg-salte-600')
        overlay.classList.toggle('hidden');
        // GSAP animation for sidebar
        gsap.fromTo(sidebar, { x: '-100%' }, { x: '0', duration: 0.8, ease: 'power2.out' });
      });

      closeMenu.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        document.getElementsByTagName('body')[0].classList.toggle('bg-salte-600')
        overlay.classList.add('hidden');
      });

      // empty cart functionality
     function emptyCart() {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = 'Empty Cart';
        document.getElementById('itemsQuantity').classList.add('hidden');
        // document.querySelector('button').disabled = true;
      }

      // set add to cart functionality
      document.querySelector('#addToCart').addEventListener('click', () => {
        if (quantity > 0) {
          const cartItems = document.getElementById('cartItems');
          cartItems.innerHTML = `
            <div class="flex justify-between items-center p-2 gap-2">
              <img class="size-12 rounded-md" src="./images/image-product-1-thumbnail.jpg" alt="Sneaker Thumbnail"/>
              <div class="flex flex-col justify-start items-start">
                <span class="text-slate-600 text-sm">Fall Limited Edition Sneakers</span>
                <span class="text-slate-600">$125.00 x ${quantity} <span class="text-slate-900 font-bold">$${125 * quantity}.00</span></span>
              </div>
              <img id="deleteCartItem" class="w-4 h-4 cursor-pointer" src="./images/icon-delete.svg" alt="Delete Icon"/>
            </div>
            <button id="checkout" class="w-[90%] mx-auto flex justify-center items-center bg-orange-500 rounded-lg p-3 my-4 font-bold cursor-pointer">Checkout</button>
          `;
          document.getElementById('itemsQuantity').innerText = quantity;
          document.getElementById('itemsQuantity').classList.remove('hidden');
          cart.classList.remove('hidden');
          // delete cart item functionality
        document.getElementById('deleteCartItem').addEventListener('click',emptyCart);
        document.getElementById('checkout').addEventListener('click',emptyCart);
        }
      });

      

    });

    