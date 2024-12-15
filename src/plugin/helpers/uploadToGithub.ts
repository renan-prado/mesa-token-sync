export async function uploadToGitHub(jsonData: object, filePath: string) {
  const token = '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'; // Substitua pelo seu token de acesso pessoal
  const repo = 'renan-prado/mesa-token-sync'; // Substitua pelo nome do repositório
  const branch = 'design-tokens'; // Substitua pelo branch desejado
  const fileName = filePath; // Caminho do arquivo no repositório (ex.: "tokens/design-tokens.json")

  const fileUrl = `https://api.github.com/repos/${repo}/contents/${fileName}`;

  // Verifica se o arquivo existe
  let fileSHA = undefined; // Para armazenar o SHA do arquivo existente
  try {
      const getFileResponse = await fetch(fileUrl, {
          headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github.v3+json',
          },
      });

      if (getFileResponse.ok) {
          const fileData = await getFileResponse.json();
          fileSHA = fileData.sha; // SHA do arquivo existente
      } else {
          console.log('Arquivo não encontrado. Será criado.');
      }
  } catch (error) {
      console.error('Erro ao verificar o arquivo:', error);
  }

  // Conteúdo do arquivo em base64
  const base64Content = btoa(JSON.stringify(jsonData, null, 2));

  // Envia a requisição para criar ou atualizar o arquivo
  const response = await fetch(fileUrl, {
      method: 'PUT',
      headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          message: fileSHA
              ? `Update ${fileName} from Figma Plugin`
              : `Create ${fileName} from Figma Plugin`,
          content: base64Content,
          sha: fileSHA, // Apenas para atualização
          branch,
      }),
  });

  if (response.ok) {
      console.log('Arquivo enviado com sucesso para o GitHub!');
  } else {
      console.error('Erro ao enviar arquivo:', await response.json());
  }
}
