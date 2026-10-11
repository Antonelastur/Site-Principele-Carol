# PDF-urile de orar, din data/orar.json: docs/orar/orar_5a.pdf ... (cate unul pe clasa) + orar_gimnaziu.pdf (toate clasele).
# Rulare din folderul site-ului: python tools/orar_pdf.py   (dupa tools/orar_din_docx.py). Fonturile sunt cele din Windows.
import json
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle
from reportlab.lib.utils import ImageReader
from PIL import Image

NAVY, GOLD, GOLD_DARK, CREAM, BEIGE, TEXT = (HexColor(c) for c in
    ('#001F3F', '#D4AF37', '#B89047', '#F5F0E4', '#FBF8F0', '#1a2433'))
F = 'C:/Windows/Fonts/'
for nume, fisier in (('Serif', 'georgiab.ttf'), ('Sans', 'segoeui.ttf'), ('SansB', 'segoeuib.ttf')):
    pdfmetrics.registerFont(TTFont(nume, F + fisier))
ARAB = {'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8}
W, H = landscape(A4)
LOGO = Image.open('images/logo.png'); LOGO.thumbnail((240, 260))  # cat se vede tiparit; originalul face PDF-ul de 1 MB
LOGO = ImageReader(LOGO)


def pagina(c, o, clasa):
    # antet: logo, scoala, clasa
    c.drawImage(LOGO, 36, H - 104, width=62, height=68, mask='auto')
    c.setFillColor(NAVY); c.setFont('Serif', 17)
    c.drawString(110, H - 62, 'Școala Gimnazială „Principele Carol”')
    c.setFillColor(TEXT); c.setFont('Sans', 10.5)
    c.drawString(110, H - 80, 'Gura Humorului, Suceava')
    c.setFillColor(GOLD_DARK); c.setFont('Serif', 24)
    c.drawRightString(W - 36, H - 64, 'Clasa a ' + clasa.replace(' ', '-a '))
    c.setFillColor(NAVY); c.setFont('Sans', 11)
    c.drawRightString(W - 36, H - 82, 'Orarul anului școlar ' + o['anScolar'])
    c.setStrokeColor(GOLD); c.setLineWidth(2); c.line(36, H - 114, W - 36, H - 114)

    zile = o['zile']; ore = o['clase'][clasa]
    n = max(i + 1 for z in zile for i, m in enumerate(ore[z]) if m)  # fara randurile goale de la final
    date = [['Ora'] + zile] + [[o['ore'][i]] + [ore[z][i] for z in zile] for i in range(n)]
    lat = (W - 72 - 70) / 5
    t = Table(date, colWidths=[70] + [lat] * 5, rowHeights=[30] + [min(52, 360 / n)] * n)
    t.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, 0), 'SansB', 12), ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), CREAM),
        ('FONT', (0, 1), (0, -1), 'SansB', 11), ('TEXTCOLOR', (0, 1), (0, -1), GOLD_DARK),
        ('FONT', (1, 1), (-1, -1), 'Sans', 12), ('TEXTCOLOR', (1, 1), (-1, -1), TEXT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), BEIGE]),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.6, HexColor('#E7DCC0')), ('BOX', (0, 0), (-1, -1), 1.5, GOLD),
    ]))
    tw, th = t.wrap(0, 0)
    t.drawOn(c, 36, H - 134 - th)
    c.setFillColor(GOLD_DARK); c.setFont('Sans', 9)
    c.drawCentredString(W / 2, 26, 'principelecarol.ro/orar.html')
    c.showPage()


def main():
    o = json.load(open('data/orar.json', encoding='utf-8'))
    toate = canvas.Canvas('docs/orar/orar_gimnaziu.pdf', pagesize=(W, H))
    toate.setTitle('Orarul gimnaziului ' + o['anScolar'])
    for clasa in o['clase']:
        ani, lit = clasa.split()
        c = canvas.Canvas('docs/orar/orar_%d%s.pdf' % (ARAB[ani], lit.lower()), pagesize=(W, H))
        c.setTitle('Orarul clasei a %s %s' % (clasa.replace(' ', '-a '), o['anScolar']))
        pagina(c, o, clasa); c.save()
        pagina(toate, o, clasa)
    toate.save()


if __name__ == '__main__':
    main()
