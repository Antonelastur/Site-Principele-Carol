# -*- coding: utf-8 -*-
"""Pregătește un set de fotografii pentru galeria site-ului.

Ce face:
  - rotește pozele după orientarea din EXIF (pozele de pe telefon nu mai apar culcate);
  - elimină duplicatele (aceeași poză trimisă de două ori);
  - salvează o variantă web (max 1600 px) și o miniatură (max 640 px), optimizate;
  - scrie pe ecran blocul JSON („grupuri” și „foto”) gata de lipit în data/galerie.json
    sau în formularul din admin-galerie.html.

Fotografiile originale rămân neatinse în folderul-sursă.

Folosire:
    python tools/pregateste-poze.py "C:/cale/catre/poze" 2026-2027 excursie-vatra-dornei

Dacă folderul-sursă are subfoldere, fiecare subfolder devine un grup în album
(de exemplu, câte un subfolder pe clasă); numele subfolderului devine numele grupului.
"""
import hashlib
import json
import os
import re
import sys
import unicodedata

from PIL import Image, ImageOps

MAX_MARE = 1600
MAX_MIC = 640
EXT = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.heic')


def slug(text):
    text = text.replace('ș', 's').replace('ş', 's').replace('ț', 't').replace('ţ', 't')
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
    text = re.sub(r'[^a-zA-Z0-9]+', '-', text).strip('-').lower()
    return text or 'grup'


def poze_din(folder):
    return sorted(f for f in os.listdir(folder)
                  if f.lower().endswith(EXT) and os.path.isfile(os.path.join(folder, f)))


def main():
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)
    sursa, an, album = sys.argv[1], sys.argv[2], slug(sys.argv[3])
    if not re.match(r'^\d{4}-\d{4}$', an):
        print('Anul școlar se scrie ca 2026-2027.')
        sys.exit(1)

    dest = os.path.join('images', 'galerie', an, album)
    os.makedirs(os.path.join(dest, 'mici'), exist_ok=True)

    subfoldere = sorted(d for d in os.listdir(sursa) if os.path.isdir(os.path.join(sursa, d)))
    seturi = [(d, os.path.join(sursa, d)) for d in subfoldere] or [(None, sursa)]

    vazute, grupuri, foto = {}, [], []
    for nume_grup, cale in seturi:
        gid = slug(nume_grup) if nume_grup else None
        if gid:
            grupuri.append({'id': gid, 'nume': nume_grup, 'subtitlu': ''})
        n = 0
        for f in poze_din(cale):
            cale_f = os.path.join(cale, f)
            h = hashlib.md5(open(cale_f, 'rb').read()).hexdigest()
            if h in vazute:
                print('  duplicat, sărit: %s (identic cu %s)' % (f, vazute[h]))
                continue
            vazute[h] = f
            n += 1
            nume = '%s-%d.jpg' % (gid or album, n)
            im = ImageOps.exif_transpose(Image.open(cale_f)).convert('RGB')
            mare = im.copy()
            mare.thumbnail((MAX_MARE, MAX_MARE), Image.LANCZOS)
            mare.save(os.path.join(dest, nume), 'JPEG', quality=82, optimize=True, progressive=True)
            mic = im.copy()
            mic.thumbnail((MAX_MIC, MAX_MIC), Image.LANCZOS)
            mic.save(os.path.join(dest, 'mici', nume), 'JPEG', quality=78, optimize=True, progressive=True)
            intrare = {
                'src': '%s/%s' % (dest.replace(os.sep, '/'), nume),
                'mic': '%s/mici/%s' % (dest.replace(os.sep, '/'), nume),
                'w': mare.width, 'h': mare.height,
                'alt': '', 'titlu': '',
            }
            if gid:
                intrare['grup'] = gid
            foto.append(intrare)

    if not foto:
        print('Nu am găsit nicio fotografie în %s' % sursa)
        sys.exit(1)

    print('\n%d fotografii pregătite în %s\n' % (len(foto), dest))
    print('--- de lipit în album (completează „alt” și „titlu” la fiecare poză) ---')
    bloc = {'coperta': foto[0]['mic'], 'foto': foto}
    if grupuri:
        bloc['grupuri'] = grupuri
    print(json.dumps(bloc, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
