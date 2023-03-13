var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', search());
}

// async function userAuth(fs_domain, fs_key) {
//   let fs_domain = fs_domain;
//   let fs_key = fs_key;
//   console.log(fs_domain, 'domain', fs_key, 'key');
//   try {
//     $db.get(fs_domain, fs_key);
//   } catch (err) {
//     $db.set(fs_domain, fs_key);
//     console.log(err);
//   }
// }

async function search() {
  let search = document.getElementById('search-text').value;
  console.log(search, 'search');
  let result = await fetch(
    'https://dhayaalanservicedesk.freshservice.com/api/v2/tickets',
    {
      method: 'GET',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic aldSUG9kV2EzZWVRZ0JoY21xMjou',
      },
    }
  );
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
