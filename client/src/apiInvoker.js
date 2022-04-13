const base_url = 'http://localhost:4000'

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