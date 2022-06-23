const txList = document.querySelector('.tx-list');
//date
const now = new Date();
document.getElementById("time").innerHTML = formatDate(now);
// Defult address
window.onload = addText();
function addText(){

document.getElementById("address").value = "0x11179D22966092C6e7B44e0326aD5068d182b4bC";
}
//get date function
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      hours = d.getHours();
      minutes = d.getMinutes();
      seconds = d.getSeconds();
  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return ['Time: '+hours, minutes, seconds].join(':') + ' ' + ['Date: '+ day, month, year].join('/');
}
function deleteItems() {
  localStorage.clear();
}

function getbalance() {
  var address = document.getElementById("address").value;
  var apikey = 'XD5YX1QKJPG5CXG46928ESIW1V1FAUPYJ2';
  fetch('https://api-ropsten.etherscan.io/api?module=account&action=balance&address=' + address + '&tag=latest&apikey=' + apikey )
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const bal = json.result;
    var ethdc = 1000000000000000000 ;
    document.getElementById("balance").innerHTML ='Balance: ' + bal / ethdc + ' ETH';

  })
}

// get transaction function
function getTx() {
  document.getElementById("header").innerHTML = 'All Transaction'; //header
  var address = document.getElementById("address").value;
  var apikey = 'XD5YX1QKJPG5CXG46928ESIW1V1FAUPYJ2';

  fetch('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + address + '&apikey=' + apikey + '&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc')
  .then((response) => {
  return response.json();
  })
  .then((json) => {
    const users = json.result;
    users.forEach((block) => {
      const blockItem = document.createElement('div');
      blockItem.classList.add('block-item');

      const timeStamp = document.createElement('tp');
      timeStamp.classList.add('timestamp');
      var time = new Date(block.timeStamp * 1000);
      timeStamp.innerHTML = formatDate(time).bold() + ' ' ;

      const from = document.createElement('f');
      from.classList.add('from');
      from.innerHTML =  '<br>From: '.bold()+block.from + ' ';

      const txid = document.createElement('txid');
      txid.classList.add('txid');
      txid.innerHTML = '<br>Txid: '.bold() + block.hash + ' ';

      const value = document.createElement('value');
      value.classList.add('value')
      var ethdc = 1000000000000000000 ;
      value.innerHTML = '<br>Amount: '.bold() + block.value / ethdc + ' ETH'

      blockItem.append(timeStamp,from,txid,value);
      txList.append(blockItem);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

}

function getrecieve() {
  document.getElementById("header").innerHTML = 'Recieve Transaction'; //header
  var address = document.getElementById("address").value;
  var apikey = 'XD5YX1QKJPG5CXG46928ESIW1V1FAUPYJ2';
  var total = 0;

  fetch('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=' + address + '&' + 'apikey=' + apikey + '&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc')
  .then((response) => {
  return response.json();
  })
  .then((json) => {
    const users = json.result;
    users.forEach((block) => {
      const blockItem = document.createElement('div');
      blockItem.classList.add('block-item');
      console.log(block);

      if(block.to == parseInt(address)) {

        const timeStamp = document.createElement('tp');
        timeStamp.classList.add('timestamp');
        var time = new Date(block.timeStamp * 1000);
        timeStamp.innerHTML = formatDate(time).bold() + ' ' ;

        const from = document.createElement('f');
        from.classList.add('from');
        from.innerHTML =  '<br>From: '.bold()+block.from + ' ';

        const value = document.createElement('value');
        value.classList.add('value')
        var ethdc = 1000000000000000000 ;
        var ethvalue = block.value / ethdc
        value.innerHTML = '<br>Amount: '.bold() + ethvalue + ' ETH'
        total += parseFloat(ethvalue)

        blockItem.append(timeStamp,from,value);
        txList.append(blockItem);
      }

    });
    document.getElementById("total").innerHTML = 'Total: ' + total + ' ETH';
  })
  .catch((error) => {
    console.log(error.message);
  });
}

function getpayment() {
  document.getElementById("header").innerHTML = 'Payment Transaction'; //header
  var address = document.getElementById("address").value;
  var apikey = 'XD5YX1QKJPG5CXG46928ESIW1V1FAUPYJ2';
  var gettxlist = 'https://api-ropsten.etherscan.io/api?module=account&action=txlistinternal&address=' + address + '&sort=asc&' + apikey;
  var total = 0;
  fetch(gettxlist)
  .then((response) => {
  return response.json();
  })
  .then((json) => {
    const users = json.result;
    users.forEach((block) => {
      const blockItem = document.createElement('div');
      blockItem.classList.add('block-item');
      console.log(block);

      const timeStamp = document.createElement('tp');
      timeStamp.classList.add('timestamp');
      var time = new Date(block.timeStamp * 1000);
      timeStamp.innerHTML = formatDate(time).bold() + ' ' ;

      const to = document.createElement('t');
      to.classList.add('to');
      to.innerHTML = '<br>To: '.bold()+ block.to + ' ';

      const value = document.createElement('value');
      value.classList.add('value')
      var ethdc = 1000000000000000000 ;
      var ethvalue = block.value / ethdc
      value.innerHTML = '<br>Amount: '.bold() + ethvalue + ' ETH'
      total += parseFloat(ethvalue)

      blockItem.append(timeStamp, to, value);
      txList.append(blockItem);


    });
    document.getElementById("total").innerHTML = 'Total: ' + total + ' ETH';
  })
  .catch((error) => {
    console.log(error.message);
  });
}


