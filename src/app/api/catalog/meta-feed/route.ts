import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://www.star-ink.com.br';
  const products = getProducts();

  const itemsXml = products
    .map((product) => {
      const productUrl = `${baseUrl}/#catalog`;
      const imageUrl = product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`;
      const formattedPrice = `${product.price.toFixed(2)} BRL`;

      return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${product.description || 'Camiseta Oversized Autoral STAR INK 100% Algodão Penteado DTG Puro.'}]]></g:description>
      <g:link>${productUrl}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:brand>STAR INK</g:brand>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${formattedPrice}</g:price>
      <g:google_product_category>Apparel &amp; Accessories &gt; Clothing &gt; Shirts &amp; Tops</g:google_product_category>
      <g:custom_label_0>${product.category}</g:custom_label_0>
    </item>`;
    })
    .join('');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>STAR INK — Catálogo Canônico Meta Commerce</title>
    <link>${baseUrl}</link>
    <description>Catálogo Oficial da Grife STAR INK para Instagram Shopping e Facebook Commerce.</description>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xmlContent, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
