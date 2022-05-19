const holidaySnapsLocalStorage = target.attr("data-label");

// get snaps from local storage
const readFromLocalStorage = () => {
  // get from LS by key
  const getHolidaySnaps = localStorage.getItem("snaps");
  // parse LS data
  //  TODO return without declaring parse
  const parsedData = JSON.parse(getHolidaySnaps);
  return parsedData;
};

// initialise LS
const onReady = () => {
  // check if holiday snaps exist in LS
  const holidaySnaps = readFromLocalStorage();
  // if false then set tasks to empty object in LS
  if (!holidaySnaps) {
    localStorage.setItem("snaps", JSON.stringify([]));
  }
  readFromLocalStorage();
  console.log(holidaySnaps);
  renderHolidaySnaps();
};

const renderHolidaySnaps = () => {
  // add snap to start of array in LS
  const holidaySnaps = readFromLocalStorage();
  holidaySnaps.unshift(place);
  writeToLocalStorage("snaps", holidaySnaps);
  recentSnaps.empty();
  renderHolidaySnaps();
  console.log(holidaySnaps);
};
