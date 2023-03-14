var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', search());
}

async function userAuth() {
  let res = await client.iparams.get().then(
    function (data) {
      res = data.fs_domain;
      res = data.fs_key;
      console.log(res.fs_domain, 'domain', res.fs_key, 'key');
      return res;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function search() {
  let key = document.getElementById('api').value;
  let search = document.getElementById('search-text').value;
  console.log(search, 'search');
  let result = await fetch(`${res.fs_domain}/api/v2/tickets`, {
    method: 'GET',
    timeout: 0,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${res.fs_key}`,
    },
  });
  let data = await result.json();
  console.log(data, 'error');
  for (let i of data.tickets) {
    if (i.subject == search) {
      let data = document.getElementById('list-text');
      data.innerHTML = `${i.subject}`;
      break;
    } else {
      data = document.getElementById('list-text');
      data.innerHTML = `No Match Found`;
    }
  }
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  const contactData = await client.data.get('contact');
  const {
    contact: { name },
  } = contactData;

  textElement.innerHTML = `Ticket is created by ${name}`;
}
