function changeTabTitle() {
            var userInput = document.getElementById('userinput').value;
            document.querySelector('title').textContent = userInput;
        }

        function changeTabIcon() {
            var userInput = document.getElementById('userinput').value;
            var favicon = document.getElementById('favicon');
            favicon.href = userInput;
        }

        function resetTabSettings() {
            document.title = "Settings | IncorHosting";
            var favicon =f document.getElementById('favicon');
            favicon.href = "/favicon.ico";
            document.getElementById('userinput').value = '';
        }