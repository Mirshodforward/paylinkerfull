#!/usr/bin/env bash
# Paylinker logo hosilalarini `public/paylinker-logo.png` (512x512, shaffof) dan yasaydi.
# macOS `sips` ishlatadi — qo'shimcha npm paket shart emas.
#
#   bash scripts/generate-logo-assets.sh
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
src="$root/public/paylinker-logo.png"
[ -f "$src" ] || { echo "topilmadi: $src" >&2; exit 1; }

gen() { # gen <fayl> <o'lcham>
  cp "$src" "$root/public/$1"
  sips -s format png -z "$2" "$2" "$root/public/$1" >/dev/null
  echo "yozildi public/$1 (${2}x${2})"
}

gen favicon.png 256
gen apple-touch-icon.png 180
gen paylinker-logo-192.png 192
gen paylinker-logo-512.png 512

# Telegram / oq fon talab qiladigan joylar uchun (shaffoflik o'rniga oq)
tmp="$(mktemp -d)"
sips -s format png -z 1024 1024 "$src" --out "$tmp/fg.png" >/dev/null
python3 - "$tmp/fg.png" "$root/public/paylinker-logo-telegram.png" <<'PY'
import sys, zlib, struct

def read_png(path):
    data = open(path, 'rb').read()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    pos, idat, hdr = 8, b'', None
    while pos < len(data):
        ln = struct.unpack('>I', data[pos:pos+4])[0]
        typ = data[pos+4:pos+8]
        chunk = data[pos+8:pos+8+ln]
        if typ == b'IHDR':
            hdr = struct.unpack('>IIBBBBB', chunk)
        elif typ == b'IDAT':
            idat += chunk
        pos += 12 + ln
    return hdr, zlib.decompress(idat)

def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p-a), abs(p-b), abs(p-c)
    return a if pa <= pb and pa <= pc else (b if pb <= pc else c)

hdr, raw = read_png(sys.argv[1])
w, h, depth, color, *_ = hdr
assert depth == 8 and color == 6, (depth, color)
bpp, stride = 4, w * 4
out, prev = bytearray(), bytearray(stride)
i = 0
for _ in range(h):
    ft = raw[i]; i += 1
    line = bytearray(raw[i:i+stride]); i += stride
    for x in range(stride):
        a = line[x-bpp] if x >= bpp else 0
        b = prev[x]
        c = prev[x-bpp] if x >= bpp else 0
        if ft == 1: line[x] = (line[x] + a) & 255
        elif ft == 2: line[x] = (line[x] + b) & 255
        elif ft == 3: line[x] = (line[x] + (a + b) // 2) & 255
        elif ft == 4: line[x] = (line[x] + paeth(a, b, c)) & 255
    out += line
    prev = line

# oq fon ustiga alpha-kompozit
flat = bytearray()
for p in range(0, len(out), 4):
    r, g, b, al = out[p:p+4]
    f = al / 255
    flat += bytes((round(r*f + 255*(1-f)), round(g*f + 255*(1-f)), round(b*f + 255*(1-f))))

body = bytearray()
for y in range(h):
    body.append(0)
    body += flat[y*w*3:(y+1)*w*3]

def chunk(typ, data):
    return struct.pack('>I', len(data)) + typ + data + struct.pack('>I', zlib.crc32(typ + data) & 0xffffffff)

png = b'\x89PNG\r\n\x1a\n'
png += chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
png += chunk(b'IDAT', zlib.compress(bytes(body), 9))
png += chunk(b'IEND', b'')
open(sys.argv[2], 'wb').write(png)
PY
rm -rf "$tmp"
echo "yozildi public/paylinker-logo-telegram.png (1024x1024, oq fon)"
