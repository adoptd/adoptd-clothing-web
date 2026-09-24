import os
import zipfile
import xml.sax.saxutils as saxutils

def escape(text):
    return saxutils.escape(str(text))

def build_docx(filename, doc_elements):
    """
    doc_elements is a list of tuples/dicts representing:
    - ('title', text)
    - ('subtitle', text)
    - ('h1', text)
    - ('h2', text)
    - ('h3', text)
    - ('p', text)
    - ('p_bold', text)
    - ('quote', text)
    - ('bullet', text)
    - ('table', headers, rows)
    - ('callout', text)
    """

    content_types_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>"""

    rels_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

    doc_rels_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>"""

    styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
        <w:sz w:val="23"/>
        <w:color w:val="2D3748"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:spacing w:line="276" w:lineRule="auto" w:before="60" w:after="120"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>
</w:styles>"""

    body_xml = []

    for item in doc_elements:
        itype = item[0]
        if itype == 'title':
            body_xml.append(f"""
            <w:p>
              <w:pPr>
                <w:jc w:val="center"/>
                <w:spacing w:before="240" w:after="80"/>
              </w:pPr>
              <w:r>
                <w:rPr>
                  <w:b/>
                  <w:sz w:val="48"/>
                  <w:color w:val="00736A"/>
                  <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                </w:rPr>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'subtitle':
            body_xml.append(f"""
            <w:p>
              <w:pPr>
                <w:jc w:val="center"/>
                <w:spacing w:before="0" w:after="280"/>
              </w:pPr>
              <w:r>
                <w:rPr>
                  <w:sz w:val="24"/>
                  <w:color w:val="4A5568"/>
                  <w:i/>
                </w:rPr>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'h1':
            body_xml.append(f"""
            <w:p>
              <w:pPr>
                <w:spacing w:before="360" w:after="120"/>
                <w:pBdr>
                  <w:bottom w:val="single" w:sz="12" w:space="4" w:color="00736A"/>
                </w:pBdr>
              </w:pPr>
              <w:r>
                <w:rPr>
                  <w:b/>
                  <w:sz w:val="34"/>
                  <w:color w:val="00736A"/>
                </w:rPr>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'h2':
            body_xml.append(f"""
            <w:p>
              <w:pPr>
                <w:spacing w:before="240" w:after="80"/>
              </w:pPr>
              <w:r>
                <w:rPr>
                  <w:b/>
                  <w:sz w:val="28"/>
                  <w:color w:val="1A202C"/>
                </w:rPr>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'h3':
            body_xml.append(f"""
            <w:p>
              <w:pPr>
                <w:spacing w:before="160" w:after="60"/>
              </w:pPr>
              <w:r>
                <w:rPr>
                  <w:b/>
                  <w:sz w:val="24"/>
                  <w:color w:val="00736A"/>
                </w:rPr>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'p':
            body_xml.append(f"""
            <w:p>
              <w:r>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'p_bold':
            body_xml.append(f"""
            <w:p>
              <w:r>
                <w:rPr><w:b/></w:rPr>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'bullet':
            body_xml.append(f"""
            <w:p>
              <w:pPr>
                <w:ind w:left="400"/>
                <w:spacing w:before="40" w:after="40"/>
              </w:pPr>
              <w:r>
                <w:rPr><w:b/><w:color w:val="00736A"/></w:rPr>
                <w:t>• </w:t>
              </w:r>
              <w:r>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'callout':
            body_xml.append(f"""
            <w:p>
              <w:pPr>
                <w:pBdr>
                  <w:left w:val="single" w:sz="24" w:space="12" w:color="00736A"/>
                </w:pBdr>
                <w:shd w:val="clear" w:color="auto" w:fill="F0FDF4"/>
                <w:spacing w:before="120" w:after="120"/>
                <w:ind w:left="200" w:right="200"/>
              </w:pPr>
              <w:r>
                <w:rPr>
                  <w:sz w:val="22"/>
                  <w:color w:val="065F46"/>
                  <w:i/>
                </w:rPr>
                <w:t>{escape(item[1])}</w:t>
              </w:r>
            </w:p>""")
        elif itype == 'table':
            headers, rows = item[1], item[2]
            tbl = ['<w:tbl>',
                   '<w:tblPr>',
                   '  <w:tblW w:w="5000" w:type="pct"/>',
                   '  <w:tblBorders>',
                   '    <w:top w:val="single" w:sz="6" w:space="0" w:color="CBD5E0"/>',
                   '    <w:left w:val="single" w:sz="6" w:space="0" w:color="CBD5E0"/>',
                   '    <w:bottom w:val="single" w:sz="6" w:space="0" w:color="CBD5E0"/>',
                   '    <w:right w:val="single" w:sz="6" w:space="0" w:color="CBD5E0"/>',
                   '    <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>',
                   '    <w:insideV w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>',
                   '  </w:tblBorders>',
                   '</w:tblPr>']

            # Header Row
            tbl.append('<w:tr><w:trPr><w:tblHeader/></w:trPr>')
            for h in headers:
                tbl.append(f"""
                <w:tc>
                  <w:tcPr>
                    <w:shd w:val="clear" w:color="auto" w:fill="00736A"/>
                    <w:tcMar><w:top w:w="120"/><w:bottom w:w="120"/><w:left w:w="120"/><w:right w:w="120"/></w:tcMar>
                  </w:tcPr>
                  <w:p><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr><w:t>{escape(h)}</w:t></w:r></w:p>
                </w:tc>""")
            tbl.append('</w:tr>')

            # Body Rows
            for r_idx, r in enumerate(rows):
                bg = "F7FAFC" if r_idx % 2 == 1 else "FFFFFF"
                tbl.append('<w:tr>')
                for cell in r:
                    tbl.append(f"""
                    <w:tc>
                      <w:tcPr>
                        <w:shd w:val="clear" w:color="auto" w:fill="{bg}"/>
                        <w:tcMar><w:top w:w="100"/><w:bottom w:w="100"/><w:left w:w="120"/><w:right w:w="120"/></w:tcMar>
                      </w:tcPr>
                      <w:p><w:r><w:t>{escape(cell)}</w:t></w:r></w:p>
                    </w:tc>""")
                tbl.append('</w:tr>')
            tbl.append('</w:tbl>')
            body_xml.append('\n'.join(tbl))

    full_document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    {''.join(body_xml)}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>"""

    with zipfile.ZipFile(filename, 'w', zipfile.ZIP_DEFLATED) as docx:
        docx.writestr('[Content_Types].xml', content_types_xml)
        docx.writestr('_rels/.rels', rels_xml)
        docx.writestr('word/_rels/document.xml.rels', doc_rels_xml)
        docx.writestr('word/document.xml', full_document_xml)
        docx.writestr('word/styles.xml', styles_xml)

    print(f"Successfully generated Word document: {filename}")

if __name__ == '__main__':
    doc = [
        ('title', 'ADOPTD Clothing — Website Management Guide'),
        ('subtitle', 'A Simple, Step-by-Step Guide to Managing Products, Orders, and Website Content with Total Independence'),

        ('h1', '1. Welcome & Why This Setup Was Built For You'),
        ('p', 'When the website was initially created on WordPress, it was chosen because it is very common. However, WordPress can often feel slow, clunky, and overwhelming, with constant plugin updates and hidden monthly hosting fees.'),
        ('p', 'This new setup is designed with two key goals in mind:'),
        ('bullet', 'Zero Ongoing Running Costs: There are no monthly Shopify or hosting bills. The only routine cost you will ever have is renewing your web domain name once a year.'),
        ('bullet', 'Total Independence for You: You have complete freedom to add new t-shirts or hoodies, change prices, update announcements, and view customer orders inside Airtable without ever needing to touch code or wait on anyone.'),
        ('bullet', 'Lightning Fast & Secure: Pages load instantly for shoppers on their phones, helping the site rank higher on Google in the UK, while Stripe safely handles customer card and Apple Pay payments directly into your bank account.'),
        ('callout', 'Note: Everything in this guide is created inside your own private accounts. No one else has your passwords, and all customer sales money goes directly to you.'),

        ('h1', '2. Part 1: Setting Up Your Airtable Workspace'),
        ('p', 'Airtable is your visual control centre. If you already have a free Airtable account from work, log in at airtable.com. If not, you can create a free account with your email.'),

        ('h2', 'Step 1: Create a New Base'),
        ('bullet', 'Click the "+ Create" (or "+ Add a base") button on your Airtable home screen.'),
        ('bullet', 'Click on the title in the top-left corner and rename it to: ADOPTD Clothing.'),

        ('h2', 'Step 2: Set Up the 4 Tabs Across the Top'),
        ('p', 'You will set up 4 tabs (tables) across the top of your base. Here are the exact columns to click and add for each tab:'),

        ('h3', 'Tab 1: Products (Where you manage garments, prices & photos)'),
        ('p', 'Rename the default first tab to "Products". Click the "+" icon at the top of columns to add these fields:'),
        ('table', 
            ['Column Name', 'Field Type in Airtable', 'How to Use It'],
            [
                ['Product Name', 'Single line text', 'The title of the item (e.g. He Makes All Things New Tote Bag)'],
                ['Slug', 'Single line text', 'Lowercase web name with dashes (e.g. he-makes-all-things-new-tote-bag)'],
                ['Category', 'Single select', 'Add options: tee-shirts, christian-hoodies-uk, sweaters, christian-bags'],
                ['Price (£)', 'Number / Currency (£, 2 decimals)', 'The selling price (e.g. 12.00 or 38.00)'],
                ['Compare at Price (£)', 'Number / Currency (£, 2 decimals)', 'Optional original price if the item is on sale (e.g. 45.00)'],
                ['In Stock', 'Checkbox', 'Tick if available to buy; untick if sold out'],
                ['Sizes', 'Multiple select', 'Add options: S, M, L, XL, XXL, One Size'],
                ['Available Colors', 'Multiple select', 'Add options: Black, White, Natural Canvas, Grey, Forest Green, Burgundy, Navy'],
                ['Main Featured Image', 'Attachment', 'Drag and drop your primary product photo here'],
                ['Color Images: Black', 'Attachment', 'Optional: Drop photos of the garment in Black here'],
                ['Color Images: Grey', 'Attachment', 'Optional: Drop photos of the garment in Grey here'],
                ['Color Images: Natural Canvas', 'Attachment', 'Optional: Drop photos of the canvas tote here'],
                ['Description', 'Long text', 'Product story, garment specs, and details'],
                ['Scripture Reference', 'Single line text', 'Bible verse reference (e.g. Revelation 21:5)'],
                ['Published', 'Checkbox', 'Tick when you want the product to appear live on the website']
            ]
        ),
        ('callout', 'How Color Swatches Work: When you pick "Black" and "Grey" in Available Colors, the website automatically creates clickable color circles. When a customer taps "Grey", it displays the photos from the "Color Images: Grey" column!'),

        ('h3', 'Tab 2: Site Settings (For top banner announcements & contact details)'),
        ('p', 'Click the "+" button next to the Products tab and name this new tab "Site Settings". Set up 2 columns: "Setting Key" (Single line text) and "Setting Value" (Long text).'),
        ('table',
            ['Setting Key (Type exactly as shown)', 'Setting Value (What you can change anytime)'],
            [
                ['announcement_banner', 'WEAR THE WORD. SHARE THE LIGHT.'],
                ['announcement_active', 'true (shows the top banner) or false (hides it)'],
                ['contact_email', 'hello@adoptdchristianclothing.co.uk'],
                ['free_shipping_threshold', '40.00 (Free UK shipping on orders £40+)']
            ]
        ),

        ('h3', 'Tab 3: Orders (Where customer orders land automatically)'),
        ('p', 'Click the "+" button to add a third tab and name it "Orders". Add these columns:'),
        ('bullet', 'Order Number (Single line text) — e.g. ORD-100245'),
        ('bullet', 'Customer Name (Single line text)'),
        ('bullet', 'Customer Email (Email field)'),
        ('bullet', 'Total Amount (£) (Currency £)'),
        ('bullet', 'Items Purchased (Long text) — lists garments, sizes, colors & quantities'),
        ('bullet', 'Shipping Address (Long text) — customer delivery address'),
        ('bullet', 'Fulfillment Status (Single select with options: Unfulfilled, Fulfilled)'),
        ('bullet', 'Stripe Payment ID (Single line text)'),
        ('bullet', 'Order Date (Created time field — automatically timestamps the order)'),

        ('h3', 'Tab 4: Newsletter Subscribers (Where email signups land)'),
        ('p', 'Click the "+" button to add a fourth tab and name it "Newsletter Subscribers". Add these columns:'),
        ('bullet', 'Email (Email field)'),
        ('bullet', 'First Name (Single line text)'),
        ('bullet', 'Status (Single select with options: Active, Unsubscribed)'),
        ('bullet', 'Date Subscribed (Created time field)'),

        ('h1', '3. Part 2: Setting Up Stripe (For Customer Payments)'),
        ('p', 'Stripe is the official payment system that enables customers to securely pay using Apple Pay, Google Pay, and all UK debit and credit cards.'),
        ('bullet', '1. Go to dashboard.stripe.com and log in (or create your free account).'),
        ('bullet', '2. Connect your business bank account under Settings so you receive your payouts automatically.'),
        ('bullet', '3. In the top right corner of the Stripe Dashboard, click Developers, then click the API keys tab.'),
        ('bullet', '4. You will see two keys to copy: Publishable key (starts with pk_live_...) and Secret key (starts with sk_live_... by clicking "Reveal live key").'),

        ('h1', '4. Part 3: The 4 Connection Keys to Send Over'),
        ('p', 'To connect your private Airtable and Stripe to the live website, you only need to copy and send over 4 codes:'),
        ('table',
            ['Key Name', 'Where to Find It', 'What It Looks Like'],
            [
                ['1. Airtable Base ID', 'In your browser web address bar while viewing your base', 'Starts with app... (e.g. app123456789abc)'],
                ['2. Airtable Access Token', 'airtable.com/create/tokens (Click Create token -> Name it "ADOPTD Website" -> tick read/write scopes -> pick your base)', 'Starts with pat... (Airtable displays this once)'],
                ['3. Stripe Publishable Key', 'Stripe Dashboard -> Developers -> API keys', 'Starts with pk_live_...'],
                ['4. Stripe Secret Key', 'Stripe Dashboard -> Developers -> API keys -> Reveal key', 'Starts with sk_live_...']
            ]
        ),
        ('callout', 'Why this is 100% safe: These connection keys only allow the website to read your product catalog and record orders. They never grant access to your passwords or personal logins.'),

        ('h1', '5. Part 4: How You Manage the Shop Day-to-Day'),
        ('p', 'Once connected, running your shop is effortless:'),
        ('bullet', 'To add a new product: Just add a new row in your Products tab, type the name, price, choose the category, drag in your photos, and tick "Published". It appears on the live website automatically!'),
        ('bullet', 'To change a price or put an item on sale: Simply edit the price in the Price (£) column. It updates instantly across the shop.'),
        ('bullet', 'To change the announcement banner: Edit the text in the Site Settings tab under announcement_banner.'),
        ('bullet', 'To process orders: Open your Orders tab, view the customer address and purchased items, package the garment, and change Fulfillment Status to "Fulfilled".'),

        ('p_bold', 'Congratulations! You now have a complete, lightning-fast, and zero-cost e-commerce platform that you fully own and control.')
    ]

    output_path = os.path.join(os.getcwd(), 'ADOPTD_Website_Management_Guide.docx')
    build_docx(output_path, doc)

