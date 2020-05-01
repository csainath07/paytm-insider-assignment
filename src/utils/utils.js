export const dataUriToFile = (dataUri = null, width = 380, height = 380, type = '_') => {
  if (dataUri && dataUri.split(',')[0].indexOf('base64') >= 0) {
    // create Blob from base64 image and convert that blob to file object
    const byteString = window.atob(dataUri.split(',')[1]);
    let ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], { type: 'image/jpeg' });
    return new File([blob], `img_${type}_${new Date().getTime()}_${width}x${height}.jpg`, { type: "image/jpeg" });
  }
  return null;
}