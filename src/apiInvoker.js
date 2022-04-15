const base_url = 'https://parhou-lums-93vpm.ondigitalocean.app';
console.log(base_url);

export async function apiInvoker(api, body = {}) {
  try {
    let reqHeader = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: `cors`,
      credentials: "include"
    }

    if (body !== {}) {
      reqHeader['body'] = JSON.stringify(body)
    }
    console.log(base_url + api)
    const res = await fetch(base_url + api, reqHeader)
    const data = await res.json()
    if (res.status === 200) {
      return [data, undefined]
    }

    throw new Error(data.error) 
  }
  catch (err) {
    return [undefined, err.message]
  }
}
