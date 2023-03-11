var client;

init();

async function init() {
  client = await app.initialized();
  // client.events.on('app.activated', search);
}

async function search() {
  let search = document.getElementById('search-text').value;
  console.log(search, 'search');
  let result = await fetch(
    'https://dhayaalanhelpdesk.freshservice.com/api/v2/tickets',
    {
      method: 'GET',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic RUo5bExlQVU0Wm11c2Y1TEN2OFI6Lg==',
      },
    }
  );
  let data = await result.json();
  console.log(data, 'error');
  for (let i of data.tickets) {
    if (i.subject == search) {
      console.log('Enter if');
      const data = document.getElementById('list-text');
      data.innerHTML = `${i.subject}`;
    } else {
      const datalist = document.getElementById('list-text');
      datalist.innerHTML = `No Match Found`;
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
