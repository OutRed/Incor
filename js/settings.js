function changeTabTitle() {
  var userInput = document.getElementById('userinput').value;
  document.querySelector('title').textContent = userInput;
  localStorage.setItem('tabTitle', userInput);
}

function changeTabIcon() {
  var userInput = document.getElementById('userinput').value;
  var favicon = document.getElementById('favicon');
  favicon.href = userInput;
  localStorage.setItem('tabIcon', userInput);
}

function resetTabSettings() {
  document.title = "Settings | IncorHosting";
  var favicon = document.getElementById('favicon');
  favicon.href = "/favicon.ico";
  document.getElementById('userinput').value = '';
  localStorage.removeItem('tabTitle');
  localStorage.removeItem('tabIcon');
}

window.addEventListener('load', function () {
  var storedTitle = localStorage.getItem('tabTitle');
  var storedIcon = localStorage.getItem('tabIcon');
  if (storedTitle) {
    document.querySelector('title').textContent = storedTitle;
    document.getElementById('userinput').value = storedTitle;
  }
  if (storedIcon) {
    var favicon = document.getElementById('favicon');
    favicon.href = storedIcon;
  }
});

export default { changeTabIcon, changeTabTitle, resetTabSettings };