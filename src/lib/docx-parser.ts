import mammoth from 'mammoth';

export interface ParsedDocxResult {
  html: string;
  rawText: string;
  headings: string[];
  extractedImagesCount: number;
}

/**
 * Parses a Word .docx buffer into clean HTML, plain text, and extracts headings.
 */
export async function parseDocxBuffer(buffer: Buffer): Promise<ParsedDocxResult> {
  try {
    const options = {
      styleMap: [
        "p[style-name='Title'] => h1.article-title:fresh",
        "p[style-name='Heading 1'] => h2.article-h2:fresh",
        "p[style-name='Heading 2'] => h3.article-h3:fresh",
        "p[style-name='Heading 3'] => h4.article-h4:fresh",
        "p[style-name='Quote'] => blockquote.article-quote:fresh",
        "r[style-name='Strong'] => strong",
        "r[style-name='Emphasis'] => em",
      ],
      convertImage: mammoth.images.imgElement((image) => {
        return image.read('base64').then((imageBuffer) => {
          return {
            src: `data:${image.contentType};base64,${imageBuffer}`,
          };
        });
      }),
    };

    const htmlResult = await mammoth.convertToHtml({ buffer }, options);
    const textResult = await mammoth.extractRawText({ buffer });

    // Extract headings from text for TOC or SEO
    const lines = textResult.value.split('\n');
    const headings = lines
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && l.length < 80 && !l.endsWith('.'));

    return {
      html: htmlResult.value,
      rawText: textResult.value,
      headings: headings.slice(0, 5),
      extractedImagesCount: (htmlResult.value.match(/<img /g) || []).length,
    };
  } catch (error) {
    console.error('Error parsing docx buffer:', error);
    throw error;
  }
}
