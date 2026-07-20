const fs = require('fs')
const path = require('path')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')

const reportsDir = path.join(__dirname, '..', 'cypress', 'reports')
const outputDir = path.join(reportsDir, 'html')

const jsonFiles = fs.readdirSync(reportsDir)
  .filter((file) => file.startsWith('mochawesome') && file.endsWith('.json'))
  .map((file) => path.join(reportsDir, file))

if (jsonFiles.length === 0) {
  console.error('Nenhum arquivo JSON do Mochawesome encontrado em cypress/reports')
  process.exit(1)
}

async function generateReport () {
  const report = await merge({ files: jsonFiles })

  fs.mkdirSync(outputDir, { recursive: true })

  await generator.create(report, {
    reportDir: outputDir,
    reportFilename: 'index',
    overwrite: true,
    inline: false
  })

  console.log(`Relatório HTML gerado em: ${path.join(outputDir, 'index.html')}`)
}

generateReport().catch((error) => {
  console.error(error)
  process.exit(1)
})
