import sys
import numpy as np
from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    arr = np.array(img, dtype=np.float32)
    
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    
    # Calculate saturation & brightness
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    chroma = max_c - min_c
    brightness = (r + g + b) / 3.0
    
    # Background checkerboard tiles are neutral grays (chroma < 18) with brightness in gray range (80..235)
    # Ballerina has white body fill (brightness > 240), black ink lines (brightness < 60), or cyan glow (chroma > 20)
    bg_mask = (chroma < 18) & (brightness >= 75) & (brightness <= 238)
    
    # Create final RGBA image with alpha = 0 for all checkerboard gray pixels
    out_arr = np.array(img)
    out_arr[bg_mask, 3] = 0
    
    out_img = Image.fromarray(out_arr, 'RGBA')
    out_img.save(output_path, 'PNG')
    print(f"Saved perfectly transparent PNG to {output_path}")

if __name__ == '__main__':
    process_image('/home/artz/Documentos/Antigravity/Star-Ink/public/imagens/Arte01/Ballerina03.jpeg',
                  '/home/artz/Documentos/Antigravity/Star-Ink/public/imagens/Arte01/Ballerina03.png')
    process_image('/home/artz/Documentos/Antigravity/Star-Ink/public/imagens/Arte01/Ballerina04.jpeg',
                  '/home/artz/Documentos/Antigravity/Star-Ink/public/imagens/Arte01/Ballerina04.png')
