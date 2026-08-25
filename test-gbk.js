// 测试 GBK 解码：把 latin-1 字节当 GBK 解码
const tests = [
  '╚²╜╟▓Γ┴┐',
  '╗∙▒╛┐≥╝▄',
  '╫┤╠¼╧≥┴┐',
  '╥≥╫╙═╝',
  '▒▀╘╡╗»',
];
for (const t of tests) {
  const bytes = Buffer.from(t, 'binary');
  try {
    const decoded = bytes.toString('gbk');
    console.log(`${t}  →  ${decoded}`);
  } catch (e) {
    console.log(`${t}  →  ERROR`);
  }
}
