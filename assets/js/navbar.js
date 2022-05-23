const handleNavBarToggle = () => {
  const navBurgerBtn = $(".navbar-burger");

  const toggleNavBar = () => {
    const navContainerId = navBurgerBtn.attr("data-target");
    const navContainer = $(`#${navContainerId}`);

    navBurgerBtn.toggleClass("is-active");

    navContainer.toggleClass("is-active");
  };

  navBurgerBtn.click(toggleNavBar);
};
