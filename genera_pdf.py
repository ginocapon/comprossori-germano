from fpdf import FPDF

class PDF(FPDF):
    def section_title(self, text):
        self.set_font('Helvetica', 'B', 15)
        self.set_text_color(26, 86, 142)
        self.cell(0, 10, text, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(26, 86, 142)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(4)

    def body_text(self, text, bold=False, italic=False, size=11):
        style = ''
        if bold: style += 'B'
        if italic: style += 'I'
        self.set_font('Helvetica', style, size)
        self.set_text_color(51, 51, 51)
        self.multi_cell(0, 6, text)

    def bullet(self, bold_part, normal_part):
        self.set_font('Helvetica', '', 11)
        self.set_text_color(51, 51, 51)
        x = self.get_x()
        self.cell(8, 6, '-')
        self.set_font('Helvetica', 'B', 11)
        self.write(6, bold_part)
        self.set_font('Helvetica', '', 11)
        self.write(6, normal_part)
        self.ln(8)

    def separator(self):
        self.set_draw_color(200, 200, 200)
        y = self.get_y() + 3
        mid = self.w / 2
        self.line(mid - 60, y, mid + 60, y)
        self.ln(8)


pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=25)
pdf.add_page()

# --- TITLE ---
pdf.set_font('Helvetica', 'B', 24)
pdf.set_text_color(26, 86, 142)
pdf.cell(0, 12, 'ASSISTENTE TECNICO', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.cell(0, 12, 'INTELLIGENTE', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.set_font('Helvetica', '', 14)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 10, 'per Aria Compressa', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.ln(2)
pdf.set_font('Helvetica', 'I', 12)
pdf.set_text_color(150, 150, 150)
pdf.cell(0, 8, 'Proposta Progettuale', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.ln(6)

pdf.separator()
pdf.ln(2)

# --- INTRO ---
pdf.set_font('Helvetica', 'B', 11)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 6, 'Ciao Germano,', new_x="LMARGIN", new_y="NEXT")
pdf.ln(2)
pdf.body_text(
    "questa e' un'idea di progetto basata sulle caratteristiche della tua azienda. "
    "Una volta strutturato e validato, potremmo pensare di proporlo a tutte le filiali "
    "in Italia. Ovviamente solo se la cosa ti interessa - pero' dai un'occhiata "
    "perche' credo ne valga la pena."
)
pdf.ln(6)

# --- COS'E' ---
pdf.section_title("Cos'e' in pratica")
pdf.body_text("Un assistente digitale accessibile da web e WhatsApp che:")
pdf.ln(3)

pdf.bullet("Risponde ai clienti", " su prodotti, compatibilita' e manutenzione - 24 ore su 24")
pdf.bullet("Dimensiona impianti", " partendo dai dati del cliente (settore, utensili, ore di lavoro, pressione)")
pdf.bullet("Genera preventivi", " con la configurazione corretta")
pdf.bullet("Passa la mano al tecnico", " quando il caso e' troppo complesso")

pdf.set_font('Helvetica', 'I', 10)
pdf.set_text_color(100, 100, 100)
pdf.multi_cell(0, 5, "Non inventa nulla: ragiona sui vostri cataloghi, le vostre schede tecniche e le regole dei vostri tecnici.")
pdf.ln(6)

# --- COME SI FA ---
pdf.section_title("Come si realizza - 4 step")

# Table
col_widths = [15, 115, 30]
headers = ['Step', 'Cosa si fa', 'Tempo']

# Header row
pdf.set_fill_color(26, 86, 142)
pdf.set_text_color(255, 255, 255)
pdf.set_font('Helvetica', 'B', 10)
for i, h in enumerate(headers):
    pdf.cell(col_widths[i], 8, h, border=1, fill=True, align='C')
pdf.ln()

rows = [
    ('1', "Ci date cataloghi, schede e listini. Facciamo 2-3\nchiacchierate col vostro tecnico piu' esperto", '1 sett.'),
    ('2', 'Noi costruiamo il sistema e lo colleghiamo ai vostri documenti', '2 sett.'),
    ('3', 'Il vostro tecnico verifica le risposte su casi reali.\nCorreggiamo dove sbaglia', '1 sett.'),
    ('4', 'Si accende su una filiale pilota, si monitora e si affina', '1 sett.'),
]

for idx, (step, cosa, tempo) in enumerate(rows):
    if idx % 2 == 1:
        pdf.set_fill_color(240, 245, 250)
        fill = True
    else:
        pdf.set_fill_color(255, 255, 255)
        fill = True

    pdf.set_text_color(51, 51, 51)
    line_count = cosa.count('\n') + 1
    row_h = 7 * line_count

    y_start = pdf.get_y()
    x_start = pdf.get_x()

    # Step cell
    pdf.set_font('Helvetica', 'B', 10)
    pdf.cell(col_widths[0], row_h, step, border=1, fill=fill, align='C')

    # Cosa cell
    pdf.set_font('Helvetica', '', 10)
    x = pdf.get_x()
    y = pdf.get_y()
    # Draw border and fill manually
    pdf.rect(x, y, col_widths[1], row_h, 'D')
    if fill:
        pdf.rect(x, y, col_widths[1], row_h, 'DF')
    pdf.set_xy(x + 1, y + 1)
    pdf.multi_cell(col_widths[1] - 2, 7 if line_count > 1 else row_h - 2, cosa, border=0)
    pdf.set_xy(x + col_widths[1], y_start)

    # Tempo cell
    pdf.set_font('Helvetica', '', 10)
    pdf.cell(col_widths[2], row_h, tempo, border=1, fill=fill, align='C')
    pdf.ln()

pdf.ln(4)
pdf.set_font('Helvetica', 'B', 12)
pdf.set_text_color(26, 86, 142)
pdf.cell(0, 8, 'Dal via al primo utilizzo reale: circa 5 settimane', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.ln(6)

# --- COSA SERVE ---
pdf.section_title('Cosa serve da parte vostra')

items = [
    "I PDF che avete gia' (cataloghi, schede tecniche, listino)",
    "10-15 ore del tecnico piu' esperto, distribuite in 2-3 incontri",
    "Una filiale che faccia da pilota",
]
for item in items:
    pdf.set_font('Helvetica', '', 11)
    pdf.set_text_color(51, 51, 51)
    pdf.cell(8, 6, '-')
    pdf.write(6, item)
    pdf.ln(8)

pdf.ln(2)
pdf.set_font('Helvetica', 'I', 10)
pdf.set_text_color(100, 100, 100)
pdf.cell(0, 6, 'Nessun software da installare, nessun server da comprare. Funziona da qualsiasi dispositivo.', new_x="LMARGIN", new_y="NEXT")
pdf.ln(6)

# --- PERCHE' CONVIENE ---
pdf.section_title("Perche' conviene")

pdf.bullet("Il tecnico si libera", " delle domande ripetitive (il 60-70% del totale)")
pdf.bullet("I clienti ricevono risposta immediata", ", anche di notte o nel weekend")
pdf.bullet("Un nuovo commerciale diventa operativo", " in giorni invece che in mesi")
pdf.bullet("Nessun concorrente in Italia", " offre questo servizio oggi")
pdf.ln(4)

# --- ESPANSIONE ---
pdf.section_title("L'idea piu' grande")

pdf.body_text(
    "Una volta che funziona sulla tua filiale, ogni altra filiale in Italia si attiva in 2-3 giorni. "
    "La conoscenza tecnica e' gia' dentro il sistema - si personalizza solo il listino e i contatti locali."
)
pdf.ln(6)

pdf.set_font('Helvetica', 'B', 14)
pdf.set_text_color(26, 86, 142)
pdf.cell(0, 8, 'Filiale pilota  >  Regione  >  Tutta Italia', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.set_font('Helvetica', '', 10)
pdf.set_text_color(150, 150, 150)
pdf.cell(0, 6, '(mese 1-2)             (mese 3-4)            (mese 5-6)', new_x="LMARGIN", new_y="NEXT", align='C')
pdf.ln(10)

# --- CTA ---
pdf.separator()
pdf.ln(4)

pdf.set_font('Helvetica', 'B', 14)
pdf.set_text_color(26, 86, 142)
pdf.cell(0, 10, 'Prossimo passo', new_x="LMARGIN", new_y="NEXT", align='C')

pdf.set_font('Helvetica', '', 12)
pdf.set_text_color(51, 51, 51)
pdf.cell(0, 7, "Ci sentiamo mezz'ora, ti faccio vedere un esempio concreto", new_x="LMARGIN", new_y="NEXT", align='C')
pdf.cell(0, 7, 'e decidiamo se partire.', new_x="LMARGIN", new_y="NEXT", align='C')

pdf.output('/home/user/comprossori-germano/Proposta-Germano.pdf')
print('PDF creato con successo!')
