import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    inputDir: path.join(__dirname, 'public', 'Final'), // Change this to your images folder
    outputDir: path.join(__dirname, 'public', 'Final-webp'), // Output folder for WebP images
    quality: 85, // WebP quality (0-100, recommended: 80-90)
    skipExisting: true, // Skip if WebP already exists
    deleteOriginal: false, // Set to true to delete JPG/PNG after conversion
    extensions: ['.jpg', '.jpeg', '.png'], // File types to convert
};

// Create output directory if it doesn't exist
if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Get all image files recursively
function getAllImages(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getAllImages(filePath, fileList);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (CONFIG.extensions.includes(ext)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

// Convert image to WebP
async function convertToWebP(inputPath) {
    const relativePath = path.relative(CONFIG.inputDir, inputPath);
    const outputPath = path.join(
        CONFIG.outputDir,
        relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    );

    // Create subdirectories if needed
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Skip if already exists
    if (CONFIG.skipExisting && fs.existsSync(outputPath)) {
        console.log(`⏭️  Skipped (already exists): ${relativePath}`);
        return { skipped: true };
    }

    try {
        const startTime = Date.now();
        const inputStats = fs.statSync(inputPath);
        const inputSize = inputStats.size;

        // Convert to WebP
        await sharp(inputPath)
            .webp({ quality: CONFIG.quality })
            .toFile(outputPath);

        const outputStats = fs.statSync(outputPath);
        const outputSize = outputStats.size;
        const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
        const timeTaken = Date.now() - startTime;

        console.log(
            `✅ Converted: ${relativePath}\n` +
            `   ${(inputSize / 1024).toFixed(1)}KB → ${(outputSize / 1024).toFixed(1)}KB ` +
            `(${savings}% smaller, ${timeTaken}ms)`
        );

        // Delete original if configured
        if (CONFIG.deleteOriginal) {
            fs.unlinkSync(inputPath);
            console.log(`   🗑️  Deleted original`);
        }

        return {
            success: true,
            inputSize,
            outputSize,
            savings: parseFloat(savings),
        };
    } catch (error) {
        console.error(`❌ Error converting ${relativePath}:`, error.message);
        return { error: true };
    }
}

// Main execution
async function main() {
    console.log('🖼️  WebP Conversion Tool\n');
    console.log(`Input directory: ${CONFIG.inputDir}`);
    console.log(`Output directory: ${CONFIG.outputDir}`);
    console.log(`Quality: ${CONFIG.quality}`);
    console.log(`Delete originals: ${CONFIG.deleteOriginal ? 'Yes' : 'No'}\n`);

    // Check if input directory exists
    if (!fs.existsSync(CONFIG.inputDir)) {
        console.error(`❌ Input directory does not exist: ${CONFIG.inputDir}`);
        console.log('\n💡 Tip: Update the "inputDir" in the script to match your images folder');
        process.exit(1);
    }

    const images = getAllImages(CONFIG.inputDir);

    if (images.length === 0) {
        console.log('❌ No images found to convert');
        console.log(`   Looking for: ${CONFIG.extensions.join(', ')}`);
        process.exit(0);
    }

    console.log(`Found ${images.length} image(s) to process\n`);
    console.log('─'.repeat(60));

    const results = {
        success: 0,
        skipped: 0,
        error: 0,
        totalInputSize: 0,
        totalOutputSize: 0,
    };

    // Convert all images
    for (const imagePath of images) {
        const result = await convertToWebP(imagePath);

        if (result.success) {
            results.success++;
            results.totalInputSize += result.inputSize;
            results.totalOutputSize += result.outputSize;
        } else if (result.skipped) {
            results.skipped++;
        } else if (result.error) {
            results.error++;
        }
    }

    // Summary
    console.log('─'.repeat(60));
    console.log('\n📊 Conversion Summary:');
    console.log(`✅ Converted: ${results.success}`);
    console.log(`⏭️  Skipped: ${results.skipped}`);
    console.log(`❌ Errors: ${results.error}`);

    if (results.success > 0) {
        const totalSavings = results.totalInputSize - results.totalOutputSize;
        const savingsPercent = ((totalSavings / results.totalInputSize) * 100).toFixed(1);
        console.log(
            `\n💾 Total size: ${(results.totalInputSize / 1024).toFixed(1)}KB → ` +
            `${(results.totalOutputSize / 1024).toFixed(1)}KB`
        );
        console.log(`   Saved ${(totalSavings / 1024).toFixed(1)}KB (${savingsPercent}% reduction)`);
    }

    console.log(`\n✨ Done! WebP images saved to: ${CONFIG.outputDir}`);
}

main().catch(console.error);
