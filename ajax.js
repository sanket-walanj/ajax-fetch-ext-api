//                    LOAD ALL USERS

const btn = document.querySelector('.get-quotes');
const number = document.getElementById('number');
btn.addEventListener('click', getQuotes);

function getQuotes(e) {
  e.preventDefault();

  if (number.value.length == 0) {
    return alert('Enter a Number');
  } else {
    const http = new XMLHttpRequest();
    http.open('GET', 'https://type.fit/api/quotes', true);
    http.onload = function () {
      if (this.status === 200) {
        // console.log(this.responseText);

        const response = shuffle(JSON.parse(this.responseText));

        let output = '';
        // response.forEach(function (quote) {
        //   output += `
        // <li>Quotes: ${quote.text}</li>
        // <li>Author: ${quote.author}</li>
        // <hr>
        // `;
        // });
        for (let i = 0; i < response.length; i++) {
          if (i == number.value) {
            break;
          }
          output += `
          <li>Quotes: ${response[i].text}</li>
          <li>Author: ${response[i].author}</li>
          <hr>
          `;
        }

        document.querySelector('.quotes').innerHTML = output;
      }
    };
    http.send();
  }
}

// Shuffle Quotes

function shuffle(quotes) {
  let CI = quotes.length,
    tempValue,
    randomIndex;

  // While elements exist in the array
  while (CI > 0) {
    randomIndex = Math.floor(Math.random() * CI);
    // Decrease CI by 1
    CI--;
    // SWAP THE LAST ELEMENT WITH CI
    tempValue = quotes[CI];
    quotes[CI] = quotes[randomIndex];
    quotes[randomIndex] = tempValue;
  }
  return quotes;
}
