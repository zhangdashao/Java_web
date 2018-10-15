export const getDataStringify = (url, data) => {
  let params = '';
  if (data) {
    for (const key of Object.keys(data)) {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        params += `${key}=${data[key]}&`
      }
    }
    params = params.slice(0, params.length - 1)
  }
  return data ? `${url}?${params}` : url
}