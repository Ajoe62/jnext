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
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log('❌ Input image not found at:', inputPath);
      return;
    }
    
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    console.log(`📸 Original image size: ${(originalStats.size / 1024).toFixed(2)} KB`);
    
    // Convert to WebP with optimization
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 6,
        smartSubsample: true
      })
      .toFile(path.join(outputDir, 'photo.webp'));
    
    // Convert to AVIF with optimization (most modern format)
    await sharp(inputPath)
      .avif({ 
        quality: 80,
        effort: 9
      })
      .toFile(path.join(outputDir, 'photo.avif'));
    
    // Create optimized PNG as fallback
    await sharp(inputPath)
      .png({ 
        quality: 90,
        compressionLevel: 9,
        progressive: true
      })
      .toFile(path.join(outputDir, 'photo-optimized.png'));
    
    // Create different sizes for responsive loading
    const sizes = [298, 398, 498];
    
    for (const size of sizes) {
      // WebP versions
      await sharp(inputPath)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 85, effort: 6 })
        .toFile(path.join(outputDir, `photo-${size}.webp`));
      
      // AVIF versions  
      await sharp(inputPath)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .avif({ quality: 80, effort: 9 })
        .toFile(path.join(outputDir, `photo-${size}.avif`));
    }
    
    // Generate a tiny placeholder (10x10) for ultra-fast blur
    const placeholderBuffer = await sharp(inputPath)
      .resize(10, 10, { fit: 'contain' })
      .png()
      .toBuffer();
    
    const placeholderBase64 = `data:image/png;base64,${placeholderBuffer.toString('base64')}`;
    
    // Save placeholder to a file for easy use
    fs.writeFileSync(
      path.join(outputDir, 'placeholder.txt'), 
      placeholderBase64
    );
    
    // Check optimized file sizes
    const webpStats = fs.statSync(path.join(outputDir, 'photo.webp'));
    const avifStats = fs.statSync(path.join(outputDir, 'photo.avif'));
    
    console.log('✅ Image optimization complete!');
    console.log(`📦 WebP size: ${(webpStats.size / 1024).toFixed(2)} KB (${((1 - webpStats.size / originalStats.size) * 100).toFixed(1)}% smaller)`);
    console.log(`📦 AVIF size: ${(avifStats.size / 1024).toFixed(2)} KB (${((1 - avifStats.size / originalStats.size) * 100).toFixed(1)}% smaller)`);
    console.log(`🎯 Placeholder generated: ${placeholderBase64.substring(0, 50)}...`);
    console.log('\n📁 Files created in ./public/assets/optimized/');
    
  } catch (error) {
    console.error('❌ Error optimizing image:', error);
  }
}

optimizeImage();
