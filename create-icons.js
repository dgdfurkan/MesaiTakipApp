// Bu scripti Node.js ile çalıştırabilirsin
const fs = require('fs');

// SVG'yi oku
const svgContent = fs.readFileSync('logo.svg', 'utf8');

// HTML dosyası oluştur
const html = `
<!DOCTYPE html>
<html>
<head><title>Icon Generator</title></head>
<body>
    <canvas id="canvas192" width="192" height="192"></canvas>
    <canvas id="canvas512" width="512" height="512"></canvas>
    <script>
        const svgContent = \`${svgContent}\`;
        
        function createIcon(size) {
            const canvas = document.getElementById('canvas' + size);
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = function() {
                ctx.fillStyle = '#667eea';
                ctx.fillRect(0, 0, size, size);
                ctx.drawImage(img, 0, 0, size, size);
                
                const link = document.createElement('a');
                link.download = 'icon-' + size + '.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            };
            
            const blob = new Blob([svgContent], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(blob);
            img.src = url;
        }
        
        setTimeout(() => createIcon(192), 100);
        setTimeout(() => createIcon(512), 200);
    </script>
</body>
</html>`;

fs.writeFileSync('generate-icons.html', html);
console.log('generate-icons.html oluşturuldu. Tarayıcıda aç ve PNG'leri indir.');
