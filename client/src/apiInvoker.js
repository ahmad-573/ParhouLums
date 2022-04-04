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
      req_init['body'] = JSON.stringify(body)
    }

    const res = await fetch(api, reqHeader)
    if (res.ok) {
      const data = await res.json()
      
      if (data.statusCode !== successCode) {
        throw new Error(data.error)
      }
      return data
    }

    throw new Error("" + res.status + res.statusText) 
  }
  catch (err) {
    return err.message
  }
}