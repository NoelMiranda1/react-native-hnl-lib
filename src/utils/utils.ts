function generateCURL({ method, url, headers, dataRaw = null }: any) {
  return console.log(`curl --location --request ${method} '${url}' \\\n
  
    ${Object.keys(headers)
      .map((header) => `--header '${header}: ${headers[header]}' \\\n`)
      .join(' ')}
  
    ${dataRaw ? `--data-raw '${dataRaw}'` : ''}`);
}

export { generateCURL };
