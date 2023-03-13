var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', search());
}

async function userAuth() {
  let fdomain = `${fs_domain}`;
  let fkey = `${fs_key}`;
  console.log(fdomain, 'domain', fkey, 'key');
  try {
    console.log(fdomain, 'fdomain', fkey, 'fkey');
    $db.get(fdomain, fkey);
  } catch (err) {
    console.log(fdomain, 'fdomain', fkey, 'fkey');
    $db.set(fdomain, fkey);
    console.log(err);
  }
  return fs_domain, fs_key;
}

async function search() {
  let key = document.getElementById('api').value;
  let search = document.getElementById('search-text').value;
  console.log(search, 'search');
  let result = await fetch(
    'https://dhayaalanservicedesk.freshservice.com/api/v2/tickets',
    {
      method: 'GET',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${key}`,
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
