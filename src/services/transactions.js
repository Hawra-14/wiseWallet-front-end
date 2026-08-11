const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/transactions`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const show = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`${res.status}: ${data.message}`)
  }

  return data
}

const create = async (transactionFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async (id, updatedTransaction) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTransaction)
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`${res.status}: ${data.message}`)
  }

  return data
}

const deleteTransaction = async (transactionId) => {
  try {
    const res = await fetch(`${BASE_URL}/${transactionId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export {
  index,
  show,
  create,
  update,
  deleteTransaction,
}
