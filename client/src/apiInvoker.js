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
    if (res.ok) {
      const data = await res.json()
      
      if (data.statusCode !== 200) {
        throw new Error(data.error)
      }
      return [data, undefined]
    }

    throw new Error("" + res.status + " " + res.statusText) 
  }
  catch (err) {
    return [undefined, err.message]
  }
}