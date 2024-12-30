
type Commit = {
  auth: string,
  repo: string,
  branch: string,
};

export async function uploadToGitHub(jsonData: object, path: string, { auth, branch, repo }: Commit) {
  const jsonString = JSON.stringify(jsonData, null, 2);
  const base64Content = toBase64(jsonString);

  try {
    // Verificar se a branch existe
    const branchResponse = await fetch(`https://api.github.com/repos/${repo}/git/ref/heads/${branch}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (branchResponse.status === 404) {
      console.log(`Branch ${branch} não encontrada. Criando uma nova...`);

      // Recuperar o SHA do último commit da branch padrão
      const repoResponse = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          Accept: 'application/vnd.github+json',
        },
      });

      if (!repoResponse.ok) {
        const error = await repoResponse.json();
        throw new Error(`Erro ao recuperar o repositório: ${error.message}`);
      }

      const repoData = await repoResponse.json();
      const defaultBranch = repoData.default_branch;

      // Recuperar o SHA do commit mais recente da branch padrão
      const defaultBranchResponse = await fetch(`https://api.github.com/repos/${repo}/git/ref/heads/${defaultBranch}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          Accept: 'application/vnd.github+json',
        },
      });

      if (!defaultBranchResponse.ok) {
        const error = await defaultBranchResponse.json();
        throw new Error(`Erro ao recuperar a branch padrão: ${error.message}`);
      }

      const defaultBranchData = await defaultBranchResponse.json();
      const sha = defaultBranchData.object.sha;

      // Criar a nova branch com o SHA
      const createBranchResponse = await fetch(`https://api.github.com/repos/${repo}/git/refs`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: `refs/heads/${branch}`, // Certifique-se de usar o formato correto para a referência
          sha, // SHA do último commit da branch padrão
        }),
      });

      if (!createBranchResponse.ok) {
        const error = await createBranchResponse.json();
        throw new Error(`Erro ao criar a branch: ${error.message}`);
      }

      console.log(`Branch ${branch} criada com sucesso.`);
    }

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
      throw new Error(`Erro ao fazer upload: ${errorResponse.message}`);
    }

    console.log('Tokens exportados com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro:', error);
  }

  return false;
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
