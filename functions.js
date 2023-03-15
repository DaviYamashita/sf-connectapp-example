const crypto = require('crypto');


//checagem de assinatura pelo secret do SF
function parseSignedRequest(signedRequest, secret) {
    const [signatureReceived, encodedPayload] = signedRequest.split('.', 2);
    const hmac = crypto.createHmac('sha256', secret).update(encodedPayload);
    const expectedSignature = hmac.digest('base64');

    if (signatureReceived === expectedSignature) {
      return JSON.parse(b64decode(encodedPayload));
    } else {
      throw new Error("Assinatura inválida! Verifique se as credenciais estão atualizadas. (root/config.json)");
    }
  }
  
  function b64decode(data) {
    const buff = Buffer.from(data, 'base64');
    return buff.toString('ascii');
  }

module.exports = { parseSignedRequest };