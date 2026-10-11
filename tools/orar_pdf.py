# PDF-urile de orar, din data/orar.json: docs/orar/orar_cpa.pdf, orar_1a.pdf ... orar_8b.pdf, cate unul pe clasa.
# Rulare din folderul site-ului: python tools/orar_pdf.py   (dupa tools/orar_din_docx.py). Fonturile sunt cele din Windows.
import json
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle, Paragraph
from reportlab.lib.styles import ParagraphStyle
from xml.sax.saxutils import escape
from reportlab.lib.utils import ImageReader
from PIL import Image

NAVY, GOLD, GOLD_DARK, GOLD_LIGHT, CREAM, BEIGE, TEXT = (HexColor(c) for c in
    ('#001F3F', '#D4AF37', '#B89047', '#F3E5AB', '#F5F0E4', '#FBF8F0', '#1a2433'))
F = 'C:/Windows/Fonts/'
for nume, fisier in (('Serif', 'georgiab.ttf'), ('Sans', 'segoeui.ttf'), ('SansB', 'segoeuib.ttf')):
    pdfmetrics.registerFont(TTFont(nume, F + fisier))
AN = {'CP': 'cp', 'I': '1', 'II': '2', 'III': '3', 'IV': '4', 'V': '5', 'VI': '6', 'VII': '7', 'VIII': '8'}
CELULA = ParagraphStyle('celula', fontName='Sans', fontSize=12, leading=14.5, alignment=1, textColor=HexColor('#1a2433'))


def eticheta(clasa):  # 'CP A' -> Clasa pregătitoare A, 'I A' -> Clasa I A, 'V A' -> Clasa a V-a A
    an, lit = clasa.split()
    return 'Clasa ' + ('pregătitoare ' if an == 'CP' else an + ' ' if an == 'I' else 'a ' + an + '-a ') + lit


W, H = landscape(A4)
LOGO = Image.open('images/logo.png'); LOGO.thumbnail((240, 260))  # cat se vede tiparit; originalul face PDF-ul de 1 MB
BANDA = HexColor('#%02x%02x%02x' % LOGO.getpixel((2, 2))[:3])  # culoarea fundalului din logo, ca patratul sa nu se vada
LOGO = ImageReader(LOGO)
SCOALA = 'Școala Gimnazială „Principele Carol”'


def pagina(c, o, clasa):
    # antet: banda albastra cu logo, scoala, clasa; in marginile paginii, ca imprimanta sa n-o taie
    c.setFillColor(BANDA); c.setStrokeColor(GOLD); c.setLineWidth(2)
    c.roundRect(28, H - 128, W - 56, 100, 10, stroke=1, fill=1)
    c.drawImage(LOGO, 42, H - 119, width=75, height=82)
    c.setFillColor(GOLD_LIGHT); c.setFont('Serif', 19)
    c.drawString(132, H - 72, SCOALA)
    c.setFillColor(CREAM); c.setFont('Sans', 11)
    c.drawString(132, H - 92, 'Gura Humorului, Suceava')
    c.setFillColor(GOLD); c.setFont('Serif', 26)
    c.drawRightString(W - 44, H - 74, eticheta(clasa))
    c.setFillColor(CREAM); c.setFont('Sans', 11.5)
    c.drawRightString(W - 44, H - 94, 'Orarul anului școlar ' + o['anScolar'])

    zile = o['zile']; ore = o['clase'][clasa]
    n = max(i + 1 for z in zile for i, m in enumerate(ore[z]) if m)  # fara randurile goale de la final
    celula = lambda m: Paragraph(escape(m).replace(' - ', '<br/>'), CELULA)  # textele lungi se rup pe randuri
    date = [['Ora'] + zile] + [[o['ore'][i]] + [celula(ore[z][i]) for z in zile] for i in range(n)]
    lat = (W - 56 - 70) / 5
    t = Table(date, colWidths=[70] + [lat] * 5)
    t.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, 0), 'SansB', 12), ('BACKGROUND', (0, 0), (-1, 0), BANDA),
        ('TEXTCOLOR', (0, 0), (-1, 0), CREAM),
        ('FONT', (0, 1), (0, -1), 'SansB', 11), ('TEXTCOLOR', (0, 1), (0, -1), GOLD_DARK),
        ('FONT', (1, 1), (-1, -1), 'Sans', 12), ('TEXTCOLOR', (1, 1), (-1, -1), TEXT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#FFFFFF'), BEIGE]),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.6, HexColor('#E7DCC0')), ('BOX', (0, 0), (-1, -1), 1.5, GOLD),
        ('TOPPADDING', (0, 0), (-1, 0), 8), ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 19), ('BOTTOMPADDING', (0, 1), (-1, -1), 19),
    ]))
    tw, th = t.wrap(0, 0)
    t.drawOn(c, 28, H - 146 - th)
    if o.get('note', {}).get(clasa):
        c.setFillColor(NAVY); c.setFont('Sans', 11.5)
        c.drawString(32, H - 168 - th, o['note'][clasa])
    c.showPage()


def main():
    o = json.load(open('data/orar.json', encoding='utf-8'))
    for clasa in o['clase']:
        an, lit = clasa.split()
        c = canvas.Canvas('docs/orar/orar_%s%s.pdf' % (AN[an], lit.lower()), pagesize=(W, H), invariant=1)  # invariant: PDF-urile neschimbate raman identice
        c.setTitle('Orarul: %s, %s' % (eticheta(clasa), o['anScolar']))
        c.setAuthor(SCOALA); c.setCreator(SCOALA); c.setProducer(SCOALA)  # fara „ReportLab” in proprietatile PDF-ului
        pagina(c, o, clasa); c.save()


if __name__ == '__main__':
    main()
