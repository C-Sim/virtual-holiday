const holidayDropdownButton = $("#holiday-dropdown-btn");

const holidayDropdown = $("#holiday-dropdown");

const dropdownMenu = $("#dropdown-menu");

const holidaySpan = $("#holiday-span");

const handleNavBarToggle = () => {
  const navBurgerBtn = $(".navbar-burger");

  const toggleNavBar = () => {
    // get the nav container id (the div to show and hide)
    const navContainerId = navBurgerBtn.attr("data-target");
    const navContainer = $(`#${navContainerId}`);

    // toggle the class for hamburger button to show/hide
    navBurgerBtn.toggleClass("is-active");

    // toggle the class for nav container to show/hide
    navContainer.toggleClass("is-active");
  };

  navBurgerBtn.click(toggleNavBar);
};

const holidayDropdownToggle = () => {
  holidayDropdown.toggleClass("is-active");
};

const startHolidayExperience = (event) => {
  const target = $(event.target);
  if (target.is('div[name="holiday-type"]')) {
    const holidayType = target.attr("id");
    console.log(holidayType);
    holidayDropdown.toggleClass("is-active");
    const displayLabel = target.attr("data-label");
    holidaySpan.text(displayLabel);
  }
};

holidayDropdownButton.click(holidayDropdownToggle);

dropdownMenu.click(startHolidayExperience);

$(document).ready(() => {
  handleNavBarToggle();
});
