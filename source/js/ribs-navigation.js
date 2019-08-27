import RibsCore from 'ribs-core';

class RibsNav {
  constructor() {
    this.addEventListenerOpenButtons();
    this.addEventListenerCloseButtons();
    this.addEventListenerWindowResize();
    this.definePosLeftMobileNavOnLoad();
  }

  /**
   * method to open a nav based on clicked open icon
   * @param event
   */
  openNav(event) {
    const button = event.currentTarget;
    const dataNav = button.dataset.nav;
    const nav = document.getElementById(dataNav);
    button.classList.add('hidden');
    nav.style.display = 'block';
    setTimeout(() => nav.style.left = `0px`, 100);
  }

  /**
   * method to close nav and show button to reopen it
   * @param event
   */
  closeNav(event) {
    const button = event.currentTarget;
    const nav = RibsCore.parents(button, '.ribs-nav');
    const openButton = document.querySelector(`[data-nav="${nav.id}"]`);
    openButton.classList.remove('hidden');
    nav.style.left = `-${nav.dataset.leftPosition}px`;
    setTimeout(() => nav.style.display = 'none', 600);
  }

  /**
   * method to add events listener on all open nav icons
   */
  addEventListenerOpenButtons() {
    const buttons = document.getElementsByClassName('ribs-nav-open-icon');

    Array.from(buttons).forEach((element) => {
      element.addEventListener('click', this.openNav);
    });
  }

  /**
   * method to add events listener on all close nav icons
   */
  addEventListenerCloseButtons() {
    const buttons = document.getElementsByClassName('ribs-nav-close-icon');

    Array.from(buttons).forEach((element) => {
      element.addEventListener('click', this.closeNav);
    });
  }

  /**
   * method to define left position of nav to hide it on mobile
   * @param navs
   */
  definePosLeftMobileNav(navs) {
    Array.from(navs).forEach((element) => {
      if (!element.dataset.leftPosition && window.innerWidth < 576) {
        element.dataset.leftPosition = RibsCore.getWidth(element);
        if (element.style.display === '' || element.style.display === 'none') {
          element.style.left = `-${element.dataset.leftPosition}px`;
        }
      }
    });
  }

  /**
   * method to define left pos of nav on page load
   */
  definePosLeftMobileNavOnLoad() {
    if (window.innerWidth < 576) {
      this.definePosLeftMobileNav(document.getElementsByClassName('ribs-nav'));
    }
  }

  /**
   * method to change display of nav if screen size change
   */
  addEventListenerWindowResize() {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const navs = document.getElementsByClassName('ribs-nav');
      let display = 'block';
      let deleteStyles = true;
      if (width < 576) {
        display = 'none';
        deleteStyles = false;
      }

      Array.from(navs).forEach((element) => {
        if (element.style.display !== display && !deleteStyles) {
          element.style.display = display;
        }

        if (deleteStyles) {
          element.style = '';
          const showButton = element.parentNode.querySelector('[data-nav]');
          showButton.classList.remove('hidden');
        }
      });

      if (!deleteStyles) {
        this.definePosLeftMobileNav(navs);
      }
    });
  }
}

export default (RibsNav);

const nav = new RibsNav();
