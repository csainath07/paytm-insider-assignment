const imageDataURI = require('image-data-uri');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dfiywgv6u',
  api_key: '284951874282852',
  api_secret: '7IZv8rgi3GJ8U-RItrwxaPtXrW0'
});

const uploadFile = async (req, res) => {
  try {
    const images = req.files;
    const promises = images.map((image) => {
      const img = imageDataURI.encode(image.buffer, 'JPEG');
      return new Promise((resolve, reject) => {
        cloudinary
          .uploader
          .upload(img, {
            public_id: image.originalname.split('.')[0],
            resource_type: "image"
          }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
      });
    });
    const result = await Promise.all(promises);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = uploadFile;