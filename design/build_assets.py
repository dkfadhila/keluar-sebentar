"""Format/resize generated originals for the web; never regenerate artwork."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / 'dist' / 'assets'
assets.mkdir(exist_ok=True)
photo = Image.open(root / 'design/source/porch.png').convert('RGB')
photo.thumbnail((1536, 1024), Image.Resampling.LANCZOS)
photo.save(assets / 'porch.webp', 'WEBP', quality=85, method=6)

original = Image.open(root / 'design/source/door-mark.png').convert('RGBA')
assert original.getchannel('A').getextrema()[0] == 0, 'Expected real alpha'
mark = original.crop(original.getchannel('A').getbbox())
side = max(mark.size)
canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
canvas.alpha_composite(mark, ((side-mark.width)//2, (side-mark.height)//2))
canvas.resize((512, 512), Image.Resampling.LANCZOS).save(assets / 'logo.png', optimize=True)

def icon(size, background=False):
    layer = Image.new('RGBA', (size, size), '#fcfbf7' if background else (0,0,0,0))
    edge = round(size * .79)
    small = canvas.resize((edge, edge), Image.Resampling.LANCZOS)
    layer.alpha_composite(small, ((size-edge)//2, (size-edge)//2))
    return layer

icon(32).save(assets / 'favicon-32.png', optimize=True)
icon(64).save(root / 'dist/favicon.ico', format='ICO', sizes=[(16,16),(32,32),(48,48),(64,64)])
icon(180, True).convert('RGB').save(assets / 'apple-touch-icon.png', optimize=True)
for size in (192,512):
    icon(size, True).save(assets / f'icon-{size}.png', optimize=True)
print('Prepared photo, transparent logo, favicon, Apple icon and PWA icons.')
print('Logo alpha:', original.getchannel('A').getextrema())
for file in sorted(assets.iterdir()):
    print(file.name, file.stat().st_size)
