export const getDataStringify = (url, data) => {
  let params = '';
  if (data) {
    for (const key of Object.keys(data)) {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        params += `${key}=${data[key]}&`;
      }
    }
    params = params.slice(0, params.length - 1);
  }
  return data ? `${url}?${params}` : url;
};
export const getFileTypeIcon = (item) => {
  const type = item.file_type;
  switch (type) {
    case '.doc':
    case '.docx':
      item.type = 'icon--doc-file-format-';
      break;
    case '.xlsx':
      item.type = 'icon--xlsx-file-format';
      break;
    case '.zip':
      item.type = 'icon--zip-compressed-f';
      break;
    case '.rar':
      item.type = 'icon--rar-file-format';
      break;
    case '.jpg':
      item.type = 'icon--jpg-image-file-f';
      break;
    case '.ppt':
      item.type = 'icon--ppt-file-format';
      break;
    case '.txt':
      item.type = 'icon--txt-text-file-ex';
      break;
    case '.pdf':
      item.type = 'icon--pdf-file-format-';
      break;
    case '.html':
      item.type = 'icon--html-file-with-c';
      break;
    default:
      item.type = 'icon-wenjian';
      break;
  }
  return item;
};
