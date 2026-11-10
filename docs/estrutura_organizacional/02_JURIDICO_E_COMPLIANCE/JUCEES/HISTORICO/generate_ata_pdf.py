import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
from reportlab.lib import colors

pdf_path = "/home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/02_JURIDICO_E_COMPLIANCE/JUCEES/Ata_de_Reuniao_de_Socios_STUDIO_X_LTDA.pdf"

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=A4,
    rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
)

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'TitleStyle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=13,
    leading=16,
    alignment=1, # Center
    spaceAfter=4
)

subtitle_style = ParagraphStyle(
    'SubTitleStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    alignment=1, # Center
    spaceAfter=10
)

h2_style = ParagraphStyle(
    'H2Style',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=12,
    textColor=colors.HexColor('#111827'),
    spaceBefore=6,
    spaceAfter=3
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12.5,
    alignment=4, # Justified
    spaceAfter=4
)

bold_body_style = ParagraphStyle(
    'BoldBodyStyle',
    parent=body_style,
    fontName='Helvetica-Bold'
)

story = []

story.append(Paragraph("ATA DE REUNIÃO DE SÓCIOS DA STUDIO X LTDA", title_style))
story.append(Paragraph("CNPJ/MF nº 01.376.773/0001-30 — NIRE 32200757128", subtitle_style))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#d1d5db'), spaceAfter=8))

story.append(Paragraph("DATA, HORA E LOCAL:", h2_style))
story.append(Paragraph("Aos 14 dias do mês de setembro de 2026, às 10:00 horas, na sede social da empresa situada na cidade de Vitória, Estado do Espírito Santo.", body_style))

story.append(Paragraph("PRESENÇA E REPRESENTAÇÃO:", h2_style))
story.append(Paragraph("Presentes os sócios representando 100% (cem por cento) do capital social da sociedade, a saber:<br/>"
                       "1. <b>ARMANDO SINKOVITZ</b>, brasileiro, empresário, portador da Carteira de Identidade nº 1.764.205 SPTC/ES, inscrito no CPF/MF sob o nº 488.749.738-53, titular de 9.900 (nove mil e novecentas) quotas, representando 99% do capital social; e<br/>"
                       "2. <b>PAULO CESAR DE SOUZA</b>, brasileiro, técnico de som, portador da Carteira de Identidade nº 1.341.650 SSP/ES, inscrito no CPF/MF sob o nº 979.667.467-04, titular de 100 (cem) quotas, representando 1% do capital social, <b>NESTE ATO REPRESENTADO POR SEU PROCURADOR ARMANDO SINKOVITZ</b>, conforme Procuração Específica por Instrumento Particular outorgada em 13/09/2026.", body_style))

story.append(Paragraph("MESA:", h2_style))
story.append(Paragraph("<b>Presidente:</b> ARMANDO SINKOVITZ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Secretário:</b> ARMANDO SINKOVITZ", body_style))

story.append(Paragraph("CONVOCAÇÃO:", h2_style))
story.append(Paragraph("Dispensada formalmente a publicação de editais de convocação, nos termos do <b>Art. 1.072, § 2º do Código Civil Brasileiro</b> e da <b>Instrução Normativa DREI nº 81/2020</b>, tendo em vista a presença e representação da totalidade dos sócios detentores de 100% do capital social.", body_style))

story.append(Paragraph("ORDEM DO DIA:", h2_style))
story.append(Paragraph("Deliberar sobre:<br/>"
                       "<b>1.</b> A cessão e transferência da totalidade das 100 quotas pertencentes ao sócio PAULO CESAR DE SOUZA para o sócio ARMANDO SINKOVITZ, com a saída definitiva do sócio retirante e quitação/isenção irrestrita de passivos;<br/>"
                       "<b>2.</b> A transformação da sociedade em Sociedade Limitada Unipessoal (SLU), nos termos do Art. 1.052, §§ 1º e 2º do Código Civil (Lei nº 13.874/2019);<br/>"
                       "<b>3.</b> A alteração e consolidação do endereço da sede social para a Rua Marquês de Olinda, nº 60, Quadra H, Casa 6, Bairro Jardim da Penha, Vitória/ES, CEP 29060-480;<br/>"
                       "<b>4.</b> A atualização do Objeto Social e inclusão do Nome Fantasia <b>STAR INK</b>, correspondente aos CNAEs 4781-4/00 (Principal), 4783-1/01 e 7410-2/03 (Secundários);<br/>"
                       "<b>5.</b> A consolidação do Capital Social no valor de R$ 10.000,00 (dez mil reais), 100% titularizado pelo sócio único Armando Sinkovitz;<br/>"
                       "<b>6.</b> A aprovação e assinatura da 2ª Alteração Contratual e Consolidação do Contrato Social.", body_style))

story.append(Paragraph("DELIBERAÇÕES DA UNANIMIDADE:", h2_style))
story.append(Paragraph("Iniciada a sessão, colocados os temas em discussão e votação, os sócios deliberaram e aprovaram, por <b>UNANIMIDADE (100% dos votos do capital social)</b>, sem quaisquer ressalvas:<br/>"
                       "<b>a)</b> Aprovar a cessão e transferência das 100 quotas de Paulo Cesar de Souza (representado por Armando Sinkovitz) para Armando Sinkovitz, com plena quitação e isenção de passivos tributários, cíveis, trabalhistas e bancários;<br/>"
                       "<b>b)</b> Aprovar a alteração da forma jurídica para Sociedade Limitada Unipessoal (SLU), endereço, nome fantasia e matriz de CNAEs;<br/>"
                       "<b>c)</b> Aprovar e ratificar integralmente a minuta do Instrumento Particular de 2ª Alteração Contratual e Consolidação do Contrato Social.", body_style))

story.append(Paragraph("ENCERRAMENTO:", h2_style))
story.append(Paragraph("Nada mais havendo a tratar, lavrou-se a presente Ata que, lida e achada conforme, vai assinada pelos sócios.", body_style))

story.append(Spacer(1, 10))
story.append(Paragraph("Vitória/ES, 14 de setembro de 2026.", body_style))

story.append(Spacer(1, 20))

sig_block = [
    Paragraph("____________________________________________________", ParagraphStyle('Center', alignment=1)),
    Paragraph("<b>ARMANDO SINKOVITZ</b><br/>Sócio Remanescente, Presidente e Secretário", ParagraphStyle('Center', alignment=1, fontSize=8.5, leading=11)),
    Spacer(1, 18),
    Paragraph("____________________________________________________", ParagraphStyle('Center', alignment=1)),
    Paragraph("<b>PAULO CESAR DE SOUZA</b><br/>Sócio Retirante<br/>Por seu procurador: <b>ARMANDO SINKOVITZ</b><br/><i>(Conforme Procuração Específica outorgada em 13/09/2026)</i>", ParagraphStyle('Center', alignment=1, fontSize=8.5, leading=11))
]

story.append(KeepTogether(sig_block))

doc.build(story)
print("PDF gerado com sucesso!")
