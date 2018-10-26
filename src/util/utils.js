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
      item.color = '#1296DB';
      break;
    case '.xlsx':
      item.type = 'icon--xlsx-file-format';
      item.color = '#36AB60';
      break;
    case '.zip':
      item.type = 'icon--zip-compressed-f';
      item.color = '#13227A';
      break;
    case '.rar':
      item.type = 'icon--rar-file-format';
      item.color = '#13227A';
      break;
    case '.jpg':
      item.type = 'icon--jpg-image-file-f';
      item.color = '#333333';
      break;
    case '.ppt':
      item.type = 'icon--ppt-file-format';
      item.color = '#0B988F';
      break;
    case '.txt':
      item.type = 'icon--txt-text-file-ex';
      item.color = '#333333';
      break;
    case '.pdf':
      item.type = 'icon--pdf-file-format-';
      item.color = '#D4237A';
      break;
    case '.html':
      item.type = 'icon--html-file-with-c';
      item.color = '#333333';
      break;
    default:
      item.type = 'icon-wenjian';
      item.color = '#333333';
      break;
  }
  return item;
};
