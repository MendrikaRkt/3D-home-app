const { Wit } = require('node-wit');

const witClient = new Wit({
  accessToken: process.env.WIT_AI_TOKEN
});

async function processVoiceCommand(command) {
  try {
    const response = await witClient.message(command);
    const intent = response.intents[0]?.name;
    const entities = response.entities;

    switch (intent) {
      case 'turn_on_device':
        // Handle turning on a device
        break;
      case 'turn_off_device':
        // Handle turning off a device
        break;
      // Add more intents as needed
      default:
        return "Je ne sais pas comment vous aider.";
    }
  } catch (error) {
    console.error('Error processing voice command:', error);
    return "Désolé, j'ai rencontré une erreur lors du traitement de votre demande.";
  }
}

module.exports = { processVoiceCommand };