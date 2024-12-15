export async function uploadToGitHub(jsonData: object, path: string) {
  const auth = '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'; // Substitua pelo seu token
  const repo = 'renan-prado/mesa-token-sync'; // Repositório
  const branch = 'design-tokens'; // Branch desejado

  const jsonString = JSON.stringify(jsonData, null, 2);
  const base64Content = toBase64(jsonString); // Codificar o JSON em Base64

  try {
    // Verificar se o arquivo já existe
    let sha = null;
    const fileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      sha = fileData.sha; // Recupera o SHA do arquivo existente
    } else if (fileResponse.status === 404) {
      console.log('Arquivo não encontrado, será criado um novo.');
    } else {
      const errorResponse = await fileResponse.json();
      console.error('Erro ao verificar o arquivo no GitHub:', errorResponse);
      throw new Error(`Erro ao verificar o arquivo: ${errorResponse.message}`);
    }

    // Enviar o conteúdo atualizado para o GitHub
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${auth}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'feat: update design-tokens.json by figma',
        content: base64Content,
        sha, // Inclui o `sha` apenas se o arquivo já existir
        committer: {
          name: "Renan Prado",
          email: "renanprado96@gmail.com",
        },
        branch,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Erro ao enviar o arquivo para o GitHub:', errorResponse);
      throw new Error(`Erro ao fazer upload: ${errorResponse.message}`);
    }

    console.log('Arquivo enviado com sucesso para o GitHub.');
  } catch (error) {
    console.error('Erro:', error);
  }
}

function toBase64(input: string): string {
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let output = '';
  let i = 0;
  const buffer = new Uint8Array(input.split('').map(c => c.charCodeAt(0)));

  while (i < buffer.length) {
    const a = buffer[i++] || 0;
    const b = buffer[i++] || 0;
    const c = buffer[i++] || 0;

    const triplet = (a << 16) | (b << 8) | c;

    output += base64Chars[(triplet >> 18) & 0x3f];
    output += base64Chars[(triplet >> 12) & 0x3f];
    output += i - 2 < buffer.length ? base64Chars[(triplet >> 6) & 0x3f] : '=';
    output += i - 1 < buffer.length ? base64Chars[triplet & 0x3f] : '=';
  }

  return output;
}
