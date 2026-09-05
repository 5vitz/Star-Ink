import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT

def build_pdf_alteracao_contratual(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#1A1A1A'),
        spaceAfter=15
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#333333'),
        spaceAfter=15
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor('#222222'),
        spaceAfter=8
    )

    bold_body_style = ParagraphStyle(
        'DocBodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    clause_title_style = ParagraphStyle(
        'ClauseTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#000000'),
        spaceBefore=10,
        spaceAfter=6
    )
    
    highlight_box_style = ParagraphStyle(
        'HighlightBox',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor('#0F294A'),
        spaceBefore=6,
        spaceAfter=8,
        leftIndent=15,
        rightIndent=15
    )

    story = []

    # Header Title
    story.append(Paragraph("INSTRUMENTO PARTICULAR DE PRIMEIRA ALTERAÇÃO CONTRATUAL E CONSOLIDAÇÃO DO CONTRATO SOCIAL", title_style))
    story.append(Paragraph("<b>STUDIO X LTDA</b><br/>(Nome Fantasia: <b>STAR INK</b>)<br/>CNPJ/MF nº 01.376.773/0001-30 — NIRE 32200508000", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#000000'), spaceBefore=0, spaceAfter=12))

    # Preâmbulo
    preambulo_text = (
        "Por este instrumento particular de Alteração Contratual e Consolidação do Contrato Social, os abaixo assinados:<br/><br/>"
        "<b>1. ARMANDO SINKOVITZ</b>, brasileiro, empresário, residente e domiciliado na cidade de Vitória, Estado do Espírito Santo, "
        "inscrito no CPF/MF sob o nº ***.749.738-**, titular de 9.900 (nove mil e novecentas) quotas representativas de 99% do capital social; e<br/><br/>"
        "<b>2. PAULO CESAR DE SOUZA</b>, brasileiro, técnico de som, inscrito no CPF/MF sob o nº 979.667.467-04, residente e domiciliado "
        "na cidade de Vitória, Estado do Espírito Santo, titular de 100 (cem) quotas representativas de 1% do capital social;<br/><br/>"
        "Únicos sócios da sociedade empresária limitada que gira sob a razão social <b>STUDIO X LTDA</b>, com sede na cidade de Vitória/ES, "
        "inscrita no CNPJ/MF sob o nº <b>01.376.773/0001-30</b> e arquivada na Junta Comercial do Estado do Espírito Santo (JUCEES), "
        "resolvem, de comum acordo, alterar e consolidar o Contrato Social mediante as seguintes cláusulas:"
    )
    story.append(Paragraph(preambulo_text, body_style))
    story.append(Spacer(1, 8))

    # Cláusula 1
    story.append(Paragraph("CLÁUSULA PRIMEIRA — DA CESSÃO E TRANSFERÊNCIA DE COTAS E SAÍDA DE SÓCIO", clause_title_style))
    c1_text = (
        "O sócio <b>PAULO CESAR DE SOUZA</b> cede e transfere, neste ato, a totalidade de suas <b>100 (cem) quotas</b> de valor nominal "
        "de R$ 1,00 (um real) cada, perfazendo o montante total de R$ 100,00 (cem reais), para o sócio <b>ARMANDO SINKOVITZ</b>. "
        "Em razão desta cessão de quotas, o sócio PAULO CESAR DE SOUZA retira-se definitivamente da sociedade, dando plena e irrevogável quitação do valor recebido."
    )
    story.append(Paragraph(c1_text, body_style))

    # Cláusula 2 (DESTAQUE DE QUITAÇÃO E ISENÇÃO DE PASSIVO)
    story.append(Paragraph("CLÁUSULA SEGUNDA — DA ISENÇÃO TOTAL DE PASSIVOS E QUITAÇÃO IRREVOGÁVEL AO SÓCIO RETIRANTE", clause_title_style))
    c2_text = (
        "O sócio remanescente <b>ARMANDO SINKOVITZ</b> e a sociedade <b>STUDIO X LTDA</b> declaram expressamente que o sócio retirante "
        "<b>PAULO CESAR DE SOUZA</b> fica <b>TOTAL E INTEGRALMENTE ISENTO E EXONERADO DE QUALQUER RESPONSABILIDADE FINANCEIRA, TRIBUTÁRIA, "
        "FISCAL, TRABALHISTA, CÍVEL, EMPRESARIAL OU BANCÁRIA</b> decorrente de atos praticados durante o período de sua participação societária "
        "ou referentes ao passado, presente e futuro da sociedade.<br/><br/>"
        "O sócio remanescente ARMANDO SINKOVITZ assume de forma exclusiva, integral e irrestrita a totalidade do ativo e do passivo "
        "(diretos, indiretos ou contingentes) da empresa, concedendo ao sócio retirante PAULO CESAR DE SOUZA <b>PLENA, GERAL, RASA, IRRESTRITA "
        "E IRREVOGÁVEL QUITAÇÃO</b>, nada mais tendo a reclamar dele em tempo algum, em juízo ou fora dele."
    )
    story.append(Paragraph(c2_text, body_style))

    # Cláusula 3
    story.append(Paragraph("CLÁUSULA TERCEIRA — DA TRANSFORMAÇÃO EM SOCIEDADE LIMITADA UNIPESSOAL (SLU)", clause_title_style))
    c3_text = (
        "Com a saída do sócio Paulo Cesar de Souza e a concentração da totalidade das quotas no sócio Armando Sinkovitz, a sociedade passa a "
        "operar sob o regime de <b>SOCIEDADE LIMITADA UNIPESSOAL (SLU)</b>, nos termos do Artigo 1.052, § 1º e § 2º, do Código Civil Brasileiro "
        "(conforme alterado pela Lei nº 13.874/2019 — Lei da Liberdade Econômica), mantendo a sua natureza jurídica de Sociedade Limitada."
    )
    story.append(Paragraph(c3_text, body_style))

    # Cláusula 4
    story.append(Paragraph("CLÁUSULA QUARTA — DA ALTERAÇÃO DO ENDEREÇO DA SEDE", clause_title_style))
    c4_text = (
        "A sede da sociedade passa a ser situada na <b>Rua Marquês de Olinda, nº 60, Bairro Jardim da Penha, Vitória/ES, CEP 29060-080</b>."
    )
    story.append(Paragraph(c4_text, body_style))

    # Cláusula 5
    story.append(Paragraph("CLÁUSULA QUINTA — DO NOME FANTASIA E DA MATRIZ DE ATIVIDADES (CNAEs)", clause_title_style))
    c5_text = (
        "A sociedade adota o Nome Fantasia <b>STAR INK</b> e passa a ter como matriz de atividades econômicas:<br/>"
        "• <b>4790-3/00 (Principal):</b> Comércio varejista pela internet ou via direta (E-commerce D2C)<br/>"
        "• <b>4781-4/00 (Secundário):</b> Comércio varejista de artigos do vestuário e acessórios<br/>"
        "• <b>4783-1/01 (Secundário):</b> Comércio varejista de artigos de joalheria (Prata 925)<br/>"
        "• <b>7410-2/02 (Secundário):</b> Design gráfico e criação de artes<br/>"
        "• <b>7410-2/03 (Secundário):</b> Design de produto e criação de modelos"
    )
    story.append(Paragraph(c5_text, body_style))

    # Cláusula 6
    story.append(Paragraph("CLÁUSULA SEXTA — DO CAPITAL SOCIAL CONSOLIDADO", clause_title_style))
    c6_text = (
        "O capital social permanece fixado no valor de <b>R$ 10.000,00 (dez mil reais)</b>, dividido em 10.000 (dez mil) quotas de valor "
        "nominal de R$ 1,00 (um real) cada uma, totalmente integralizadas em moeda corrente nacional, assim distribuídas:<br/>"
        "• <b>ARMANDO SINKOVITZ:</b> 10.000 quotas (100% do capital social) — R$ 10.000,00."
    )
    story.append(Paragraph(c6_text, body_style))

    # Cláusula 7 - Administração e Foro
    story.append(Paragraph("CLÁUSULA SÉTIMA — DA ADMINISTRAÇÃO E DECLARAÇÃO DE DESIMPEDIMENTO", clause_title_style))
    c7_text = (
        "A administração da sociedade será exercida exclusivamente pelo sócio único <b>ARMANDO SINKOVITZ</b>, com poderes para assinar "
        "isoladamente pela empresa. O administrador declara, sob as penas da lei, que não está inabilitado por lei nem impedido de exercer a administração."
    )
    story.append(Paragraph(c7_text, body_style))

    story.append(Spacer(1, 15))
    story.append(Paragraph("E, por estarem assim justos e contratados, assinam o presente instrumento em vias de igual teor e forma.", body_style))
    story.append(Spacer(1, 20))

    # Local e Data
    story.append(Paragraph("Vitória/ES, ____ de ___________________ de 2026.", ParagraphStyle('RightDate', parent=body_style, alignment=TA_RIGHT)))
    story.append(Spacer(1, 35))

    # Assinaturas
    sig_table_data = [
        [
            Paragraph("____________________________________________<br/><b>ARMANDO SINKOVITZ</b><br/>Sócio Remanescente / Administrador", ParagraphStyle('Sig1', parent=body_style, alignment=TA_CENTER)),
            Paragraph("____________________________________________<br/><b>PAULO CESAR DE SOUZA</b><br/>Sócio Retirante", ParagraphStyle('Sig2', parent=body_style, alignment=TA_CENTER))
        ]
    ]
    
    from reportlab.platypus import Table, TableStyle
    sig_table = Table(sig_table_data, colWidths=[240, 240])
    sig_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    
    story.append(KeepTogether([sig_table]))

    doc.build(story)
    print(f"PDF criado com sucesso em: {output_path}")

def build_pdf_procuracao(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'ProcTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#1A1A1A'),
        spaceAfter=25
    )

    body_style = ParagraphStyle(
        'ProcBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=15,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor('#222222'),
        spaceAfter=12
    )

    clause_title = ParagraphStyle(
        'ProcClause',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#000000'),
        spaceBefore=10,
        spaceAfter=6
    )

    story = []

    story.append(Paragraph("PROCURAÇÃO ESPECÍFICA POR INSTRUMENTO PARTICULAR", title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#000000'), spaceBefore=0, spaceAfter=20))

    story.append(Paragraph("<b>OUTORGANTE:</b>", clause_title))
    outorgante_text = (
        "<b>PAULO CESAR DE SOUZA</b>, brasileiro, técnico de som, inscrito no CPF/MF sob o nº <b>979.667.467-04</b>, "
        "residente e domiciliado na cidade de Vitória, Estado do Espírito Santo."
    )
    story.append(Paragraph(outorgante_text, body_style))

    story.append(Paragraph("<b>OUTORGADO:</b>", clause_title))
    outorgado_text = (
        "<b>ARMANDO SINKOVITZ</b>, brasileiro, empresário, inscrito no CPF/MF sob o nº <b>***.749.738-**</b>, "
        "residente e domiciliado na cidade de Vitória, Estado do Espírito Santo."
    )
    story.append(Paragraph(outorgado_text, body_style))

    story.append(Paragraph("<b>PODERES ESPECÍFICOS:</b>", clause_title))
    poderes_text = (
        "Pelo presente instrumento particular de procuração, o Outorgante nomeia e constitui o Outorgado como seu bastante procurador, "
        "conferindo-lhe poderes específicos e expressos para representá-lo perante a <b>Junta Comercial do Estado do Espírito Santo (JUCEES)</b>, "
        "a <b>Receita Federal do Brasil</b>, a <b>Secretaria da Fazenda do Estado do Espírito Santo (SEFAZ-ES)</b> e o portal <b>Simplifica ES</b>, "
        "com o fim exclusivo de assinar a <b>1ª Alteração Contratual e Consolidação da empresa STUDIO X LTDA (CNPJ 01.376.773/0001-30)</b>.<br/><br/>"
        "Os poderes incluem assinar a cessão e transferência da totalidade de suas 100 (cem) quotas da referida sociedade em favor do Outorgado, "
        "assinar termos de retificação, requerimentos, atas de reunião de sócios, declarações e atos de arquivamento na JUCEES, bem como dar "
        "e receber quitação de obrigações societárias relacionadas à referida alteração contratual."
    )
    story.append(Paragraph(poderes_text, body_style))

    story.append(Paragraph("<b>ISENÇÃO E QUITAÇÃO:</b>", clause_title))
    isencao_text = (
        "O Outorgado declara e garante expressamente que a retirada do Outorgante da sociedade STUDIO X LTDA ocorre com a <b>integral e total "
        "isenção de qualquer responsabilidade financeira, cível, fiscal, trabalhista ou bancária</b> do Outorgante relativa à empresa, "
        "ficando todos os ativos e passivos da pessoa jurídica sob a exclusiva responsabilidade do Outorgado."
    )
    story.append(Paragraph(isencao_text, body_style))

    story.append(Spacer(1, 20))
    story.append(Paragraph("Vitória/ES, ____ de ___________________ de 2026.", ParagraphStyle('RightDate2', parent=body_style, alignment=TA_RIGHT)))
    story.append(Spacer(1, 45))

    sig_block = Paragraph(
        "____________________________________________________<br/>"
        "<b>PAULO CESAR DE SOUZA</b><br/>"
        "Outorgante (Assinar com Firma Reconhecida em Cartório ou via Gov.br)",
        ParagraphStyle('SigProc', parent=body_style, alignment=TA_CENTER)
    )
    story.append(KeepTogether([sig_block]))

    doc.build(story)
    print(f"Procuração criada com sucesso em: {output_path}")

if __name__ == "__main__":
    target_dir = "/home/artz/Documentos/Antigravity/Star-Ink/docs/juridico"
    os.makedirs(target_dir, exist_ok=True)
    build_pdf_alteracao_contratual(os.path.join(target_dir, "1a_Alteracao_Contratual_STUDIO_X_STAR_INK_LTDA.pdf"))
    build_pdf_procuracao(os.path.join(target_dir, "Procuracao_Especifica_Paulo_Cesar_de_Souza.pdf"))
