const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage() {
  const inputPath = './public/assets/photo.png';
  const outputDir = './public/assets/optimized/';
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Generate WebP version (better compression)
    await sharp(inputPath)
      .resize(498, 498, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(outputDir, 'photo.webp'));

    // Generate AVIF version (best compression, modern browsers)
    await sharp(inputPath)
      .resize(498, 498, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .avif({ quality: 80, effort: 9 })
      .toFile(path.join(outputDir, 'photo.avif'));

    // Generate optimized PNG as fallback
    await sharp(inputPath)
      .resize(498, 498, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(path.join(outputDir, 'photo-optimized.png'));

    // Generate thumbnail versions for faster loading
    await sharp(inputPath)
      .resize(298, 298, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85 })
      .toFile(path.join(outputDir, 'photo-thumb.webp'));

    console.log('✅ Images optimized successfully!');
    console.log('📁 Check ./public/assets/optimized/ for optimized images');
    
    // Generate blur placeholder
    const blurBuffer = await sharp(inputPath)
      .resize(10, 10, { fit: 'contain' })
      .blur(1)
      .png()
      .toBuffer();
    
    const blurDataURL = `data:image/png;base64,${blurBuffer.toString('base64')}`;
    console.log('🎨 Blur placeholder data URL:');
    console.log(blurDataURL);
    
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

optimizeImage();
