async function testJsonStore() {
  console.log('Testing jsonstore.io...');
  const token = '674b984b92bd11f1b705fa163e5398eb'; // a 32-character hex token (e.g. hash of secret)
  const url = `https://www.jsonstore.io/${token}/test_key`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ status: 'OK', time: new Date().toISOString() }),
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Response Status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('Write success:', data);

      // Read it back
      const readRes = await fetch(url);
      const readData = await readRes.json();
      console.log('Read success:', readData);
    } else {
      console.log('Write failed');
    }
  } catch (err) {
    console.log('Error:', err.message);
  }
}

testJsonStore();
